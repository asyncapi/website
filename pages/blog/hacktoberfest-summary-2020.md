---
title: "Is Hacktoberfest Good For Maintainers?"
date: 2020-11-05T06:00:00+01:00
type: Community
tags:
  - Hacktoberfest
cover: /img/posts/hacktoberfest-summary-2020/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## tl;dr

In October, we welcomed 26 new contributors with 70 pull requests (PRs) merged. It was an exhausting but also a fascinating experience.

## Hacktoberfest Is Ok

Don't be afraid of [Hacktoberfest](https://hacktoberfest.digitalocean.com/). It is an excellent event for both contributors and maintainers.

There are [haters](https://blog.domenic.me/hacktoberfest/) that will tell you something different. My advice, follow [truncated mean](https://en.wikipedia.org/wiki/Truncated_mean) measure and always discard extreme opinions, especially if they call for boycotting:

> Finally, and most importantly, we can remember that this is how DigitalOcean treats the open source maintainer community, and stay away from their products going forward

Cancel culture at its best. The fact that someone is good at programming or works at Google or Facebook doesn't make them experts in everything. Remember that celebrities are not good candidates for a role model.

There are no perfect events; there are no best solutions. There is always a place for improvement, but it should be followed by open, civilized discussion.

Let me conclude by saying that I hope the "harm to the open source made by DigitalOcean" is not as significant as the harm that such hate does to open source by discouraging new open-source contributors. However, this is just speculation. How can I consider any of these things harmful if I did not conduct scientific research? I can only confirm that Hacktoberfest did not harm [AsyncAPI Initiative](https://www.asyncapi.com/). On the contrary, it was pretty neat.

## Spam

During the entire event, we had only two spam PRs. I can imagine that a much more popular and known project might have had more. Nevertheless, adding the **invalid** label and closing a PR is a super simple operation, three clicks.

The definition of spam heavily depends on maintainers. For example, [this](https://github.com/facebook/react/pull/19953) is not invalid to me, because I don't think of grammar as "subjective nits".

## Why We Participated in Hacktoberfest

Our intentions were pretty clear from the very beginning. As I wrote in the [previous post](/blog/hacktoberfest-2020), we wanted to:
 - Promote [AsyncAPI Initiative](https://www.asyncapi.com/) as a place where we work not only on the AsyncAPI specification, but also lots of tools
 - Help members of the broader open-source community make their first contributions in a friendly environment

My impression is that sometimes the open-source is perceived as a kind of elite gathering. **This is quite often blocking people from joining because they feel they cannot help but rather waste others' time.** I was there in the past, I thought the same. It's just another variation of the damn [impostor syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome). You can always help, no matter what your experience is.

Start small. Don't start with tasks that can be overwhelming. Don't throw yourself into the deep end. 

We wanted to help others make first baby steps in a secure and inclusive environment, with lots of patience and support.

## What It Takes To Have 70 PRs Merged

It is not enough to label 70 issues with the **hacktoberfest** label, sorry :smiley:

First of all, you need to be passionate about open source and dedicated to what you do. It can't just be a task that somebody assigned to you. It would help if you were prepared to treat Hacktoberfest participants as a priority. I would compare it to the onboarding process of new hires. 

Of course, not all participants join to stay longer, usually they just follow the  "one pull request, and I'm out of here" approach.

It doesn't matter. 

Please don't make assumptions; assumptions are evil. Be opened, treat every contribution equally, and remember that the onboarding process is a crucial element. If you fail with the onboarding process, you fail big time at the very beginning.

### What We Prepared

We prepared the following materials for potential participants:
- [Blog post](https://www.asyncapi.com/blog/hacktoberfest-2020) about our participation
- [Onboarding videos](https://www.youtube.com/playlist?list=PLbi1gRlP7pigFSE_6G88x0t12HFLU4A4b) that explain how to start
- 78 issues from more than 30 repositories and put them all in one [list](https://docs.google.com/spreadsheets/d/1vX4J395apexutfQ0OSqPNltFKDacmemHZwCmOXwHNLo/) with additional information about the difficulty level or the technical area,

It took me around eight workdays to do it all. The most time-consuming part was to go through all the issues, pick candidates, create new ones, and group them all in a Google Sheet.

### What We Did During The Event

70 pull requests mean —at least— 70 reviews :sweat_smile:

If you know your project well, it is not very time-consuming, and anyway, it is the work you have to do as a maintainer. I do not count this time as an extra Hacktoberfest effort. Of course, it can be overwhelming if this is not a standard amount of PRs that you get every month.

We also hosted [office hours](https://www.youtube.com/playlist?list=PLbi1gRlP7pigZP2da6zbDT2YU7glQOTPH) for participants. This was fun, and we wanted to start doing live streams about AsyncAPI anyway.

Last but not least, once a week, I advertised our project on the official Hacktoberfest Discord server.

[![](/img/posts/hacktoberfest-summary-2020/feedback-sharkham.webp)](https://github.com/asyncapi/vscode-extension/pull/8#issuecomment-719759737)

It looks like we do not need to do more for the next year.

## Was It Worth It

Hell yeah, and I'm already looking forward to Hacktoberfest 2021.

It was great to see so many different people interacting with the project and seeing we reached our goal.

[![](/img/posts/hacktoberfest-summary-2020/feedback-juergenbr.webp)](https://github.com/asyncapi/html-template/pull/98#issuecomment-709014754)

We got some new features, CI/CD cleanup in all repositories, and solved many trivial SonarCloud-reported issues that we would never found time to solve.

## What Made It Such a Success

Our success was a typical return on investment.

[![](/img/posts/hacktoberfest-summary-2020/feedback-Orodan.webp)](https://github.com/asyncapi/playground/pull/38#issuecomment-710014222)

We asked all contributors to provide feedback on how they learned about us and what was the most helpful resource. 20 out of 26 responded to our request.

<Figure
  src="/img/posts/hacktoberfest-summary-2020/how-they-learned.webp"
  caption="Figure 1: Ways in which the contributors learned about AsyncAPI participating in Hacktoberfest"
/>

I think it is pretty clear that introducing the official Discord channel was a great idea. I personally do not like Discord because of the lack of support for threads, but better this than nothing.

<Figure
  src="/img/posts/hacktoberfest-summary-2020/what-they-used.webp"
  caption="Figure 2: Resources helpful for contributors"
/>

Such a simple thing as a Google Sheet with a list of issues grouped by different factors was, in the end, our best resource for contributors. I encourage you to create such a sheet for your contributors next year.

## Open Request to Hacktoberfest Organizers

There is one thing that calls for an improvement for next year. Just one? Yeah, opt-in solution for projects that want to participate in Hacktoberfest was addressed during this event, and I assume it stays on.

The number of projects that people can work on is overwhelming, and finding the right issue seems very difficult. Please have a look at the feedback we got from our contributors. It is enough to develop an official application where potential contributors can adequately filter out issues by technology and difficulty. In the end, it doesn't make sense for all maintainers to work on their own Google Sheets and post it on Discord. A better way would be to introduce an app for all.

## Hall Of Fame

Below you can find a list of all contributors that joined AsyncAPI during Hacktoberfest and contributed their time to the project. The list is sorted alphabetically, including the number of PRs created by this contributor.

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ab510">
        <img src="https://avatars3.githubusercontent.com/u/46869762?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            ab510 (2)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/anbreaker">
        <img src="https://avatars3.githubusercontent.com/u/6112820?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            anbreaker (3)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/beni0888">
        <img src="https://avatars3.githubusercontent.com/u/2619784?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Jesús Miguel Benito Calzada (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bszwarc">
        <img src="https://avatars3.githubusercontent.com/u/17266942?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
             Barbara Szwarc (8)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/bufutda">
        <img src="https://avatars3.githubusercontent.com/u/7246741?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Mitchell Sawatzky (2)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/C-Zekeri">
        <img src="https://avatars3.githubusercontent.com/u/55132738?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Chenemi Zekeri (2)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/charlietharas">
        <img src="https://avatars3.githubusercontent.com/u/55163594?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Charlie Tharas (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/christeen24">
        <img src="https://avatars3.githubusercontent.com/u/26082656?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Christeen Fernando (1)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/DanielChuDC">
        <img src="https://avatars3.githubusercontent.com/u/52316624?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            danielchu (4)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/depimomo">
        <img src="https://avatars3.githubusercontent.com/u/12368942?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            depimomo (4)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/falconmfm">
        <img src="https://avatars3.githubusercontent.com/u/2099350?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Miguel Angel Falcón Muñoz (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gabrielclaudino">
        <img src="https://avatars3.githubusercontent.com/u/26636890?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Gabriel Claudino (1)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/HashTalmiz">
        <img src="https://avatars3.githubusercontent.com/u/55018280?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Talmiz Ahmed (5)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/HUTCHHUTCHHUTCH">
        <img src="https://avatars3.githubusercontent.com/u/55915170?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            HUTCHHUTCHHUTCH (11)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JakubIwanowski">
        <img src="https://avatars3.githubusercontent.com/u/25127286?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Jakub Iwanowski (2)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jooaodanieel">
        <img src="https://avatars3.githubusercontent.com/u/12701604?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            João Francisco Lino Daniel (1)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/juergenbr">
        <img src="https://avatars3.githubusercontent.com/u/683438?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Jürgen B. (3)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mbeuil">
        <img src="https://avatars3.githubusercontent.com/u/33709157?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            mbeuil (2)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mowies">
        <img src="https://avatars3.githubusercontent.com/u/6901203?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Moritz Wiesinger (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nekosune">
        <img src="https://avatars3.githubusercontent.com/u/690546?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Katrina Knight (2)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Orodan">
        <img src="https://avatars3.githubusercontent.com/u/7422824?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Jimmy Kasprzak (3)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/philrussel21">
        <img src="https://avatars3.githubusercontent.com/u/44673258?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Phil Antiporda (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RageZBla">
        <img src="https://avatars3.githubusercontent.com/u/1196871?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Olivier Lechevalier (6)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sanskar-p">
        <img src="https://avatars3.githubusercontent.com/u/54014518?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
             Sanskar Patro (1)
          </b>
        </sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/sharkham">
        <img src="https://avatars3.githubusercontent.com/u/49769979?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
            Sam (1)
          </b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/slavakr">
        <img src="https://avatars3.githubusercontent.com/u/1413160?v=4" width="100px;" alt=""/>
        <br />
        <sub>
          <b>
             GrimPix (1)
          </b>
        </sub>
      </a>
    </td>
  </tr>
</table>

> Cover photo by <a href="https://unsplash.com/@goian?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ian Schneider</a> on <a href="https://unsplash.com/s/photos/success-event?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
