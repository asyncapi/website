All repositories in `asyncapi` organizations should be similar in structure, settings, and restrictions. Follow these guidelines to adjust settings of a new repository created in one of these organizations.

## Adjust repository options

Under the repository name, choose the **Settings** tab. The **Options** view opens as the default one in the left menu.

1. Scroll down to the **Features** section and clear these options:
    - Wikis
    - Projects

Make sure **Sponsorships** option is selected and `open_collective: asyncapi` is provided.

2. Go to the **Merge button** section and clear these options:
    - Allow merge commits
    - Allow rebase merging

Leave only the **Allow squash merging** option selected. This option combines all commits into one before merging the changes into the `master` branch.

3. Make sure option **Automatically delete head branches** is selected


## SonarCloud scans

Each repository must be integrated with https://sonarcloud.io/organizations/asyncapi/projects for automated quality and security scans.
If your project is not in the list, please add it via https://sonarcloud.io/projects/create.

## Add basic GitHub Actions configurations

AsyncAPI Github organization [global workflows](https://github.com/asyncapi/.github/tree/master/.github/workflows) cover mostly all the needs for most of the repositories.

Add basic workflow by **manually** triggering the [Global workflow to rule them all](https://github.com/asyncapi/.github/actions/workflows/global-workflows-support.yml) workflow as shown in the following screenshot:
![image](https://user-images.githubusercontent.com/1083296/115218253-a5e42480-a106-11eb-9723-165b9ba90e93.png)
