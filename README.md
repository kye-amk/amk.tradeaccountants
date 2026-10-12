# AMK Trade Accountants

Static website prepared for GitHub and Vercel.

## Deploy

Import this repository into the AMK Vercel account. Framework: Other. Root directory: repository root. No build command. Output directory: dist. These defaults are included in vercel.json. No environment variables are required.

## Local preview

Run `python3 -m http.server 8765 --directory dist` and visit http://localhost:8765.

## Temporary domain

All pages send an X-Robots-Tag noindex, nofollow header to keep the temporary domain out of search results. This is not access control. Remove this header when the permanent domain launches and add the final canonical URLs and sitemap.

## Content

index.html is the main website. scroll.html and static.html preserve comparison versions. Policy pages and local Sora font files are included. The original hosted mockup and its repository are separate.

## Before permanent launch

Replace the Kye portrait placeholder, confirm operating hours and the measurement period for the response statistic, and complete the privacy/provider and engagement checks. The privacy notice names Vercel as the hosting provider for this deployment.

## SEO configuration

`seo.config.json` is the source for the canonical site origin, phone number and indexing switch. `node scripts/build-seo.mjs` refreshes page titles/descriptions, canonical URLs, social previews, structured data and crawl files; Vercel runs it before deploying. The two design-comparison pages always remain noindex and canonicalise to the homepage.

The temporary site deliberately remains noindex. Its robots.txt allows crawlers to see that directive. A sitemap is generated only when indexing is enabled, so it does not advertise deliberately excluded pages.

### Permanent-domain launch

1. Connect and verify the permanent domain in Vercel, including the preferred www/non-www redirect.
2. Set `siteUrl` to that HTTPS domain in `seo.config.json` and `indexable` to true.
3. Remove the temporary global X-Robots-Tag header from `vercel.json`. The build intentionally rejects conflicting settings.
4. Run `node scripts/build-seo.mjs`, check metadata and sitemap.xml, commit and deploy.
5. Check the live HTTP headers, canonical URLs and robots directives. Verify Google Search Console and Bing Webmaster Tools using the real account-issued verification records, then submit the sitemap.
6. Redirect the temporary Vercel hostname to the permanent domain, and handle any old-domain page redirects if replacing an existing site.

UK-wide coverage is confirmed. Opening hours, social profiles and verification identifiers still require confirmation. Add them only after confirmation and keep structured data consistent with visible content. Genuine reviews and approved client case studies remain useful follow-up work. Search ranking and AI citations cannot be guaranteed by metadata.

## Confirmed service area and future domain

AMK serves clients across the United Kingdom. The future domain is https://amkaccountancy.co.uk, recorded in futureSiteUrl for reference only. It is not connected or activated by this configuration. Keep siteUrl on the Vercel origin and indexing disabled until the owner explicitly authorises the domain switch. Do not change DNS, redirects or live canonical URLs to the future domain before that approval.
