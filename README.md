# Eagle Innovia Ltd — website

Static multi-page site for **www.eagleinnovia.com**, built with Astro + Tailwind CSS and hosted free on
GitHub Pages. Every push to `main` builds and deploys automatically.

## Run it locally

Requires **Node 22.23.4+ (Node 24 LTS recommended)** and **pnpm**.

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # production build into dist/
pnpm check:emails   # fails if any plain email address is in dist/
pnpm lint && pnpm typecheck
```

## Where to edit things

| What | Where |
|---|---|
| Phone, WhatsApp, CAC number, socials, prices, cohort date/fee, testimonials, team, store links, playlist URL, AfroRemote screenshot/results, analytics | `src/config/site.ts` (search for `TODO`) |
| Technology service pages | `src/content/services/*.md` |
| Academy programmes | `src/content/programmes/*.md` |
| Products (Ozzie Naturals + Digital Products) | `src/content/products/` — see `_README.md` there |
| Case studies | `src/content/case-studies/*.md` |
| Zoho contact form | `src/components/ZohoContactForm.astro` (instructions at the top of the file) |
| Logo | Replace `src/assets/logo-source.jpg`, then run `pnpm assets` |

Any block whose data is still `TODO` is hidden automatically — nothing fake is shown.

**Emails are bot-proof:** never type a full email address into a page. Use
`<ObfuscatedEmail user="info" domain="eagleinnovia.com" />`. CI fails if a plain address reaches `dist/`.

---

## Deploying to GitHub Pages

### 1. Push the code

The repository is `github.com/Sosthenes-arch/eagle-innovia-website`.

```bash
git add -A
git commit -m "New Eagle Innovia website"
git push origin main
```

### 2. Turn on GitHub Pages

Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The **Deploy to GitHub Pages** workflow (Actions tab) runs on every push to `main`. When it finishes, the
preview is live at:

**https://sosthenes-arch.github.io/eagle-innovia-website/**

Check every page there before touching DNS.

### 3. Verify the domain in your GitHub account (do this first — protects against domain takeover)

1. Profile picture → **Settings → Pages** (account settings, not the repository) → **Add a domain** →
   enter `eagleinnovia.com` → **Add domain**.
2. GitHub shows a **TXT record** named `_github-pages-challenge-Sosthenes-arch.eagleinnovia.com`
   with a code. Add that TXT record at your domain registrar/DNS host.
3. Wait (up to 24 h), then back in the same page click **⋯ → Continue verifying → Verify**.
4. Leave the TXT record in place permanently.

### 4. Add the custom domain to the repository

Repository → **Settings → Pages → Custom domain** → enter `www.eagleinnovia.com` → **Save**.
(GitHub recommends adding the domain here **before** creating the DNS records below.)

### 5. DNS records at your registrar

> ⚠️ **Do not touch MX, SPF (TXT `v=spf1…`), DKIM or DMARC records.** They run company email.
> Only change the records listed below. Remove any old A/AAAA/CNAME records for `@` and `www`
> that point to the previous host. Do not create wildcard (`*`) records.

| Type | Name / Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `sosthenes-arch.github.io` (no repository name) |

Values from [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) —
re-check them there before you change anything.

Check propagation from PowerShell:

```powershell
Resolve-DnsName www.eagleinnovia.com
Resolve-DnsName eagleinnovia.com -Type A
Resolve-DnsName eagleinnovia.com -Type MX   # must be unchanged
```

### 6. Switch the base path and enforce HTTPS

1. Repository → **Settings → Secrets and variables → Actions → Variables → New repository variable**:
   `BASE_PATH` = `/`. Then **Actions → Deploy to GitHub Pages → Run workflow** to rebuild.
2. When the DNS check in **Settings → Pages** turns green (can take up to 24 h), tick **Enforce HTTPS**.

Done: https://www.eagleinnovia.com serves the site, `eagleinnovia.com` redirects to `www`, and email is
unaffected.

---

## Zoho form — action needed in Zoho CRM

The current Zoho Web-to-Lead form has **no Email field**, so enquiries cannot be replied to by email.

1. Zoho CRM → **Setup → Developer Hub → Webforms** → edit form `WebToLeads7678017000000632312`.
2. Add the **Email** field (mark it mandatory) and optionally a **Service of interest** picklist.
3. Set **Landing Page URL** to `https://www.eagleinnovia.com/thank-you`.
4. Re-export the embed code and update `src/components/ZohoContactForm.astro` following the
   instructions at the top of that file (an Email field is
   `<FormField id="Email" name="Email" label="Email" type="email" autocomplete="email" required />`,
   and add `'Email'` to `mndFileds` in the script).

## Analytics

Off by default. To enable free, cookie-less analytics, set `analytics.provider` in `src/config/site.ts`
to `goatcounter` (and `goatcounterCode`) or `cloudflare` (and `cloudflareToken`).
