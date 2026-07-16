## Executive Summary

On the morning of July 14, 2026, the AsyncAPI security team responded to an active supply chain attack on two of our core Github repositories. The incident began with a coordinated PR spam storm on the [generator repository](https://github.com/asyncapi/generator) designed to spam our CI/CD pipelines with workflow builds and exhaust maintainer triage bandwidth, deliberately masking a targeted malicious pull request that already been closed at the point of spam PR discovery.

By exploiting a legacy, unmerged security fix targeting a workflow utilizing `pull_request_target` that was susceptible to a **pwn request attack**, the attacker successfully exfiltrated the GitHub Personal Access Token (PAT) credential of our administrative automation bot, `asyncapi-bot` from the malicious PR in the generator repo. This compromised token was used to force-push malicious code directly to release branches, triggering our automated pipelines to publish **five trojanized package versions** to the npm registry with valid [OIDC](https://docs.npmjs.com/trusted-publishers) (OpenID Connect) Trusted Publishing provenance. 

Following successful lateral movement, the attacker used the same `asyncapi-bot` token to compromise our specification repository. The active distribution window spanned **approximately 4 hours and 20 minutes** before the rogue versions were thoroughly taken down and purged from the npm registry.

## Impact

* **Severity:** **Critical (CVSSv3 9.8)**. The injected Miasma RAT variant executes immediately on library load. It does not wait for a postinstall script; the exact millisecond any of the compromised libraries are imported via `require` or `import` by a downstream application, developer machine, or build server, the payload triggers. This granted the attacker immediate, silent arbitrary code execution (ACE) and persistent backdoor capabilities on victim environments.

* **Exposure Window:** Exactly **4 hours and 20 minutes**. The first malicious package push occurred at **06:58 UTC (08:58 CEST)**, and final npm registry take-down and purging were completed by **11:18 UTC (13:18 CEST)**. 

* **Credentials Compromised:** The organization-wide administrative Personal Access Token (PAT) belonging to `asyncapi-bot` was successfully exfiltrated. This allowed the attacker to bypass branch protections, execute force-pushes, and pivot between separate organizational repositories. The token has since been entirely revoked and rotated.

### Compromised Repositories
* `asyncapi/generator` – Initial compromise and exfiltration target.
* `asyncapi/spec-json-schemas` – Lateral movement target.

### Affected Packages
The following table details the five explicit malicious versions published with legitimate OIDC provenance during the exposure window:

| Package | Malicious Version | Last Safe Version | Target Repository | Registry Status |
| :--- | :--- | :--- | :--- | :--- |
| `@asyncapi/generator` | `3.3.1` | `3.3.0` | `asyncapi/generator` | Purged from npm |
| `@asyncapi/generator-helpers` | `1.1.1` | `1.1.0` | `asyncapi/generator` | Purged from npm |
| `@asyncapi/generator-components` | `0.7.1` | `0.7.0` | `asyncapi/generator` | Purged from npm |
| `@asyncapi/specs` | `6.11.2` | `6.11.1` | `asyncapi/spec-json-schemas` | Purged from npm |
| `@asyncapi/specs` | `6.11.2-alpha.1` | `6.11.1` | `asyncapi/spec-json-schemas` | Purged from npm |

## The Investigation

### Incident Response & Containment Timeline

All timestamps are standardized to **UTC** (with local CEST in parentheses) for forensic uniformity.

| Time (UTC) | Time (CEST) | Event |
| :--- | :--- | :--- |
| **05:04 UTC** | 07:04 AM | The automated spam-bot attack officially starts, flooding the `asyncapi/generator` repository with duplicate AI spam PRs to exhaust logging and notifications. |
| **05:08 UTC** | 07:08 AM | **The Trojan Horse:** The attacker sneaks the actual exploit pull request, [PR #2155](https://github.com/asyncapi/generator/pull/2155), into the middle of the spam wave. |
| **05:16 UTC** | 07:16 AM | **The Exploit Executes:** The privileged `pull_request_target` workflow triggers on PR #2155 under [Run 29307859879](https://github.com/asyncapi/generator/actions/runs/29307859879/job/87005107907). The administrative credentials for `asyncapi-bot` are exfiltrated. The attacker immediately closes PR #2155 to clean up the UI. Using the stolen credentials, the attacker performs a local `git reset` to clean [Commit 47be388](https://github.com/asyncapi/generator/commit/47be3886e460107a4ea5ce88ad674a65724ac4a7) and force-pushes [Commit ff010ef](https://github.com/asyncapi/generator/commit/ff010ef38e1be1ffc4112c8903f43637ecbf4041) to the release branch to hide payload differences from visual diff tools. |
| **05:28 UTC** | 07:28 AM | Incident response path initiates: Sudden wave of GitHub notifications for spam PRs being opened and immediately closed by rotating dummy accounts is detected. |
| **05:43 UTC** | 07:43 AM | Core maintainers begin blocking active spam accounts, but the automated script continuously generates new throwaway handles to bypass initial blocks. |
| **05:51 UTC** | 07:51 AM | **CI Flood Analyzed:** Triage team isolates anomalous CI runs (identifying [Run 29309476665](https://github.com/asyncapi/generator/actions/runs/29309476665)) and identifies that the spam wave is a front for an active supply chain compromise. |
| **06:09 UTC** | 08:09 AM | **Exploit PR #2155 Located:** Deep review of closed PRs isolates [PR #2155](https://github.com/asyncapi/generator/pull/2155), confirming exploitation of the identical `pull_request_target` vulnerability flagged in open security [PR #2092](https://github.com/asyncapi/generator/pull/2092). |
| **06:12 UTC** | 08:12 AM | **PR Lockdown:** The final automated spam PR is created. Maintainers immediately lock down repository settings so that **only organization members** can open PRs, neutralizing the spam storm. |
| **06:58 UTC** | 08:58 AM | **Malicious Pushes to Generator:** The attacker pushes malicious [Commit 3eab3ec](https://github.com/asyncapi/generator/commit/3eab3ec9304aa26081358330491d3cfeb55cc245) to the `next` branch, appending ~15,000 characters of obfuscated malware using variable renaming structures (`_0x1dd48b`, `_0x1dd2`) to line 69 of `validator.js`. |
| **07:08 UTC** | 09:08 AM | Forensic review traces out the exact sensitive workflow run ([Run 29307859879](https://github.com/asyncapi/generator/actions/runs/29307859879/job/87005107907)) where the token exfiltration took place. |
| **07:10 UTC** | 09:10 AM | The `release-with-changesets.yml` pipeline triggers automatically on the rogue push, publishing the compromised generator packages (`@asyncapi/generator@3.3.1` via commit `1f293af593`, `@asyncapi/generator-helpers@1.1.1` via commit `f8abf1890a`, and `@asyncapi/generator-components@0.7.1` via commit `c7875ff3dd`) to npm via OIDC. |
| **07:30 UTC** | 09:30 AM | Internal incident response broadcast clarifies the exact mechanism of the pwn request attack, the local git history rollback evasion trick, and the presence of the payload in our branch lineage. |
| **07:50 UTC** | 09:50 AM | External security disclosure from [LidorMachluf](https://github.com/LidorMachluf) on [Generator Issue #2184](https://github.com/asyncapi/generator/issues/2184) alerts the team that compromised packages are actively live on npm. |
| **07:51 UTC** | 09:51 AM | **Lateral Spec Attack:** The attacker pivots laterally to the specification repo (`asyncapi/spec-json-schemas`), pushing 11 direct commits ending in [Commit 689f5b9669](https://github.com/asyncapi/spec-json-schemas/commit/689f5b96693bf6f80907e868c2d2cbef01b87352) to `master` and `alpha` using the compromised token. The dropper is injected into `index.js`, padded with ~700 spaces to push it off-screen in standard diffs. |
| **07:55 UTC** | 09:55 AM | **NPM Takedown Filed:** Maintainers submit the rogue packages directly to the npm security team for emergency registry eviction. An internal audit of organization-wide bot access permissions is concurrently initiated. |
| **08:06 UTC** | 10:06 AM | The automated `if-nodejs-release.yml` pipeline in the specification repository builds and publishes the pre-release `@asyncapi/specs@6.11.2-alpha.1` to npm. |
| **08:30 UTC** | 10:30 AM | External triage notification from Charlie Ericksen (Aikido Security) cross-verifies the lateral movement. Simultaneously, the specification pipeline finishes building and publishes the stable `@asyncapi/specs@6.11.2` package to npm. |
| **08:40 UTC** | 10:40 AM | **Decommissioning & Credentials Rotation:** The `asyncapi-bot` account is stripped of administrative privileges organization-wide and downgraded to read-only. All active tokens are rotated and invalidated. |
| **11:18 UTC** | 11:18 AM | npm Security team successfully unpublishes and purges all 5 malicious package versions from the public registry, concluding the active distribution window. |

### Root Cause of the Attack

The core of this incident tracks back to an exposed vulnerability in our CI/CD architecture. During prior security reviews, this exact structural risk was mapped, resulting in the submission of [Pull Request #2092](https://github.com/asyncapi/generator/pull/2092) to secure `.github/workflows/manual-netlify-preview.yml`. Because this fix sat unmerged in the organizational backlog, the flaw remained exposed, allowing the attacker to weaponize the identical vector.

The root cause consists of four systemic technical failures:

1. **Vulnerable `pull_request_target` Implementation:** In `manual-netlify-preview.yml`, the workflow triggered on pull requests but checked out and processed untrusted code from the fork PR within a privileged context. By running arbitrary build steps on unreviewed fork code under `pull_request_target`, the attacker's [PR #2155](https://github.com/asyncapi/generator/pull/2155) successfully executed code that dumped and exfiltrated the administrative `asyncapi-bot` PAT from the runner's environment variables.
2. **Over-Privileged Automation Credentials:** The global service account, `asyncapi-bot`, possessed cross-repository administrative write access org-wide. Because our repository configurations lacked strict branch protections enforcing constraints on administrative accounts ("Include Administrators"), the single token compromise on the generator repository allowed immediate lateral escalation into our specification repositories.
3. **Automated OIDC Publishing with Insufficient Gates:** The organization's migration to OpenID Connect (OIDC) Trusted Publishing successfully eliminated static npm tokens from GitHub Secrets. However, the system lacked environment-based deployment gates. OIDC validates *where* a request originates (repository identity and branch context), not the *integrity* of the underlying code changes. Once the attacker possessed direct push rights via the stolen PAT, our legitimate release pipeline executed, requested a valid OIDC identity token from the registry, and authorized the trojanized releases.
4. **Attacker Evasion Tactics:** The attacker used a dual-layered evasion technique to bypass detection. First, an automated spam-PR storm flooded active runner logs to bury the malicious execution track. Second, after exfiltrating the token, the attacker closed the PR and performed a local `git reset` to a clean baseline commit before pushing. This local rollback strategy meant that no physical code differences were surfaced in standard GitHub PR visual diffing tools, masking the initial backdoor vector.

### Current Status

While immediate risk mitigation has been achieved via token revocation and npm unpublishing, deleting tags popinting to the malicious releases repository cleanup tasks remain incomplete which the security maintainers are actively working through to remediate. We are collaborating directly with the GitHub Security Team to purge the attacker's rogue commits from remote branch histories to prevent downstream users from pulling malicious git refs.

The following table tracks the active state of forensic cleanup across the organization:

| Repository | Component / Asset | Target Ref / Artifact | Remediation Action Required | Current Status |
| :--- | :--- | :--- | :--- | :--- |
| `asyncapi/spec-json-schemas` | Branch Head | `master` | Force-restore branch head to last legitimate commit: `57f4e61c23` | **🔴 OUTSTANDING** (Still points to malicious `689f5b9669`) |
| `asyncapi/spec-json-schemas` | Git Tags & Releases | `v6.11.2`<br>`v6.11.2-alpha.1` | Complete deletion of GitHub Release objects and underlying git tags | **🔴 OUTSTANDING** (Releases live on GitHub) |
| `asyncapi/generator` | Git Tags & Releases | `@asyncapi/generator@3.3.1`<br>`@asyncapi/generator-helpers@1.1.1`<br>`@asyncapi/generator-components@0.7.1` | Complete deletion of GitHub Release objects and underlying git tags | **🔴 OUTSTANDING** (`3.3.1` still served as 'Latest' on GitHub Release page) |
| `asyncapi/generator` | Branch Head | `next` | Delete compromised branch tracking the malicious lineage | **🟢 CLEANED** (Branch deleted by maintainers at 07:44 UTC) |

## Lessons Learned and Future Security Hardening Initiative

This incident exposed critical structural deficiencies in credential boundaries, branch protection enforcement, and security backlog triage. The following architectural mandates are being enacted across the organization:

1. **Isolation of Privileged Contexts:** We will completely eliminate the execution of downstream dependencies, `npm install` actions, or arbitrary build scripts inside workflows running under a `pull_request_target` context. All future preview deployments will be isolated to zero-privilege, ephemeral execution environments.
2. **Zero-Day Backlog SLAs for Core Workflows:** Security architecture contributions—specifically remediation fixes like Florence's [PR #2092](https://github.com/asyncapi/generator/pull/2092)—will be assigned zero-day prioritization SLAs to prevent exposed vectors from remaining in the backlog.
3. **Deprecation of Global Personal Access Tokens:** The organization is deprecating global, administrative PATs for automation. Service accounts will transition exclusively to repository-specific GitHub App installations restricted to least-privilege permissions.
4. **Enforcement of Global Rulesets on Administrators:** We are modifying all organizational branch protections to explicitly enable **"Include Administrators"**. This ensures that administrative automation accounts are bounded by branch rules, explicitly preventing direct force-pushes to production lineages.

We acknowledge and thank our maintainers Florence, Ashish, Lukasz, Thulie, alongside independent researchers Lidor Machluf and Charlie Ericksen (Aikido Security) for their swift defensive coordination, and the security engineering teams at npm for npm rapid registry intervention.

### Published Security Blogs on the Attack
For a comprehensive technical analysis of the exfiltration paths and Miasma RAT internals associated with this incident, reference the following external research:
* **StepSecurity Analysis:** [Compromised next branch pushes malicious @asyncapi/generator to npm](https://www.stepsecurity.io/blog/compromised-next-branch-pushes-malicious-asyncapi-generator-generator-helpers-and-generator-components-to-npm) – *Focuses on the CI/CD pipeline exploit and OIDC token minting.*
* **Wiz Threat Research:** [M-Red-Team: AsyncAPI Supply Chain Compromise via GitHub Actions](https://www.wiz.io/blog/m-red-team-asyncapi-supply-chain-compromise-via-github-actions) – *Provides a deep-dive forensic teardown of the Miasma RAT payload signatures and its retrieval from IPFS.*

## PHASES OF THE ATTACK

```
[Initial Access: PR #2155 (pull_request_target)]
                      │
                      ▼
[Credential Access: asyncapi-bot PAT Exfiltrated]
                      │
                      ▼
[Persistence / Lateral Movement: Direct Force-Pushes & Spec Repo Pivot]
                      │
                      ▼
[Impact / Payload Delivery: On-Load Dropper -> Miasma RAT via IPFS]
```

### Initial Access
* **MITRE ATT&CK Technique:** **T1190 – Exploit Public-Facing Application**
* **Mechanism:** The attacker targeted the configuration of `.github/workflows/manual-netlify-preview.yml` within `asyncapi/generator`. By designing [PR #2155](https://github.com/asyncapi/generator/pull/2155) to run malicious code paths inside the high-privilege `pull_request_target` context, the untrusted code from the fork was executed with access to the upstream repo's secrets. Concurrently, the attacker leveraged a PR spam storm (generating dozens of automated, ephemeral pull requests) to clutter run histories, exhaust automated logging alerts, and delay human maintainer observation.

### Credential Access
* **MITRE ATT&CK Technique:** **T1552.005 – Unsecured Credentials: Cloud Tokens**
* **Mechanism:** During execution of the vulnerable workflow under Run `29307859879`, the attacker's code extracted the environment's `GITHUB_TOKEN` or repository-stored PAT representing the `asyncapi-bot` account. Because the workflow ran in a context with write-access secrets, the runner exposed the high-privilege administrative token directly to the execution space, allowing the payload to dump the token and exfiltrate it to an external server.

### Persistence & Lateral Movement
* **MITRE ATT&CK Technique:** **T1078.004 – Valid Accounts: Cloud Accounts**
* **Mechanism:** Armed with the stolen `asyncapi-bot` PAT, the attacker bypassed default branch protection restrictions. To clear their tracks from standard PR visual diff interfaces, the attacker executed a local history rollback trick via `git reset`, force-pushing commit `ff010ef38e1be1ffc4112c8903f43637ecbf4041` to overwrite the initial footprint of `47be3886e460107a4ea5ce88ad674a65724ac4a7`. 

Using the identical global token, the attacker pivoted laterally across the organization to `asyncapi/spec-json-schemas`. Because the token possessed administrative write authority across multiple repositories, they successfully pushed an unsigned 11-commit chain directly to the specification repository's `master` and `alpha` branches without initiating a pull request or code review.

### Impact & Payload Delivery
* **MITRE ATT&CK Technique:** **T1565.001 – Data Manipulation: Stored Data Manipulation**
* **Mechanism:** The delivery phase was achieved by weaponizing the repositories' automated build pipelines. 
  * In `asyncapi/generator`, the attacker pushed commit `3eab3ec9304aa26081358330491d3cfeb55cc245`, embedding ~15,000 characters of minified, obfuscated JavaScript directly into line 69 of `validator.js` (hiding behind a standard whitespace modification). The code utilized distinct variable arrays (e.g., `_0x1dd48b`, `_0x1dd2`).
  * In `asyncapi/spec-json-schemas`, the attacker injected the dropper into `index.js`, prepending the payload with a block of ~700 spaces to push the code off-screen in standard diff viewers.

The payload was engineered to execute immediately on library load, rather than via traditional `postinstall` scripts. The moment a downstream system imports any compromised library, the code forks a detached child process (`node -e`), ensuring execution persists even if the parent application crashes or terminates. 

The stage-1 loader uses `https` and file system operations (`fs.writeFileSync`) to reach out to the InterPlanetary File System (IPFS) gateway, pull down the stage-2 payload binary (**Miasma RAT**), write it to a hidden directory, and execute it locally.

#### Detailed Indicators of Compromise (IOCs)

##### Cryptographic Git Commit Hashes (Malicious Lineage)
* **Generator Source Payload:** `3eab3ec9304aa26081358330491d3cfeb55cc245`
* **Generator Release Tag Commit:** `1f293af5936a5f6ccdaa57d1083759e876cc4085`
* **Generator-Helpers Release Tag Commit:** `f8abf1890ace11852c4341d5f4ce6567ad87bea5`
* **Generator-Components Release Tag Commit:** `c7875ff3dd741aba4aba7317716f7158a012287e`
* **Specification Repo Lineage Head:** `689f5b96693bf6f80907e868c2d2cbef01b87352`

##### Stage-2 Network Infrastructure
* **IPFS Content Identifier (CID):** `Qmet4fhsAaWMBUxNDfREHwgiyDeSWy4YSYs9wiKUW5jGyf`
* **Malware Retrieval URI:** `https://ipfs.io/ipfs/Qmet4fhsAaWMBUxNDfREHwgiyDeSWy4YSYs9wiKUW5jGyf`

##### Host-Based Forensic Signatures (Miasma RAT Drop Paths)
* **Windows Platforms:** `%LOCALAPPDATA%\NodeJS\sync.js`
* **macOS Platforms:** `~/Library/Application Support/NodeJS/sync.js`
* **Linux Platforms:** `~/.local/share/NodeJS/sync.js`