(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"0GtR":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/automated-releases",function(){return n("iYbv")}])},"7ljp":function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var a=n("q1tI"),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"===typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return(o.a.createElement(l.Provider,{value:t},e.children))},b="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return(o.a.createElement(o.a.Fragment,{},t))}},h=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),b=a,h=u["".concat(s,".").concat(b)]||u[b]||m[b]||r;return n?o.a.createElement(h,i(i({ref:t},l),{},{components:n})):o.a.createElement(h,i({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"===typeof e||a){var r=n.length,s=new Array(r);s[0]=h;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[b]="string"===typeof e?e:a,s[1]=i;for(var l=2;l<r;l++)s[l]=n[l];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},Ff2n:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",(function(){return a}))},Qetd:function(e,t,n){"use strict";var a=Object.assign.bind(Object);e.exports=a,e.exports.default=e.exports},iYbv:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n("wx14"),o=n("Ff2n"),r=n("q1tI"),s=n.n(r),i=n("7ljp"),c=(s.a.createElement,{}),l="wrapper";function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)(l,Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"tl;dr\nfrom now on, we release ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/asyncapi/generator/"}),"generator")," in an automated way. We roll-out this setup to the rest when we see it is needed.")),Object(i.b)("p",null,"Repetitive tasks are tedious. If what you do manually can be automated, then what are you waiting for! "),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("em",{parentName:"p"},"But these tasks take only a couple of minutes from time to time, gimme a break"))),Object(i.b)("p",null,"A couple of minutes here, a couple of minutes there and all of a sudden you do not have time on more important things, on innovation. Automation makes it easier to scale and eliminates errors. Distractions consume time and make you less productive."),Object(i.b)("p",null,"We kick ass at ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.asyncapi.com/"}),"AsyncAPI Initiative")," at the moment. We started to improve our tooling regularly. We are now periodically sharing project status in our ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.asyncapi.com/subscribe"}),"newsletter"),", and host ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/asyncapi/asyncapi/issues/115"}),"bi-weekly open meetings"),", but most important is that we just recently updated our roadmap."),Object(i.b)("p",null,"Am I just showing off? It sounds like, but that is not my intention. I wish to point out we are productive, and we want to continue this trend and automation helps here a lot. If you have libraries that you want to release regularly and you plan additional ones to come, you need to focus on release automation."),Object(i.b)("h2",{id:"what-full-automation-means"},"What full automation means"),Object(i.b)("p",null,"Full automation means that the release process if fully automated with no manual steps. What else did you think?"),Object(i.b)("iframe",{src:"https://giphy.com/embed/6uGhT1O4sxpi8",width:"480",height:"240",frameBorder:"0",className:"giphy-embed",allowFullScreen:!0}),Object(i.b)("p",null,"Your responsibility is just to merge a pull request. The automation handles the rest. "),Object(i.b)("p",null,"You might say: ",Object(i.b)("em",{parentName:"p"},"but I do not want to release on every merge, sometimes I merge changes that are not related to the functionality of the library"),"."),Object(i.b)("p",null,"This is a valid point. You need a way to recognize if the given commit should trigger the release and what kind of version, PATCH, or MINOR. The way to do it is to introduce in your project ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.conventionalcommits.org/en/v1.0.0/"}),"Conventional Commits")," specification."),Object(i.b)("h2",{id:"conventional-commits"},"Conventional Commits"),Object(i.b)("p",null,"At ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.asyncapi.com/"}),"AsyncAPI Initiative")," we use ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://semver.org/"}),"Semantic Versioning"),". This is why choosing ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.conventionalcommits.org/en/v1.0.0/"}),"Conventional Commits")," specification was a natural decision."),Object(i.b)("p",null,"Purpose of Conventional Commits is to make commits not only human-readable but also machine-readable. It defines a set of commit prefixes that can be easily parsed and analyzed by tooling."),Object(i.b)("p",null,"This is how the version of the library looks like when it follows semantic versioning: ",Object(i.b)("inlineCode",{parentName:"p"},"MAJOR.MINOR.PATCH"),". How does the machine know what release you want to bump because of a given commit? Simplest mapping looks like in the following list:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Commit message prefix ",Object(i.b)("inlineCode",{parentName:"li"},"fix: ")," indicates ",Object(i.b)("inlineCode",{parentName:"li"},"PATCH")," release,"),Object(i.b)("li",{parentName:"ul"},"Commit message prefix ",Object(i.b)("inlineCode",{parentName:"li"},"feat: ")," indicates ",Object(i.b)("inlineCode",{parentName:"li"},"MINOR")," release,"),Object(i.b)("li",{parentName:"ul"},"Commit message prefix ",Object(i.b)("inlineCode",{parentName:"li"},"{ANY_PREFIX}!: ")," so for example ",Object(i.b)("inlineCode",{parentName:"li"},"feat!:")," or even ",Object(i.b)("inlineCode",{parentName:"li"},"refactor!: ")," indicate ",Object(i.b)("inlineCode",{parentName:"li"},"MAJOR")," release.")),Object(i.b)("p",null,"It other words, assume your version was 1.0.0, and you made a commit like ",Object(i.b)("inlineCode",{parentName:"p"},"feat: add a new parameter to test endpoint"),". You can have a script that picks up ",Object(i.b)("inlineCode",{parentName:"p"},"feat: ")," and triggers release that eventually bumps to version 1.1.0."),Object(i.b)("h2",{id:"workflow-design"},"Workflow design"),Object(i.b)("p",null,"At ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.asyncapi.com/"}),"AsyncAPI Initiative")," where we introduced the release pipeline for the very first time, we had to do the following automatically:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Tag Git repository with a new version"),Object(i.b)("li",{parentName:"ul"},"Create GitHub Release"),Object(i.b)("li",{parentName:"ul"},"Push new version of the package to ",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://www.npmjs.com/"}),"NPM")),Object(i.b)("li",{parentName:"ul"},"Push new version of Docker image to ",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://hub.docker.com/"}),"Docker Hub")),Object(i.b)("li",{parentName:"ul"},"Bump the version of the package in ",Object(i.b)("inlineCode",{parentName:"li"},"package.json")," file and commit the change to the repository")),Object(i.b)("p",null,"This is how the design looks like:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/release-workflow.webp",alt:"npm docker release workflow"}))),Object(i.b)("p",null,"There are two workflows designed here. "),Object(i.b)("p",null,"The first workflow reacts to changes in the release branch (",Object(i.b)("inlineCode",{parentName:"p"},"master")," in this case), decides if release should be triggered, and triggers it. The last step of the workflow is a pull request creation with changes in ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," and ",Object(i.b)("inlineCode",{parentName:"p"},"package-lock.json"),". Why are changes not committed directly to the release branch? Because we use branch protection rules and do not allow direct commits to release branches."),Object(i.b)("p",null,"You can extend this workflow with additional steps, like:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Integration testing"),Object(i.b)("li",{parentName:"ul"},"Deployment"),Object(i.b)("li",{parentName:"ul"},"Notifications")),Object(i.b)("p",null,"The second workflow is just for handling changes in ",Object(i.b)("inlineCode",{parentName:"p"},"package.json"),". To fulfill branch protection settings, we had to auto-approve the pull request so we can automatically merge it."),Object(i.b)("h2",{id:"github-actions"},"GitHub Actions"),Object(i.b)("p",null,"Even though I have ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://dev.to/derberg/github-actions-when-fascination-turns-into-disappointment-4d75"}),"my opinion about GitHub Actions"),", I still think it is worth investing in it, especially for the release workflows."),Object(i.b)("p",null,"We used the GitHub-provided actions and the following awesome actions built by the community:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"ttps://github.com/marketplace/actions/create-pull-request"}),"Create Pull Request")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/marketplace/actions/auto-approve"}),"Auto Approve")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/marketplace/actions/merge-pull-requests"}),"Merge Pull Request"))),Object(i.b)("h3",{id:"release-workflow"},"Release workflow"),Object(i.b)("p",null,"Release workflow triggers every time there is something new happening in the release branch. In our case, it is the ",Object(i.b)("inlineCode",{parentName:"p"},"master")," branch:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"on:\n  push:\n    branches:\n      - master\n")),Object(i.b)("h4",{id:"github-and-npm"},"GitHub and NPM"),Object(i.b)("p",null,"For releases to GitHub and NPM, the most convenient solution is to integrate ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/semantic-release/semantic-release"}),"semantic release")," package and related plugins that support Conventional Commits. You can configure plugins in your ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," in the order they should be invoked:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'"plugins": [\n  [\n    "@semantic-release/commit-analyzer",\n    {\n      "preset": "conventionalcommits"\n    }\n  ],\n  [\n    "@semantic-release/release-notes-generator",\n    {\n      "preset": "conventionalcommits"\n    }\n  ],\n  "@semantic-release/npm",\n  "@semantic-release/github"\n]\n')),Object(i.b)("p",null,"Conveniently, functional automation uses a ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.thinkautomation.com/bots-and-ai/what-are-software-bots/"}),"technical bot rather than a real user"),". GitHub actions allow you to encrypt the credentials of different systems at the repository level. Referring to them in actions looks as follows: "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"- name: Release to NPM and GitHub\n  id: release\n  env:\n    GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}\n    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}\n    GIT_AUTHOR_NAME: asyncapi-bot\n    GIT_AUTHOR_EMAIL: info@asyncapi.io\n    GIT_COMMITTER_NAME: asyncapi-bot\n    GIT_COMMITTER_EMAIL: info@asyncapi.io\n  run: npm run release\n")),Object(i.b)("p",null,"Aside from automation, the bot also comments on every pull request and issue included in the release notifying subscribed participants that the given topic is part of the release. Isn't it awesome?"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/pr-indicator.webp",alt:"pr info about release"}))),Object(i.b)("h4",{id:"docker"},"Docker"),Object(i.b)("p",null,"For handling Docker, you can use some community-provided GitHub action that abstracts Docker CLI. I don't think it is needed if you know Docker. You might also want to reuse some commands during local development, like image building, and have them behind an npm script like ",Object(i.b)("inlineCode",{parentName:"p"},"npm run docker-build"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"- name: Release to Docker\n  if: steps.initversion.outputs.version != steps.extractver.outputs.version\n  run: | \n    echo ${{secrets.DOCKER_PASSWORD}} | docker login -u ${{secrets.DOCKER_USERNAME}} --password-stdin\n    npm run docker-build\n    docker tag asyncapi/generator:latest asyncapi/generator:${{ steps.extractver.outputs.version }}\n    docker push asyncapi/generator:${{ steps.extractver.outputs.version }}\n    docker push asyncapi/generator:latest\n")),Object(i.b)("h4",{id:"bump-version-in-packagejson"},"Bump version in package.json"),Object(i.b)("p",null,"A common practice is to bump the package version in ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," on every release. You should also push the modified file to the release branch. Be aware though that good practices in the project are:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Do not commit directly to the release branch. All changes should go through pull requests with proper peer review."),Object(i.b)("li",{parentName:"ul"},"Branches should have basic protection enabled. There should be simple rules that block pull requests before the merge.")),Object(i.b)("p",null,"Release workflow, instead of pushing directly to the release branch, should commit to a new branch and create a pull request. Seems like an overhead? No, you can also automate it. Just keep on reading."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"- name: Create Pull Request with updated package files\n  if: steps.initversion.outputs.version != steps.extractver.outputs.version\n  uses: peter-evans/create-pull-request@v2.4.4\n  with:\n    token: ${{ secrets.GH_TOKEN }}\n    commit-message: 'chore(release): ${{ steps.extractver.outputs.version }}'\n    committer: asyncapi-bot <info@asyncapi.io>\n    author: asyncapi-bot <info@asyncapi.io>\n    title: 'chore(release): ${{ steps.extractver.outputs.version }}'\n    body: 'Version bump in package.json and package-lock.json for release [${{ steps.extractver.outputs.version }}](https://github.com/${{github.repository}}/releases/tag/v${{ steps.extractver.outputs.version }})'\n    branch: version-bump/${{ steps.extractver.outputs.version }}\n")),Object(i.b)("h4",{id:"conditions-and-sharing-outputs"},"Conditions and sharing outputs"),Object(i.b)("p",null,"GitHub Actions has two excellent features:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"You can set conditions for specific steps"),Object(i.b)("li",{parentName:"ul"},"You can share the output of one step with another")),Object(i.b)("p",null,"These features are used in the release workflow to check the version of the package, before and after the GitHub/NPM release step. "),Object(i.b)("p",null,"To share the output, you must assign an ",Object(i.b)("inlineCode",{parentName:"p"},"id")," to the step and declare a variable and assign any value to it."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),'- name: Get version from package.json after release step\n  id: extractver\n  run: echo "::set-output name=version::$(npm run get-version --silent)"\n')),Object(i.b)("p",null,"You can access the shared value by the ",Object(i.b)("inlineCode",{parentName:"p"},"id")," and a variable name like ",Object(i.b)("inlineCode",{parentName:"p"},"steps.extractver.outputs.version"),". We use it, for example, in the condition that specifies if further steps of the workflow should be triggered or not. If the version in ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," changed after GitHub and NPM step, this means we should proceed with Docker publishing and pull request creation:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"if: steps.initversion.outputs.version != steps.extractver.outputs.version\n")),Object(i.b)("h4",{id:"full-workflow"},"Full workflow"),Object(i.b)("p",null,"Below you can find the entire workflow file:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"name: Release\n\non:\n  push:\n    branches:\n      - master\n\njobs:\n  release:\n    name: 'Release NPM, GitHub, Docker'\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout repo\n        uses: actions/checkout@v2\n      - name: Setup Node.js\n        uses: actions/setup-node@v1\n        with:\n          node-version: 13\n      - name: Install dependencies\n        run: npm ci\n      - name: Get version from package.json before release step\n        id: initversion\n        run: echo \"::set-output name=version::$(npm run get-version --silent)\"\n      - name: Release to NPM and GitHub\n        id: release\n        env:\n          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}\n          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}\n          GIT_AUTHOR_NAME: asyncapi-bot\n          GIT_AUTHOR_EMAIL: info@asyncapi.io\n          GIT_COMMITTER_NAME: asyncapi-bot\n          GIT_COMMITTER_EMAIL: info@asyncapi.io\n        run: npm run release\n      - name: Get version from package.json after release step\n        id: extractver\n        run: echo \"::set-output name=version::$(npm run get-version --silent)\"\n      - name: Release to Docker\n        if: steps.initversion.outputs.version != steps.extractver.outputs.version\n        run: | \n          echo ${{secrets.DOCKER_PASSWORD}} | docker login -u ${{secrets.DOCKER_USERNAME}} --password-stdin\n          npm run docker-build\n          docker tag asyncapi/generator:latest asyncapi/generator:${{ steps.extractver.outputs.version }}\n          docker push asyncapi/generator:${{ steps.extractver.outputs.version }}\n          docker push asyncapi/generator:latest\n      - name: Create Pull Request with updated package files\n        if: steps.initversion.outputs.version != steps.extractver.outputs.version\n        uses: peter-evans/create-pull-request@v2.4.4\n        with:\n          token: ${{ secrets.GH_TOKEN }}\n          commit-message: 'chore(release): ${{ steps.extractver.outputs.version }}'\n          committer: asyncapi-bot <info@asyncapi.io>\n          author: asyncapi-bot <info@asyncapi.io>\n          title: 'chore(release): ${{ steps.extractver.outputs.version }}'\n          body: 'Version bump in package.json and package-lock.json for release [${{ steps.extractver.outputs.version }}](https://github.com/${{github.repository}}/releases/tag/v${{ steps.extractver.outputs.version }})'\n          branch: version-bump/${{ steps.extractver.outputs.version }}\n")),Object(i.b)("h2",{id:"automated-merging-workflow"},"Automated merging workflow"),Object(i.b)("p",null,"You may be asking yourself:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("em",{parentName:"p"},"Why automated approving and merging is handled in a separate workflow and not as part of release workflow"))),Object(i.b)("p",null,"One reason is that the time between pull request creation and its readiness to be merged is hard to define. Pull requests always include some automated checks, like testing, linting, and others. These are long-running checks. You should not make such an asynchronous step a part of your synchronous release workflow. "),Object(i.b)("p",null,"Another reason is that you can also extend such an automated merging flow to handle not only pull requests coming from the release-handling bot but also other bots, that, for example, update your dependencies for security reasons. "),Object(i.b)("p",null,"You should divide automation into separate jobs that enable you to define their dependencies. There is no point to run the ",Object(i.b)("strong",{parentName:"p"},"automerge")," job until the ",Object(i.b)("strong",{parentName:"p"},"autoapprove")," one ends. GitHub Actions allows you to express this with ",Object(i.b)("inlineCode",{parentName:"p"},"needs: [autoapprove]")),Object(i.b)("p",null,"Below you can find the entire workflow file:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),'name: Automerge release bump PR\n\non:\n  pull_request:\n    types:\n      - labeled\n      - unlabeled\n      - synchronize\n      - opened\n      - edited\n      - ready_for_review\n      - reopened\n      - unlocked\n  pull_request_review:\n    types:\n      - submitted\n  check_suite: \n    types:\n      - completed\n  status: {}\n  \njobs:\n\n  autoapprove:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Autoapproving\n        uses: hmarr/auto-approve-action@v2.0.0\n        if: github.actor == \'asyncapi-bot\'\n        with:\n          github-token: "${{ secrets.GITHUB_TOKEN }}"\n\n  automerge:\n    needs: [autoapprove]\n    runs-on: ubuntu-latest\n    steps:\n      - name: Automerging\n        uses: pascalgn/automerge-action@v0.7.5\n        if: github.actor == \'asyncapi-bot\'\n        env:\n          GITHUB_TOKEN: "${{ secrets.GH_TOKEN }}"\n          GITHUB_LOGIN: asyncapi-bot\n          MERGE_LABELS: ""\n          MERGE_METHOD: "squash"\n          MERGE_COMMIT_MESSAGE: "pull-request-title"\n          MERGE_RETRIES: "10"\n          MERGE_RETRY_SLEEP: "10000"\n')),Object(i.b)("p",null,"For a detailed reference, you can look into ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/asyncapi/generator/pull/242"}),"this pull request")," that introduces the above-described workflow in the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/asyncapi/generator/"}),"generator"),"."),Object(i.b)("h2",{id:"conclusions"},"Conclusions"),Object(i.b)("p",null,"Automate all the things, don't waste time. Automate releases, even if you are a purist that for years followed a rule of using ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://chris.beams.io/posts/git-commit/#imperative"}),"imperative mood")," in commit subject and now, after looking on prefixes from Conventional Commits you feel pure disgust."),Object(i.b)("iframe",{src:"https://giphy.com/embed/8PmTor9XVnD3sxXHRe",width:"480",height:"435",frameBorder:"0",className:"giphy-embed",allowFullScreen:!0}),Object(i.b)("p",null,"In the end, you can always use something different, custom approach, like reacting to merges from pull requests with the specific label only. If you have time to reinvent the wheel, go for it."),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Cover photo by ",Object(i.b)("a",Object(a.a)({parentName:"em"},{href:"https://unsplash.com/@franckinjapan"}),"Franck V.")," taken from Unsplash.")))}p.isMDXComponent=!0},wx14:function(e,t,n){"use strict";function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}n.d(t,"a",(function(){return a}))}},[["0GtR",0,1]]]);