### 💡 Remember

---

Follow the **AsyncAPI CLI** installation instructions below, based on your computer's operating system.

<details>
<summary>▼ MacOS</summary>

- **Using `brew`**: You can install in MacOS via brew: `brew install asyncapi`.

- **Using `pkg`**: Each release of CLI produces a MacOS dedicated `pkg` file that enables you to install this CLI as MacOS application.

      ```shell
      # Download the latest release.
      curl -OL [https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg)

      # To download a specific release, your link should look similar to:
      # curl -OL [https://github.com/asyncapi/cli/releases/download/v0.13.0/asyncapi.pkg](https://github.com/asyncapi/cli/releases/download/v0.13.0/asyncapi.pkg)
      # All releases are listed in [https://github.com/asyncapi/cli/releases](https://github.com/asyncapi/cli/releases)

      # Install AsyncAPI CLI
      sudo installer -pkg asyncapi.pkg -target /
      ```

  </details>

<details>
<summary>▼ Linux</summary>

You can install in Linux via `dpkg`, a debian package manager:

```shell
curl -OL [https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb)
sudo dpkg -i asyncapi.deb
```

</details>

<details>
<summary>▼ Windows</summary>

For Windows, install the appropriate installer and follow the default installation steps to complete the installation process.

- For 64-bit, download [asyncapi.x64.exe](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x64.exe).
- For 32-bit, download [asyncapi.x86.exe](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x86.exe).

</details>

<details>
<summary>▼ Other OS</summary>

Read further [AsyncAPI CLI installation instructions for different operating systems](https://github.com/asyncapi/cli#installation).

</details>

### Using NPM and Node.js

Alternatively, you can install the **AsyncAPI CLI** with Node.js `>=v10` and [NPM](https://nodejs.org/en/download/package-manager/).

<details>
<summary>Install CLI globally</summary>

Install AsyncAPI CLI _globally_ with the following command:

```shell
npm install -g @asyncapi/cli
```

</details>

<details>
<summary>Install specific CLI version</summary>

To install a specific version of the AsyncAPI CLI, pass the `version` during installation:

```shell
npm install -g @asyncapi/cli@{version}
```

</details>
