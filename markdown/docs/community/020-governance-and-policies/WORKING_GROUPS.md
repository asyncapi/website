---
title: Working Groups
weight: 60
---

### Definition of a Working Group

A Working Group is a group of people in our community who share a common interest beyond GitHub repositories.

A Working Group must have at least one of its members appointed as its **chairperson**.
The selection of the chairperson is done by the members of the group. Volunteers can be chairpersons, or the group can decide to elect one. The chairperson can also resign if they feel they can't fulfill their duties anymore. In this case, the group must elect a new chairperson if there is no other chairperson in the group.
The role of the chairperson is to facilitate the group meets its goals by removing blockers, ensuring the group works efficiently and is aligned with the AsyncAPI Roadmap. The chairperson is also responsible for running meetings effectively, ensuring that all members have a voice and that the group works in a transparent manner.
Multiple chairpersons can be elected if the working group members decide it's necessary. The way they share responsibilities is decided by the group.

Anyone can create a Working Group. The only prerequisites are to have at least 3 founding members and the approval of the TSC (Technical Steering Committee).

A Working Group should have clearly defined goals that are easily accessible to everyone on the internet, as this helps maintain alignment within the group.

It is recommended that the Working Group has an associated project management tool like [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project) (or any other project management tool) to outline their roadmap. It's up to the Working Group to decide the structure of the project. E.g., Kanban, Shape Up, TO-DO list, etc.

The group's name, members, goals, and other relevant information must be added to the `WORKING_GROUPS.yaml` file in the `community` repository.

A Working Group has no authority or power over the roadmap of the projects they may impact. It's up to the repositories' maintainers (code owners) to approve or reject the pull requests. Therefore, it's advisable to either have maintainers of the impacted projects in the Working Group or ensure everyone agrees on the roadmap of the different repositories/projects.

A Working Group must discuss ideas and solutions in public, and communicate through official channels all relevant discussions and implementations that want to suggest to others.

It is recommended that the Working Group schedules meetings using the methods described at [MEETINGS_ORGANIZATION.md](../060-meetings-and-communication/MEETINGS_ORGANIZATION).

Working Groups should be listed on the [AsyncAPI website](https://www.asyncapi.com), along with their description, goals, members, and anything the Working Group wants to include.

### How to reach out to a Working Group

There are several ways to reach out to a Working Group:

- Join the [AsyncAPI Slack](https://www.asyncapi.com/slack-invite) and ping the working group's handle to ask questions or share your thoughts. The handle can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in the `slack.group.handle` field. Example: `@dx_wg`.
- Do a GitHub team mention in any issue, discussion, or pull request. The team handle can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in `github_team` field. Example: `developer_experience_wg`.
- Join the working group's channel on Slack. The channel name can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in the `slack.channel.handle` field. Example: `#wg-developer-experience`.

> [!IMPORTANT]
> Please note that the Working Group members are volunteers and may not be able to respond immediately. Please be patient and respectful. Also, it will be helpful if there is as little spam as possible. For more information, please refer to the [Slack Etiquette](../060-meetings-and-communication/slack-etiquette) document.

[working-groups-yaml]: https://github.com/asyncapi/community/blob/master/WORKING_GROUPS.yaml