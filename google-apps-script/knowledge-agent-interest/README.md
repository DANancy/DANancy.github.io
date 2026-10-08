# Build Your Knowledge Agent — interest form backend

This Google Apps Script web app stores workshop interest registrations in a Google Sheet and emails the owner for every submission.

## One-time setup

1. In Google Drive, create a Google Sheet named **Build Your Knowledge Agent — Interest**.
2. In that Sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder and save.
4. Select `setup` in the function menu and click **Run**.
5. Approve access to the spreadsheet and email-sending permission. The script creates a tab named **Knowledge Agent Interest**.
6. Click **Deploy → New deployment → Web app**.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone**.
9. Deploy, approve the requested permissions, and copy the `/exec` Web App URL.
10. Replace the website form's current FormSubmit `action` with that `/exec` URL.

When the script changes later, use **Deploy → Manage deployments → Edit**, select **New version**, and deploy again. Keep the same `/exec` URL.

## Website fields

The endpoint accepts a standard `POST` form with:

- `email` — required
- `source` — optional, for example `yangyangcai.me/community`
- `language` — optional, such as `en` or `zh`
- `website` — optional hidden honeypot; leave empty

Example:

```html
<form action="PASTE_YOUR_EXEC_URL" method="POST">
  <input type="hidden" name="source" value="yangyangcai.me/community">
  <input type="hidden" name="language" value="en">
  <input type="text" name="website" tabindex="-1" autocomplete="off" hidden>
  <input type="email" name="email" required>
  <button type="submit">I'm interested</button>
</form>
```

## Behaviour

- New emails create a row with status `Interested`.
- Repeated emails update the last-registration time and submission count instead of creating duplicates.
- Every valid submission sends a notification to `yangyangcai.au@gmail.com` with Reply-To set to the visitor.
- A script lock prevents simultaneous submissions from overwriting one another.
- Spreadsheet-formula prefixes in metadata fields are escaped.
