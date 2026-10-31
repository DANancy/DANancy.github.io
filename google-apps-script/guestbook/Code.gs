const CONFIG = Object.freeze({
  notificationEmail: "yangyangcai.au@gmail.com",
  timezone: "Australia/Sydney",
  maxNameLength: 40,
  maxMessageLength: 500,
  maxInterestDetailsLength: 500,
  maxPublicMessages: 50,
  // Site-wide caps that slow spam bursts and keep a flood from filling the inbox.
  maxSubmissionsPerMinute: 10,
  maxSubmissionsPerDay: 200,
  maxEmailsPerDay: 30,
  // Bots submit the instant a page loads; people take longer than this.
  minFillMs: 3000,
  publicCacheSeconds: 60,
});

const GUESTBOOK = Object.freeze({
  sheetName: "Guestbook",
  headers: ["Submitted", "Name", "Message", "Language", "Status", "Color", "ID", "Edit key hash", "Updated", "Shape", "Message (EN)", "Message (ZH)"],
  statuses: ["Pending", "Approved", "Hidden"],
  colors: ["cyan", "mint", "yellow", "pink", "purple"],
  shapes: ["cloud", "star", "tree", "candy", "note"],
});

const INTEREST = Object.freeze({
  sheetName: "Interest",
  headers: ["Submitted", "Email", "Interests", "Details", "Language", "Status"],
  statuses: ["New", "Contacted", "Done"],
});

/**
 * Run once from the spreadsheet-bound Apps Script editor (and again after updating this file).
 * Creates both tabs and saves the spreadsheet ID for the web app.
 */
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Open Apps Script from a Google Sheet, then run setup() again.");
  }

  PropertiesService.getScriptProperties().setProperty(
    "SPREADSHEET_ID",
    spreadsheet.getId(),
  );

  const guestbook = getOrCreateSheet_(spreadsheet, GUESTBOOK);
  styleSheet_(guestbook, GUESTBOOK, [165, 160, 420, 90, 110, 90, 280, 120, 165, 90, 360, 360]);
  guestbook.getRange("K:L").setWrap(true);
  guestbook.getRange("I:I").setNumberFormat("yyyy-mm-dd hh:mm:ss");
  // The hash is only used to verify visitors' own edits; keep it out of the way.
  guestbook.hideColumns(8);
  guestbook.getRange("C:C").setWrap(true);

  const interest = getOrCreateSheet_(spreadsheet, INTEREST);
  styleSheet_(interest, INTEREST, [165, 240, 320, 360, 90, 110]);
  interest.getRange("C:D").setWrap(true);

  return `Setup complete: ${spreadsheet.getUrl()}`;
}

/** Receives a guestbook message or an interest registration from the website. */
function doPost(event) {
  try {
    const data = readSubmission_(event);

    // Honeypot field: real users never fill this in.
    if (String(data.website || "").trim()) {
      return json_({ ok: true });
    }

    if (data.type === "interest") return saveInterest_(data);
    if (data.type === "guestbook_update") return updateGuestbookMessage_(data);
    if (data.type === "guestbook_delete") return deleteGuestbookMessage_(data);
    return saveGuestbookMessage_(data);
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "server_error" });
  }
}

/**
 * Returns approved guestbook messages, newest first.
 * `?mine=id1,id2` also returns the current status of the visitor's own notes.
 */
function doGet(event) {
  try {
    const payload = JSON.parse(approvedMessagesJson_());
    const mineParam = String((event && event.parameter && event.parameter.mine) || "");
    const mineIds = mineParam.split(",").map((id) => id.trim()).filter(Boolean).slice(0, 20);
    if (mineIds.length) payload.mine = noteStatuses_(mineIds);
    return json_(payload);
  } catch (error) {
    console.error(error);
    return json_({ ok: false, messages: [] });
  }
}

function approvedMessagesJson_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get("approved");
  if (cached) return cached;

  const messages = guestbookRows_()
    .filter((row) => String(row[4]).trim() === "Approved")
    .map((row) => ({
      id: String(row[6] || ""),
      date: row[0] instanceof Date
        ? Utilities.formatDate(row[0], CONFIG.timezone, "yyyy-MM-dd")
        : "",
      name: String(row[1]),
      message: String(row[2]),
      // Translation cells can be corrected by hand in the sheet; fall back to the original.
      messageEn: String(row[10] || row[2]),
      messageZh: String(row[11] || row[2]),
      color: noteColor_(row[5]),
      shape: noteShape_(row[9]),
    }))
    .reverse()
    .slice(0, CONFIG.maxPublicMessages);

  const body = JSON.stringify({ ok: true, messages });
  cache.put("approved", body, CONFIG.publicCacheSeconds);
  return body;
}

function noteStatuses_(ids) {
  const statuses = {};
  guestbookRows_().forEach((row) => {
    const id = String(row[6] || "");
    if (ids.indexOf(id) !== -1) statuses[id] = String(row[4]).trim();
  });
  return statuses;
}

function guestbookRows_() {
  const sheet = getOrCreateSheet_(openSpreadsheet_(), GUESTBOOK);
  const lastRow = sheet.getLastRow();
  return lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, GUESTBOOK.headers.length).getValues()
    : [];
}

function saveGuestbookMessage_(data) {
  const name = cleanText_(data.name, CONFIG.maxNameLength);
  const message = cleanText_(data.message, CONFIG.maxMessageLength);
  if (!name || !message) {
    return json_({ ok: false, error: "missing_fields" });
  }
  const blocked = checkLimits_(data);
  if (blocked) return json_({ ok: false, error: blocked });

  const id = Utilities.getUuid();
  const editKey = Utilities.getUuid();
  const now = new Date();
  const translated = translateMessage_(message);
  appendRow_(GUESTBOOK, [
    now,
    safeCell_(name),
    safeCell_(message),
    safeCell_(data.language === "zh" ? "zh" : "en"),
    "Pending",
    noteColor_(data.color),
    id,
    hashKey_(editKey),
    now,
    noteShape_(data.shape),
    safeCell_(translated.en),
    safeCell_(translated.zh),
  ]);

  notify_({
    subject: `New guestbook message from ${name}`,
    body: [
      "A visitor left a message on yangyangcai.me. It stays hidden until you set its Status to Approved.",
      "",
      `Name: ${name}`,
      `Message: ${message}`,
      `Time: ${formatNow_()}`,
      "",
      `Review: ${openSpreadsheet_().getUrl()}`,
    ].join("\n"),
    name: "yangyangcai.me guestbook",
  });
  return json_({
    ok: true,
    id,
    editKey,
    date: Utilities.formatDate(now, CONFIG.timezone, "yyyy-MM-dd"),
    messageEn: translated.en,
    messageZh: translated.zh,
  });
}

/** Lets a visitor change their own note. Edited notes go back to Pending for review. */
function updateGuestbookMessage_(data) {
  const name = cleanText_(data.name, CONFIG.maxNameLength);
  const message = cleanText_(data.message, CONFIG.maxMessageLength);
  if (!name || !message) {
    return json_({ ok: false, error: "missing_fields" });
  }
  const blocked = checkLimits_(data);
  if (blocked) return json_({ ok: false, error: blocked });

  // Translate before taking the lock; it is the slowest step.
  const translated = translateMessage_(message);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet_(openSpreadsheet_(), GUESTBOOK);
    const row = findOwnRow_(sheet, data.id, data.editKey);
    if (!row) return json_({ ok: false, error: "not_found" });

    sheet.getRange(row, 2, 1, 5).setValues([[
      safeCell_(name),
      safeCell_(message),
      safeCell_(data.language === "zh" ? "zh" : "en"),
      "Pending",
      noteColor_(data.color),
    ]]);
    sheet.getRange(row, 9).setValue(new Date());
    sheet.getRange(row, 10, 1, 3).setValues([[
      noteShape_(data.shape),
      safeCell_(translated.en),
      safeCell_(translated.zh),
    ]]);
  } finally {
    lock.releaseLock();
  }
  CacheService.getScriptCache().remove("approved");

  notify_({
    subject: `Guestbook message edited by ${name}`,
    body: [
      "A visitor edited their guestbook message. It is back to Pending until you approve it again.",
      "",
      `Name: ${name}`,
      `Message: ${message}`,
      `Time: ${formatNow_()}`,
      "",
      `Review: ${openSpreadsheet_().getUrl()}`,
    ].join("\n"),
    name: "yangyangcai.me guestbook",
  });
  return json_({ ok: true, messageEn: translated.en, messageZh: translated.zh });
}

/** Lets a visitor remove their own note. The row is deleted from the sheet. */
function deleteGuestbookMessage_(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet_(openSpreadsheet_(), GUESTBOOK);
    const row = findOwnRow_(sheet, data.id, data.editKey);
    if (!row) return json_({ ok: false, error: "not_found" });
    sheet.deleteRow(row);
  } finally {
    lock.releaseLock();
  }
  CacheService.getScriptCache().remove("approved");
  return json_({ ok: true });
}

/** Finds the sheet row for a note, but only when the visitor's edit key matches. */
function findOwnRow_(sheet, id, editKey) {
  const noteId = String(id || "").trim();
  const key = String(editKey || "").trim();
  if (!noteId || !key) return 0;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const cells = sheet.getRange(2, 7, lastRow - 1, 2).getValues();
  const index = cells.findIndex((cell) => String(cell[0]) === noteId);
  if (index === -1 || String(cells[index][1]) !== hashKey_(key)) return 0;
  return index + 2;
}

function hashKey_(key) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, key, Utilities.Charset.UTF_8)
    .map((byte) => ((byte + 256) % 256).toString(16).padStart(2, "0"))
    .join("");
}

function saveInterest_(data) {
  const email = String(data.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json_({ ok: false, error: "invalid_email" });
  }
  const blocked = checkLimits_(data);
  if (blocked) return json_({ ok: false, error: blocked });

  const interests = cleanText_(data.interests, 300) || "Not specified";
  const details = cleanText_(data.details, CONFIG.maxInterestDetailsLength);

  appendRow_(INTEREST, [
    new Date(),
    safeCell_(email),
    safeCell_(interests),
    safeCell_(details),
    safeCell_(data.language === "zh" ? "zh" : "en"),
    "New",
  ]);

  notify_({
    subject: "New website interest registration",
    body: [
      "A visitor registered their interest on yangyangcai.me.",
      "",
      `Email: ${email}`,
      `Interests: ${interests}`,
      `Details: ${details || "Not provided"}`,
      `Time: ${formatNow_()}`,
      "",
      `Sheet: ${openSpreadsheet_().getUrl()}`,
    ].join("\n"),
    replyTo: email,
    name: "yangyangcai.me",
  });
  return json_({ ok: true });
}

function appendRow_(definition, row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getOrCreateSheet_(openSpreadsheet_(), definition).appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Returns an error code when a submission should be refused, or "" when it may proceed.
 * Counts towards the per-minute and per-day caps only when it passes the fill-time check.
 */
function checkLimits_(data) {
  const elapsed = Number(data.elapsedMs);
  if (!(elapsed >= CONFIG.minFillMs)) return "too_fast";

  const cache = CacheService.getScriptCache();
  const minuteKey = `submissions-${Math.floor(Date.now() / 60000)}`;
  const minuteCount = Number(cache.get(minuteKey)) || 0;
  if (minuteCount >= CONFIG.maxSubmissionsPerMinute) return "rate_limited";

  let dailyLimitReached = false;
  withDailyCounters_((counters) => {
    if (counters.submissions >= CONFIG.maxSubmissionsPerDay) {
      dailyLimitReached = true;
      return;
    }
    counters.submissions += 1;
    if (counters.submissions === CONFIG.maxSubmissionsPerDay) counters.alertDue = true;
  });
  if (dailyLimitReached) return "rate_limited";

  cache.put(minuteKey, String(minuteCount + 1), 120);
  sendDailyLimitAlert_();
  return "";
}

/** Sends one notification, staying within the daily email budget. */
function notify_(message) {
  let mode = "skip";
  withDailyCounters_((counters) => {
    if (counters.emails < CONFIG.maxEmailsPerDay) {
      counters.emails += 1;
      mode = "send";
    } else if (!counters.emailSummarySent) {
      counters.emailSummarySent = true;
      mode = "summary";
    }
  });
  if (mode === "send") {
    sendMail_(message);
  } else if (mode === "summary") {
    sendMail_({
      subject: "yangyangcai.me: email notifications paused for today",
      body: [
        `More than ${CONFIG.maxEmailsPerDay} submissions arrived today, so notifications are paused until tomorrow (${CONFIG.timezone}).`,
        "New guestbook notes and interest registrations are still being saved. Please review them in the sheet.",
        "",
        `Sheet: ${openSpreadsheet_().getUrl()}`,
      ].join("\n"),
    });
  }
}

function sendDailyLimitAlert_() {
  let due = false;
  withDailyCounters_((counters) => {
    if (counters.alertDue && !counters.alertSent) {
      counters.alertSent = true;
      due = true;
    }
  });
  if (!due) return;
  sendMail_({
    subject: "yangyangcai.me: daily submission limit reached",
    body: [
      `The website received ${CONFIG.maxSubmissionsPerDay} submissions today, which is unusual and may be spam.`,
      "New submissions are refused until tomorrow. Already-saved rows are untouched.",
      "If this was genuine traffic, raise maxSubmissionsPerDay in Code.gs and deploy a new version.",
      "",
      `Sheet: ${openSpreadsheet_().getUrl()}`,
    ].join("\n"),
  });
}

function sendMail_(message) {
  try {
    MailApp.sendEmail(Object.assign({ to: CONFIG.notificationEmail, name: "yangyangcai.me" }, message));
  } catch (error) {
    // A mail quota error must not lose the submission that was already saved.
    console.error(error);
  }
}

/** Reads and updates today's counters under the script lock. Counters reset each day. */
function withDailyCounters_(update) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const store = PropertiesService.getScriptProperties();
    const today = Utilities.formatDate(new Date(), CONFIG.timezone, "yyyy-MM-dd");
    let counters;
    try {
      counters = JSON.parse(store.getProperty("DAILY_COUNTERS") || "{}");
    } catch (_error) {
      counters = {};
    }
    if (counters.date !== today) {
      counters = { date: today, submissions: 0, emails: 0, emailSummarySent: false, alertDue: false, alertSent: false };
    }
    update(counters);
    store.setProperty("DAILY_COUNTERS", JSON.stringify(counters));
  } finally {
    lock.releaseLock();
  }
}

function openSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    "SPREADSHEET_ID",
  );
  if (!spreadsheetId) {
    throw new Error("Run setup() before deploying the web app.");
  }
  return SpreadsheetApp.openById(spreadsheetId);
}

function readSubmission_(event) {
  if (!event) return {};
  if (event.parameter && Object.keys(event.parameter).length) return event.parameter;

  const body = event.postData && event.postData.contents;
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch (_error) {
    return {};
  }
}

function getOrCreateSheet_(spreadsheet, definition) {
  let sheet = spreadsheet.getSheetByName(definition.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(definition.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(definition.headers);
  } else {
    sheet.getRange(1, 1, 1, definition.headers.length).setValues([definition.headers]);
  }
  return sheet;
}

function styleSheet_(sheet, definition, columnWidths) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, definition.headers.length)
    .setFontWeight("bold")
    .setBackground("#176044")
    .setFontColor("#ffffff");
  columnWidths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");

  // Status dropdown so updating a row is a single click.
  const statusColumn = definition.headers.indexOf("Status") + 1;
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(definition.statuses, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, statusColumn, sheet.getMaxRows() - 1, 1).setDataValidation(statusRule);
}

function noteColor_(value) {
  const color = String(value || "").trim();
  return GUESTBOOK.colors.indexOf(color) === -1 ? "cyan" : color;
}

/** English and Chinese versions of a note, so each language page can show its own. */
function translateMessage_(message) {
  return { en: translate_(message, "en"), zh: translate_(message, "zh-CN") };
}

function translate_(text, target) {
  try {
    // An empty source language lets Google detect it.
    return LanguageApp.translate(text, "", target) || text;
  } catch (error) {
    console.error(error);
    return text;
  }
}

function noteShape_(value) {
  const shape = String(value || "").trim();
  return GUESTBOOK.shapes.indexOf(shape) === -1 ? "cloud" : shape;
}

function formatNow_() {
  return Utilities.formatDate(new Date(), CONFIG.timezone, "yyyy-MM-dd HH:mm:ss z");
}

function cleanText_(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function safeCell_(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
