---
title: Voting
weight: 50
---

## Voting Overview

In the [search for the right governance model](https://www.asyncapi.com/blog/governance-motivation), we ended up defining a Technical Steering Committee (TSC) that can help make decisions related to the entire AsyncAPI Initiative and not only a specific repository. TSC voting is described in the official [Charter](CHARTER#5-tsc-voting). 

The Governance Board (GB) manages the voting process.

To make the voting process easier with proper automation, we use [**Git Vote**](https://github.com/cncf/gitvote) bot.

### Voting Location

- Voting must only take place in the [community](https://github.com/asyncapi/community) repository.
- Voting automation works only with GitHub Issues and Pull Requests.

The Discussions should only be used for initial discussion, brainstorming ideas, or seeking initial support.

In the majority of cases, the topics we vote on introduce new rules or ways of doing things. This implies that proper community documentation is needed for these topics. We recommend using Pull Requests instead of Issues to conduct voting on a topic, as it allows you to provide context and finalize documentation.

### Voting Rules

- Only votes from [TSC members](https://www.asyncapi.com/community/tsc) are counted. You are still encouraged to participate in voting, even if your vote is not binding.
- TSC members have at least 7 calendar days to vote. We have 4 weeks to reach quorum, otherwise the voting topic needs reassessment by the Governance Board.
- TSC members can skip some votes, although if you do not have an opinion, please participate with 👀 to indicate that you saw a vote but you have no opinion, or cannot make a public statement about it, and abstain. There is one strict rule, though: if you do not participate in voting within three months, you will stop being a TSC member. It has nothing to do, though, with your maintainer responsibilities.
- The vote is completed when more than 50% of the votes are in favor.
- Only Governance Board members can start the vote and close the vote.
- Quorum is required. The number depends on the current number of TSC members. We require a majority to pass the vote. If TSC has 40 members, then we calculate quorum like: 51% multiplied by 40. Assuming all votes are positive, we must have at least 21 people taking the vote.

### Voting Process

#### Propose a Vote

1. Create an issue in the [community](https://github.com/asyncapi/community) repository.
2. Describe the topic of the vote and provide as much context as possible.
3. Tag GB members by mentioning `@asyncapi/gb` team, asking to run a vote.
4. GB members will review the request:
 - Check if the vote is needed,
 - What context is missing,
 - Is larger debate with TSC is needed first.

#### Start Voting

1. The GB member adds a `/vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with instructions on how the voting should be done. It is based on 👍🏼 , 👎🏼, and 👀 emojis. You can still put comments or suggestions.
3. The AsyncAPI bot adds a `vote` label, making it easier to extract information about voted topics and participation.

#### Check Status

1. Anyone can add a `/check-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with an update on how many binding votes were provided. And how much the percentage is required to finish the voting process.

### Cancel Voting

1. The GB member adds `/cancel-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment.
3. The AsyncAPI bot removes the `vote` label.

### Finish Voting

Voting cannot be concluded with a comment; it ends when more than half of the users with binding votes say yes or when the deadline passes.

The Git Vote bot adds a comment that voting is completed.

### Tracking Voting

We store [the voting history of the entire TSC](TSC_VOTING_OVERVIEW) since voting automation was introduced.

- 🔕 indicates that the member did not vote.
- 👍 indicates that the member was in favor.
- 👎 indicates that the member was against.
- 👀 indicates that the member abstained from voting.

The tracking file is automatically updated by a bot after each vote is completed. It also records whether the member has voted in the last 3 months, helping to identify inactive TSC Members.

### Note

- The abstain votes are included in the total number of votes; they are not removed.
- At present, Git Vote is enabled in the community repo only, and the Git Vote bot handles all voting processes.
