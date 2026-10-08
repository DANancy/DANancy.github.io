const CONFIG = Object.freeze({
  sheetName: "Knowledge Agent Interest",
  notificationEmail: "yangyangcai.au@gmail.com",
  workshopName: "Build Your Knowledge Agent",
  timezone: "Australia/Sydney",
});

const HEADERS = [
  "First registered",
  "Last registered",
  "Email",
  "Workshop",
  "Source",
  "Language",
  "Status",
  "Submission count",
];

/**
 * Run once from the spreadsheet-bound Apps Script editor.
 * Creates the response sheet and saves the spreadsheet ID for the web app.
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

  const sheet = getOrCreateSheet_(spreadsheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#176044")
    .setFontColor("#ffffff");
  sheet.setColumnWidths(1, 2, 165);
  sheet.setColumnWidth(3, 240);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 150);
  sheet.setColumnWidth(6, 90);
  sheet.setColumnWidth(7, 110);
  sheet.setColumnWidth(8, 130);
  sheet.getRange("A:B").setNumberFormat("yyyy-mm-dd hh:mm:ss");

  return `Setup complete: ${spreadsheet.getUrl()}`;
}

/** Receives the website form submission. */
function doPost(event) {
  try {
    const data = readSubmission_(event);
    const email = normalizeEmail_(data.email);

    if (!isValidEmail_(email)) {
      return confirmationPage_(
        "Please enter a valid email address.",
        false,
      );
    }

    // Honeypot field: real users never fill this in.
    if (String(data.website || "").trim()) {
      return confirmationPage_("Thank you. Your interest has been recorded.", true);
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    let result;
    try {
      result = saveInterest_({
        email,
        source: safeCell_(data.source || "yangyangcai.me/community"),
        language: safeCell_(data.language || "unknown"),
      });
    } finally {
      lock.releaseLock();
    }

    sendNotification_(email, result.isNew, result.count);
    return confirmationPage_(
      result.isNew
        ? "Thank you! Your interest has been registered."
        : "Thank you! Your existing registration has been updated.",
      true,
    );
  } catch (error) {
    console.error(error);
    return confirmationPage_(
      "We could not save your interest right now. Please try again later.",
      false,
    );
  }
}

/** A safe status page when someone opens the deployed web-app URL directly. */
function doGet() {
  return confirmationPage_(
    "Build Your Knowledge Agent interest registration is online.",
    true,
  );
}

function saveInterest_(submission) {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    "SPREADSHEET_ID",
  );
  if (!spreadsheetId) {
    throw new Error("Run setup() before deploying the web app.");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = getOrCreateSheet_(spreadsheet);
  const now = new Date();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    const emails = sheet
      .getRange(2, 3, lastRow - 1, 1)
      .getDisplayValues()
      .flat()
      .map(normalizeEmail_);
    const existingIndex = emails.indexOf(submission.email);

    if (existingIndex !== -1) {
      const row = existingIndex + 2;
      const previousCount = Number(sheet.getRange(row, 8).getValue()) || 1;
      const newCount = previousCount + 1;
      sheet.getRange(row, 2).setValue(now);
      sheet.getRange(row, 5).setValue(submission.source);
      sheet.getRange(row, 6).setValue(submission.language);
      sheet.getRange(row, 8).setValue(newCount);
      return { isNew: false, count: newCount };
    }
  }

  sheet.appendRow([
    now,
    now,
    submission.email,
    CONFIG.workshopName,
    submission.source,
    submission.language,
    "Interested",
    1,
  ]);
  return { isNew: true, count: 1 };
}

function sendNotification_(email, isNew, count) {
  const subject = isNew
    ? "New Build Your Knowledge Agent interest"
    : "Repeated Build Your Knowledge Agent interest";
  const action = isNew ? "registered" : `registered again (${count} submissions)`;

  MailApp.sendEmail({
    to: CONFIG.notificationEmail,
    subject,
    body: [
      `A visitor ${action}.`,
      "",
      `Email: ${email}`,
      `Workshop: ${CONFIG.workshopName}`,
      `Time: ${Utilities.formatDate(new Date(), CONFIG.timezone, "yyyy-MM-dd HH:mm:ss z")}`,
    ].join("\n"),
    replyTo: email,
    name: "Make AI Practical website",
  });
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

function getOrCreateSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

function normalizeEmail_(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function safeCell_(value) {
  const text = String(value || "").trim().slice(0, 200);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function confirmationPage_(message, success) {
  const title = success ? "Interest received" : "Unable to register";
  const colour = success ? "#176044" : "#9b3f32";
  const safeMessage = String(message)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

  return HtmlService.createHtmlOutput(`<!doctype html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <style>
          body{margin:0;display:grid;min-height:100vh;place-items:center;padding:24px;background:#f5f8f5;color:#263b31;font:16px/1.6 system-ui,sans-serif}
          main{width:min(520px,100%);padding:32px;border:1px solid #d7e1d9;border-radius:18px;background:#fff;box-shadow:0 18px 45px #203c2d18;text-align:center}
          .mark{display:grid;width:52px;height:52px;margin:0 auto 18px;place-items:center;border-radius:50%;background:${colour};color:#fff;font-size:26px}
          h1{margin:0 0 10px;color:${colour};font-size:28px}p{margin:0;color:#5b6861}a{display:inline-block;margin-top:24px;color:${colour};font-weight:700}
        </style>
      </head>
      <body><main><div class="mark">${success ? "✓" : "!"}</div><h1>${title}</h1><p>${safeMessage}</p><a href="https://yangyangcai.me/community/">Return to Community</a></main></body>
    </html>`).setTitle(title);
}
