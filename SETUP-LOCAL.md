## Local setup (Windows / PowerShell)

This file contains concise, PowerShell-friendly steps to get the AsyncAPI `website` repository running locally.

Prerequisites
- Node.js >= 20.12.0 (you have v22.x — OK)
- npm >= 10.5.0 (you currently have npm 9.x; upgrading npm is recommended)

Quick checks
```powershell
node -v    # should be >= 20.12.0
npm -v     # recommended >= 10.5.0
```

If you want to upgrade npm (optional but recommended):
```powershell
npm install -g npm@10
```

Install dependencies
```powershell
cd "D:\OPEN SOURCE\website"
npm install
```

Run the development server
```powershell
npm run dev
# open http://localhost:3000
```

Run Storybook
```powershell
npm run dev:storybook
# open http://localhost:6006
```

Build (production)
```powershell
npm run build
npm run start   # serves the static build
```

Useful scripts
- `npm run lint` — run lint checks
- `npm run lint:fix` — auto-fix lint issues
- `npm run lint:mdx` — lint MDX files
- `npm run test` — run jest tests (may be none)
- `npm run test:e2e` — run Cypress e2e tests (`npx cypress run`)
- `npm run build:storybook` — build storybook static site

Netlify local dev
```powershell
netlify dev
# or: netlify dev --context production
```

Docker (optional)
```powershell
docker compose up --watch
```

Notes & gotchas observed when installing in this environment
- The README requires npm >= 10.5.0. Installation succeeded with npm 9.x but you may see engine warnings. If you run into script failures, upgrade npm to 10.x.
- `npm install` may report vulnerabilities. Use `npm audit` / `npm audit fix` to inspect and address them as appropriate. The project is large and some warnings come from transitive deps.
- Running `npm run dev` triggers build scripts that generate pages from scripts in `scripts/` — this can take some time the first run.

Working with branches & making a PR
```powershell
# create a topic branch from your fork's clone (already done here):
git checkout -b feat/your-topic
git add .
git commit -m "feat: short descriptive title"
git push origin feat/your-topic
# open a PR on GitHub from your branch to asyncapi/website
```

If you want me to push this branch to your fork or open a PR for you, tell me the fork remote name (e.g. `origin`) and I'll prepare the push command.

Troubleshooting
- If `npm run dev` fails because of missing environment variables, check `.env.example` or `netlify/*.env` files. Some scripts expect GitHub API access for dynamic content — that's fine for local dev;
  you can stub or skip those scripts if necessary.
- If you see errors about `next` or `typescript`, run `npm run build` to reveal compile-time errors.

References
- See `README.md` and `CONTRIBUTING.md` in the repo for full contribution guidelines.

---
Generated automatically by local setup assistant on 2025-10-30.
