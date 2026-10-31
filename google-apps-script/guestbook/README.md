# Guestbook and interest form backend

This Google Apps Script web app powers two forms on yangyangcai.me from one Google Sheet:

- **Guestbook** (Connect page): messages go to the **Guestbook** tab, the owner is emailed, and approved messages are served back to the site as shaped notes (cloud, star, tree, candy or note). Visitors can edit or delete their own notes from the browser they posted from.
- **Register interest** (the drawer opened from the homepage, the side tab and the Business page): registrations go to the **Interest** tab and the owner is emailed with Reply-To set to the visitor.

## One-time setup

1. In Google Drive, create a Google Sheet named **yangyangcai.me — Guestbook**.
2. In that Sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder and save.
4. Select `setup` in the function menu and click **Run**.
5. Approve access to the spreadsheet and email-sending permission. The script creates the **Guestbook** and **Interest** tabs, each with a Status dropdown.
6. Click **Deploy → New deployment → Web app**.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone**.
9. Deploy, approve the requested permissions, and copy the `/exec` Web App URL.
10. In GitHub, open the repository's **Settings → Secrets and variables → Actions → Variables** and add `NEXT_PUBLIC_GUESTBOOK_URL` with that `/exec` URL. For local development, add the same line to `.env`.
11. Re-run the deploy workflow (or push a commit) so the site is rebuilt with the URL.

Until `NEXT_PUBLIC_GUESTBOOK_URL` is set, the guestbook shows "opening soon" and the interest form falls back to FormSubmit.

## Updating the script

1. Replace the editor contents with the new `Code.gs` and save.
2. Run `setup` again. It is safe to re-run: existing rows are kept and missing tabs or columns are added.
3. Use **Deploy → Manage deployments → Edit (pencil)**, choose **New version**, and deploy. Keep the same `/exec` URL.

Update the script **before** deploying a website change that depends on it.

## Managing submissions

Guestbook tab:

- Every new message arrives with Status `Pending` and is not shown on the site.
- Change Status to `Approved` to publish it, or `Hidden` to keep it off the site.
- The site shows up to 50 approved messages, newest first, in the shape and colour the visitor picked. Approved messages are cached for about a minute.
- Every note is translated with Google Translate (`LanguageApp`) into **Message (EN)** and **Message (ZH)**. The English site shows the English version and the Chinese site the Chinese version, with a "Show original" link. Fix a translation by editing those cells; a blank cell falls back to the original message.
- When a visitor edits their note, it goes back to `Pending` and you get another email. When they delete it, the row is removed.
- Visitors can only change their own notes: each note gets a random edit key that is returned once to the visitor's browser. The sheet stores only a SHA-256 hash of it, in the hidden **Edit key hash** column. Leave the **ID** and **Edit key hash** columns as they are, or the visitor loses the ability to edit.

Interest tab:

- Every registration arrives with Status `New`. Use `Contacted` and `Done` to track follow-up.
- Reply to the notification email to reach the visitor directly.

## Endpoints

`GET /exec` returns approved guestbook messages. Add `?mine=id1,id2` to also get the current status of the visitor's own notes (missing IDs have been deleted):

```json
{ "ok": true, "messages": [{ "id": "…", "date": "2026-10-31", "name": "Alex", "message": "Hello!", "color": "mint", "shape": "star" }], "mine": { "…": "Pending" } }
```

`POST /exec` accepts a form-encoded body. Every request may include `language` (`en` or `zh`) and the hidden honeypot `website`, which must be empty.

- `type=guestbook` (default): `name` (required, up to 40 characters), `message` (required, up to 500), `color` (`cyan` (default), `mint`, `yellow`, `pink` or `purple`), `shape` (`cloud` (default), `star`, `tree`, `candy` or `note`). Responds with the new note's `id`, its `editKey` and `date`.
- `type=guestbook_update`: `id`, `editKey`, plus the same fields as above. The note goes back to `Pending`.
- `type=guestbook_delete`: `id`, `editKey`.
- `type=interest`: `email` (required), `interests` (comma-separated), `details` (optional, up to 500).

It responds with `{ "ok": true }`, or `{ "ok": false, "error": "missing_fields" | "invalid_email" | "not_found" | "rate_limited" | "server_error" }`. `not_found` means the note doesn't exist or the edit key doesn't match..

## Behaviour

- New submissions are capped at 10 per minute across the whole site to slow down spam bursts.
- A script lock prevents simultaneous submissions from overwriting one another.
- Spreadsheet-formula prefixes in submitted text are escaped.
