---
title: Git Workflow
weight: 50
---

# Git Workflow

This document is the best practice guide that contains the rules to follow when working with AsyncAPI repositories.

## Overview

AsyncAPI uses a fork model for all community members, including maintainers. In this model, you push changes to your own working copy of the original (`upstream`) repository, and then create one or more pull requests (PRs) to incorporate changes from your fork to `upstream`. This unified workflow allows both members and external contributors to contribute through the same process, keeping the main repository branches clean.

### Rules

Each contributor and maintainer in AsyncAPI must follow this workflow:

- Work on forked repositories.
- Create branches on the fork.
- Avoid working directly on the `master` branch of the fork.
- Create pull requests from the fork to the upstream repository.

## Fork a repository

1. On GitHub, navigate to the AsyncAPI repository you want to fork.
2. In the top-right corner of the page, click **Fork**.
3. Under **Owner**, select the dropdown menu and click an owner for the forked repository.
4. Ensure that the **Copy the `DEFAULT` branch only** is selected.
5. Click **Create fork**.

## Clone the forked repository

1. On GitHub, navigate to the forked repository.
2. Click the **Code** button.
3. Copy the URL.
4. In the terminal, navigate to the directory where you want to clone the repository.
5. Run the following command:
    
    ```bash
    # Command syntax
    git clone URL
    
    # Examples
    git clone https://github.com/YOUR-USERNAME/asyncapi-community.git
    git clone git@github.com:YOUR-USERNAME/asyncapi-community.git
    ```

## Configure your fork

Configure a remote repository that points to the `upstream` repository (from which you forked). This allows you to synchronize changes you make on the fork with the original repository. Configuration can be done manually or using the GitHub UI.

> [!TIP]
> If you perform fork configuration for the first time, it is recommended to do it manually to understand all the steps.
>
> Next time you can write a script to synchronize master branch of your fork with the master branch of upstream git repository. Check [this script](https://gist.github.com/derberg/87319e9c486e4a6c9bef5b629ab0d386) as an example to get started.

### Manual configuration

In the terminal, navigate to your fork's location and perform the following steps:

1. Check the current list of remotes:
    
    ```bash
    # Command
    git remote -v
    
    # Output
    origin  https://github.com/YOUR-USERNAME/FORK-NAME.git (fetch)
    origin  https://github.com/YOUR-USERNAME/FORK-NAME.git (push)
    ```

2. Add the `upstream` repository. In other words, point to the main project located in the AsyncAPI GitHub organization:

    ```bash
    # Command
    git remote add upstream https://ORIGINAL-OWNER/ORIGINAL-REPOSITORY-NAME.git
    
    # Example
    git remote add upstream https://github.com/asyncapi/community.git
    ```
    
    Verify that the `upstream` has been added:
    
    ```bash
    git remote -v
    
    # Output
    origin https://github.com/YOUR-USERNAME/FORK-NAME.git (fetch)
    origin https://github.com/YOUR-USERNAME/FORK-NAME.git (push)
    upstream       git@github.com:asyncapi/asyncapi-community.git (fetch)
    upstream       git@github.com:asyncapi/asyncapi-community.git (push)
    ```

3. Fetch changes from the `upstream`:

    ```bash
    # Command
    git fetch upstream master
    ```

4. Set the `master` branch of your fork to track the `master` branch of the `upstream` repository:

    ```bash
    git branch -u upstream/master master
    ```
    
    Verify with `git branch -vv`:
    ```bash
    * master           c2226e0 [upstream/master] Update the README.md document
    ```

By setting the `upstream` branch, you can simplify your workflow. For example, you can use `git pull` and `git push` without specifying the remote and branch names, as Git will automatically use the `upstream` branch you have set. This is particularly useful when you frequently need to synchronize your local branch with a remote branch.

### Using GitHub UI

You can follow the steps from the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to sync your fork and keep it up-to-date with the `upstream` repository.

## Start Contributing

1. Create a branch on your fork.
2. Commit changes with clear messages. Use the [Conventional Commits](../010-contribution-guidelines/conventional-commits) format.
3. Push changes to your fork:

    ```bash
    git push -u origin BRANCH-NAME
    ```
    
    For subsequent pushes, use the shorthand:
    
    ```bash
    git push
    ```

4. Create a pull request from your branch of the fork repository to the `master` branch of the `upstream` repository and await review.
