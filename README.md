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
