## CLI Installation
<details>
<summary>MacOS</summary>

`brew`
</br>
You can install in MacOS via brew: `brew install asyncapi`.

`pkg`
</br>
Each release of CLI produces a MacOS dedicated pkg file that enables you to install this CLI as MacOS application.

```
# Download latest release. To download specific release, your link should look similar to https://github.com/asyncapi/cli/releases/download/v0.13.0/asyncapi.pkg. All releases are listed in https://github.com/asyncapi/cli/releases
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg
# Install AsyncAPI CLI
sudo installer -pkg asyncapi.pkg -target /
```

</details>

<details>
<summary>Linux</summary>

You can install in Linux via `dpkg`, a debian package manager:

1. `curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb` 
2. `sudo dpkg -i asyncapi.deb`

</details>

<details>
<summary>Other OS</summary>

[Read further AsyncAPI CLI installation instructions for different operating systems](https://github.com/asyncapi/cli#installation).
</details>
</details>
