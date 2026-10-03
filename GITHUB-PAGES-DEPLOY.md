# Deploy Curu Games to GitHub Pages

Target domain: `https://games.thecurushop.com`

The `CNAME` file in this package already contains:

```
games.thecurushop.com
```

## 1. Extract this ZIP
Do not upload the ZIP itself as the website. Extract it and upload the **contents inside the CuruGames website folder** so `index.html` is at the repository root.

## 2. Create a GitHub repository
1. Sign in to GitHub.
2. Create a new repository, for example `curugames-website`.
3. Public is the simplest choice for GitHub Free Pages.
4. Create the repository.

## 3. Upload the files
Using GitHub's web UI:
1. Open the repository.
2. Choose **Add file → Upload files**.
3. Drag all extracted website files/folders into the upload area.
4. Confirm that `index.html`, `styles.css`, `app.js`, `CNAME`, `.nojekyll`, and the `assets` folder are at the repository root.
5. Commit the upload to the `main` branch.

## 4. Enable GitHub Pages
1. Repository → **Settings**.
2. Sidebar → **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Branch: `main`.
5. Folder: `/(root)`.
6. Save.

## 5. Set the custom domain
In the same **Settings → Pages** screen:
1. Under **Custom domain**, enter `games.thecurushop.com`.
2. Save.
3. GitHub may create/update the root `CNAME` file. That is okay; it should contain only `games.thecurushop.com`.

## 6. Point Hostinger DNS to GitHub Pages
In Hostinger hPanel:
1. **Domains → Domain portfolio**.
2. Manage `thecurushop.com`.
3. **DNS / Nameservers → DNS records**.
4. Find any existing `A`, `AAAA`, or `CNAME` record whose **Name/Host is `games`**. Remove conflicting records for that exact subdomain.
5. Add:

| Field | Value |
|---|---|
| Type | CNAME |
| Name / Host | `games` |
| Target / Points to | `<YOUR_GITHUB_USERNAME>.github.io` |
| TTL | Default / 14400 |

Do **not** modify the root `@` records for `thecurushop.com`. Your main website remains where it is.

## 7. Wait for DNS and enable HTTPS
DNS changes can take up to 24 hours, although they are often faster.

Return to GitHub **Settings → Pages**. When the domain check succeeds, enable **Enforce HTTPS**.

## 8. Verify
Open:
- `https://games.thecurushop.com/`
- `https://games.thecurushop.com/app-ads.txt`
- `https://games.thecurushop.com/sitemap.xml`
- `https://games.thecurushop.com/privacy.html`
- `https://games.thecurushop.com/delete-account.html`

## 9. Recommended GitHub domain verification
GitHub recommends verifying your custom domain to reduce takeover risk. In GitHub account settings → Pages, add `thecurushop.com` and add the TXT record GitHub gives you to Hostinger DNS. Keep that TXT record after verification.

## Important
The main Curu Shop site/backend is not moved to GitHub. Only the `games` subdomain points to GitHub Pages. The existing public API sync on `thecurushop.com` continues to serve the live Curu Games configuration/Pro Games data.
