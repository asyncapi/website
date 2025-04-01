---
title: 'Auto-complete setup'
weight: 30
---

# AsyncAPI CLI Autocomplete Setup

This guide provides steps to enable autocomplete for the AsyncAPI CLI. The setup supports `zsh`, `bash`, and `PowerShell` (manual setup only).

## Automatic Setup (Post-Install Script)
The AsyncAPI CLI includes a post-install script that automatically configures autocomplete for supported shells (`zsh` and `bash`). No additional steps are required.

### Steps:
1. Ensure that AsyncAPI CLI is installed. You can verify by running:
   ```sh
   asyncapi --version
   ```
   If the command fails, install it using:
   ```sh
   npm install -g @asyncapi/cli
   ```


2. Apply the changes by running:
   ```sh
   source ~/.bashrc   # For bash
   source ~/.zshrc    # For zsh
   ```

3. Verify autocomplete by typing:
   ```sh
   asyncapi <TAB>
   ```
   You should see command suggestions.

## Manual Setup (For PowerShell and Troubleshooting)
If the automatic setup does not work or if you need to enable autocomplete manually (especially for PowerShell), follow these steps.

### Steps:
1. **Build the AsyncAPI CLI manually:**
   If you are working with the CLI project locally, you need to build it first:
   ```sh
   npm install
   npm run build
   ```

2. **Run the autocomplete command manually:**
   ```sh
   ./bin/run autocomplete  # Run this from the project root folder
   ```

3. **Locate the AsyncAPI CLI executable:**
   Run the following command to find the executable path:
   ```sh
   which asyncapi   # For bash/zsh
   Get-Command asyncapi | Select-Object -ExpandProperty Definition   # For PowerShell
   ```
   If the command does not return a path, ensure AsyncAPI CLI is installed.

4. **Generate and apply the autocomplete script:**
   Run the following command based on your shell:
   ```sh
   printf "$(./bin/run autocomplete script bash)" >> ~/.bashrc; source ~/.bashrc   # For bash
   printf "$(./bin/run autocomplete script zsh)" >> ~/.zshrc; source ~/.zshrc       # For zsh
   printf "$(./bin/run autocomplete script powershell)" >> $PROFILE; . $PROFILE    # For PowerShell
   ```

5. **Test autocomplete:**
   ```sh
   asyncapi <TAB>
   ```
   If it works, autocomplete is successfully enabled!

---

If you encounter any issues, ensure that your shell configuration file is correctly updated and sourced. Restart your terminal if necessary.

