# Weekly LinkedIn Sync

The diogonet page at `/` is a 2007-LinkedIn-style reskin of your actual
LinkedIn profile. The content comes from `data/linkedin.json`, which is
re-generated weekly by a GitHub Action that calls Proxycurl.

## One-time setup

1. **Get a Proxycurl API key** — sign up at https://nubela.co/proxycurl
   and copy the bearer token from your dashboard. Each profile lookup is
   ~$0.01, so weekly sync is well under $1/year.

2. **Add two repository secrets** in GitHub →
   *Settings → Secrets and variables → Actions → New repository secret*:

   | Name | Value |
   |---|---|
   | `LINKEDIN_PROFILE_URL` | `https://www.linkedin.com/in/<your-handle>` |
   | `PROXYCURL_API_KEY`    | the bearer token from step 1 |

3. **Enable Actions** (if your repo is forked/new): Actions tab → "I
   understand my workflows, go ahead and enable them".

## What runs

- **`.github/workflows/sync-linkedin.yml`** — cron `0 6 * * 0` (Sundays
  06:00 UTC). Calls `npm run sync:linkedin`, commits `data/linkedin.json`
  if anything changed, and pushes. Vercel rebuilds on push so the site
  picks up the new data within ~2 minutes.
- **`npm run sync:linkedin`** — runs the same script locally; useful for
  the very first sync or when you've just updated your LinkedIn and don't
  want to wait until Sunday. Requires the same env vars set in your shell.
- **"Run workflow"** button in the GitHub Actions tab — manual trigger any
  time, no schedule wait.

## Files involved

| Path | Role |
|---|---|
| `data/linkedin.json` | The canonical snapshot. Committed to the repo. |
| `lib/linkedin.ts` | TypeScript types + `getLinkedInProfile()` loader. |
| `scripts/sync-linkedin.ts` | Fetches Proxycurl, normalises, writes JSON. |
| `.github/workflows/sync-linkedin.yml` | Weekly cron. |
| `components/pages/HomeProfile.tsx` | 2007-LinkedIn page that renders the data. |
| `app/linkedin2007.css` | Styling for the 2007 LinkedIn skin. |

## Customising what shows up

`HomeProfile.tsx` already hides any section whose array is empty. To
restructure (e.g. drop Honors entirely or add a new section), edit
`HomeProfile.tsx` — the JSON shape is fixed by `lib/linkedin.ts`.

## Why not the official LinkedIn API?

LinkedIn's public API (`r_basicprofile`) only exposes ~4 fields about the
authenticated viewer; full profile data is partner-only. Proxycurl is the
standard third-party workaround and is what tools like Clay and Pipedrive
use under the hood.
