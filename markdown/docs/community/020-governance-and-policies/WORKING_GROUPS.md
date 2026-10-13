---
title: Working Groups
weight: 60
---

### Definition of a Working Group

A Working Group is a group of people in our community who share a common interest beyond GitHub repositories. These groups address cross-cutting concerns, ecosystem initiatives, and community goals that require ongoing and coordinated effort.


### Formation Requirements
To form a Working Group, all of the following prerequisites must be met:

- At least 3 founding members who are active contributors to the AsyncAPI community, and approval from the TSC (Technical Steering Committee).
- Evidence of existing informal collaboration. The group must already be working together on something before seeking official recognition.
- There must be at least one to two of its members appointed as its **chairperson** (though we recommend having two chairs).
- Have clearly defined goals that are easily accessible to everyone on the internet, as this helps maintain alignment within the group.

The Technical Steering Committee (TSC) will need to vote and approve the creation of any Working Group.

### The Chairperson Role

We recommend that a Working Group have at least two chairs, as this dual-chair structure ensures the group stays active if one chair is unavailable to lead on the responsibilities. The chairperson is selected by the group's members. Volunteers can serve as chairpersons, or the group can elect one. The chairperson can also resign if they feel they can't fulfil their duties anymore. In this case, the group must elect a new chairperson if there is no other chairperson.

The role of the chairperson is to:
 - Facilitate the group's progress by aligning on goals, removing blockers, ensuring the group works efficiently and is aligned with the AsyncAPI Community Goals. 
 - Lead and organise meetings by setting agendas, fostering inclusive participation, encouraging feedback, ensuring all members are heard, and maintaining clear documentation of outcomes.
 - Work closely with the co-chair to monitor ongoing activities, proactively share updates, and coordinate responsibilities so there is always available leadership and seamless continuity.
 - Communicate all discussions, key updates, and group decisions through official AsyncAPI channels, ensuring the broader community remains informed and engaged.

Lastly, it is mandatory for all chairpersons to take the [Leading High-Performance Working Group Meetings](https://training.linuxfoundation.org/training/leading-high-performance-working-group-meetings-lfc120) course as this will help in leading effectively.


### Project Planning and Tracking

It is recommended that the Working Group use an associated project management tool, such as [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project) or another tool, to outline their roadmap. It's up to the Working Group to decide the project's structure. E.g., Kanban, Shape Up, TO-DO list, etc.

The group's name, members, goals, and other relevant information must be added to the `WORKING_GROUPS.yaml` file in the `community` repository.

### Decision Making

A Working Group does not have authority over the roadmap of the projects they may impact. It's up to the repositories' maintainers (code owners) to approve or reject pull requests proposed by the Working Group.  To ensure alignment, it is recommended to include maintainers of the affected projects in the Working Group or to establish consensus on the roadmaps for the relevant repositories and projects.

A Working Group must discuss ideas and solutions in public and communicate, through official channels, all relevant discussions and implementations it wishes to suggest to others.

### Meetings

It is recommended that the Working Group schedule meetings using the methods described at [MEETINGS_ORGANIZATION.md](https://www.asyncapi.com/docs/community/060-meetings-and-communication).

Working Groups should be listed on the [AsyncAPI website](https://www.asyncapi.com), along with their description, goals, members, and anything the Working Group wants to include.

### How to reach out to a Working Group

There are several ways to reach out to a Working Group:

- Join the [AsyncAPI Slack](https://www.asyncapi.com/slack-invite) and ping the working group's handle to ask questions or share your thoughts. The handle can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in the `slack.group.handle` field. Example: `@dx_wg`.
- Do a GitHub team mention in any issue, discussion, or pull request. The team handle can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in `github_team` field. Example: `developer_experience_wg`.
- Join the working group's channel on Slack. The channel name can be found in the [WORKING_GROUPS.yaml][working-groups-yaml] file in the `slack.channel.handle` field. Example: `#wg-developer-experience`.

> [!IMPORTANT]
> Please note that the Working Group members are volunteers and may not be able to respond immediately. Please be patient and respectful. Also, it will be helpful if there is as little spam as possible. For more information, please refer to the [Slack Etiquette](https://www.asyncapi.com/docs/community/060-meetings-and-communication/slack-etiquette) document.

[working-groups-yaml]: https://github.com/asyncapi/community/blob/master/WORKING_GROUPS.yaml