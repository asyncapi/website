# How to create new repository

This document is not about creating a repository on GitHub. If this is what you were looking for, then [read GitHub guides on repository creation](https://docs.github.com/en/get-started/quickstart/create-a-repo).

This document is about creating a new repository at [AsyncAPI Initiative GitHub organization](https://github.com/asyncapi). This guide explains what is the approval process and default repository configuration options.

This document is also helpful if you are donating a project to AsyncAPI Initiative, which involves transferring repository ownership, and still becomes its maintainer.

## Creating a repo for a new project

1. Visit [AsyncAPI Initiative Discussions](https://github.com/orgs/asyncapi/discussions)


2. Start a new discussion by clicking on `New discussion` and selecting the `Idea` category.
Specify in the title that you want to create a new repository. In the description specify what is the purpose of the new repository, and why it should be created under the AsyncAPI organization. See also [example discussion from the past](https://github.com/orgs/asyncapi/discussions/300).


3. After starting a discussion about your new project for asyncapi, and successfully convienced other members of the community why your project ideas is necessary and you want to maintain the codebase.


4. Additionally, when creating proposal specify the initial maintainers of the project and specify if you want to use asyncapi CI/CD workflows or not, so we don't get to ask you. At least 2 code maintainers are needed to start

5. Your proposal for a new repository must be approved by Technical Steering Committee (TSC). So make sure that at the end of proposal description you mention `@asyncapi/tsc_members` GitHub team to get TSC members notified.

6. After getting approval from the TSC, Repo is created by Lukasz or Fran, and the `CI/CD workflow` will be push to the Repo. Next, we invite new maintainers as admins of the repo. 
 To know more about asyncapi `CI/CD` watch this [video](https://www.youtube.com/watch?v=DsQfmlc3Ubo)

## Github Actions CI/CD in new Repo
Using asyncapi `CI/CD` workflow saves you from a lot of work load, after including it in your Github discussion/proposal specifing that you want to use our `CI/CD` workflow, the following activities will be carried out by Lukasz or Fran.

1. Go to asyncapi `/.github` repo
2. Click on `Action` to view all workflows
3. Select `Global workflow to rule then all`
4. Click on `run workflow` and paste the name of the new repo.
5. `Run workflow`.

We have one `worklfow` that basically takes all the workflows from `.github` and we can selectively push to a specific repo. One of the owners which at this time is Lukasz or Fran becuase they have not transfer ownership to the new maintainers executes this actions.

A set of `pull request` is created by the asyncapi bot for a given repo, you need to `merge` them in as a maintainer of the repo.

If you don't want to use asyncapi global workflow, then you will have to automate all the necessary `pull request` that would have been made by bot.

We open a `pull request` in `.github` repo, select `global_replicator.yml` and add the newly created repo to every single `Job` from the `global_replicator.yml` file. Add as **list of repo to be ignore** in `repos_to_ignore: name-of-repo`

This tells the asyncapi bot not to constantly push `pull request` to the repo.

## Configuring the repo


## Donating a project to asyncapi