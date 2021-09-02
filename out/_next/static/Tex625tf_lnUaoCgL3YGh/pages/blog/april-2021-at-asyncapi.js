(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"/gMh":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/april-2021-at-asyncapi",function(){return a("0N+H")}])},"0N+H":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var n,o=a("wx14"),r=a("Ff2n"),i=a("q1tI"),c=a.n(i),s=a("7ljp"),b=(c.a.createElement,n="YouTube",function(e){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),Object(s.b)("div",e)}),l={},p="wrapper";function u(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(s.b)(p,Object(o.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"Read ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"/blog/march-2021-at-asyncapi"}),"March 2021 at AsyncAPI")," for the update from March.")),Object(s.b)("center",null,Object(s.b)("iframe",{src:"https://anchor.fm/asyncapi/embed/episodes/April-2021-at-AsyncAPI-Initiative-e111lo9",height:"102px",width:"400px",frameborder:"0",scrolling:"no"})),Object(s.b)("h2",{id:"asyncapi-specification-release-cadence"},"AsyncAPI specification release cadence"),Object(s.b)("p",null,"I'm super happy to share that we removed the last roadblock for the next AsyncAPI release. Basing on some discussions during our public meetings and on ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/asyncapi/spec/issues/513"}),"this")," issue, the release schedule for the spec looks like this:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"June 2021"),Object(s.b)("li",{parentName:"ul"},"September 2021"),Object(s.b)("li",{parentName:"ul"},"January 2022"),Object(s.b)("li",{parentName:"ul"},"April 2022"),Object(s.b)("li",{parentName:"ul"},"June 2022"),Object(s.b)("li",{parentName:"ul"},"September 2022"),Object(s.b)("li",{parentName:"ul"},"January 2023"),Object(s.b)("li",{parentName:"ul"},"April 2023"),Object(s.b)("li",{parentName:"ul"},"June 2023")),Object(s.b)("p",null,Object(s.b)("undefined",{parentName:"p"},"I hope you noticed a pattern. We do not want to do releases during the summer holidays and stay away from December ",Object(s.b)("span",{role:"img","aria-label":"smiling face with open mouth"},"\ud83d\ude03"),".")),Object(s.b)("p",null,"In June 2021, we will release 2.1.0 version of the specification. It is going to be the first release under ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/asyncapi/.github/blob/master/CHARTER.md"}),"open governance model"),", under Linux Foundation and new ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md"}),"contribution guide"),". So many new things, a lot to organize around. It means we probably won't accept too many changes as logistics will consume a lot of time. We welcome any help. Join our ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.asyncapi.com/slack-invite/"}),"Slack")," for more details. "),Object(s.b)("h2",{id:"asyncapi-use-case-at-ebay"},"AsyncAPI use case at eBay"),Object(s.b)("p",null,"If you were looking for an AsyncAPI use case that shows some big tech using AsyncAPI in production, it is here. I highly recommend you read the article ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://thenewstack.io/asyncapi-2-0-enabling-the-event-driven-world/"}),"AsyncAPI 2.0: Enabling the Event-Driven World")," from ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.linkedin.com/in/someshekhar-banerjee-66004617/"}),"Shekhar Banerjee")," from eBay."),Object(s.b)("h2",{id:"react-component-and-html-template-merge"},"React component and HTML template merge"),Object(s.b)("p",null,"AsyncAPI document can be rendered into documentation using two different tools maintained by the AsyncAPI Initiative:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"You can use ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://github.com/asyncapi/asyncapi-react"}),"React component"),", also bundled as Web Component, to render the AsyncAPI document on the client-side."),Object(s.b)("li",{parentName:"ul"},"You can use ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://github.com/asyncapi/html-template/tree/master"}),"HTML template")," that is a docs generator compatible with the AsyncAPI Generator for a server-side generation.")),Object(s.b)("p",null,"These are two completely separate tools. People are contributing to both. There are some features supported in the first one but not in the other one, and vice-versa."),Object(s.b)("p",null,"It is such a waste of time for contributors. We never liked it. ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.linkedin.com/in/maciej-urba%C5%84czyk-909547164/"}),"Maciej Urbanczyk")," took the effort to change it."),Object(s.b)("p",null,"Solution: Use React component as the core and HTML template to provide static output by rendering React during generation (you may know such approach from tools like Gatsby or Next.js)."),Object(s.b)("p",null,"Sounds simple, but there was a lot of work to do:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"React component to use official AsyncAPI Parser (yes, we were a bit behind there)"),Object(s.b)("li",{parentName:"ul"},"Provide features from HTML template to React component (who likes functionality regression, right?)"),Object(s.b)("li",{parentName:"ul"},"Rework design of React component to match the HTML template")),Object(s.b)("p",null,"The result:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"You need to try the new React component that is getting closer to the 1.0 release and join ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://github.com/asyncapi/asyncapi-react/issues/265"}),"the discussion"),".",Object(s.b)("pre",{parentName:"li"},Object(s.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"npm install @asyncapi/react-component@next\n"))),Object(s.b)("li",{parentName:"ul"},"HTML template already uses this React release candidate under ",Object(s.b)("inlineCode",{parentName:"li"},"0.21.1")," version.")),Object(s.b)("p",null,Object(s.b)("undefined",{parentName:"p"},"Don't stay behind. Maciek is now entirely focused on the component. Now is the best time to push for your features ",Object(s.b)("span",{role:"img","aria-label":"smiling face with open mouth"},"\ud83d\ude03"),".")),Object(s.b)("p",null,"Your favorite missing features like rendering of extensions and bindings are already there!"),Object(s.b)("p",null,Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://codesandbox.io/s/asyncapi-react-next-in-action-4en9x"}),Object(s.b)("img",Object(o.a)({parentName:"a"},{src:"https://codesandbox.io/static/img/play-codesandbox.svg",alt:"Edit asyncapi-react-component-next-in-action"})))),Object(s.b)("h2",{id:"intend-driven-api-for-asyncapi-parsers"},"Intend-driven API for AsyncAPI Parsers"),Object(s.b)("p",null,"Over the last couple of weeks ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.linkedin.com/in/jonas-terp-lagoni-85b027b9/"}),"Jonas Lagoni")," and ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://twitter.com/smoyac"}),"Sergio Moya")," worked on an idea to make the AsyncAPI JavaScript Parser, and in future other parsers, resilient to breaking changes in the AsyncAPI specification. "),Object(s.b)("p",null,"Why?"),Object(s.b)("p",null,"The current parser is bound to the structure of the AsyncAPI specification. The goal is to move away from such an approach into the API driven by the developer's intent. "),Object(s.b)("p",null,"Learn more about the outcome of this tremendous effort from Sergio's article: ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"/blog/intent-driven-api"}),"Designing a unified Intent-driven API for all AsyncAPI's parsers")),Object(s.b)("h2",{id:"websocket"},"WebSocket"),Object(s.b)("p",null,"Since we were getting more and more questions about using WebSocket with AsyncAPI, it was about time to provide some learning materials. We had no dedicated documentation nor examples, so I decided to spend few weeks on that subject, and as a result, we got:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"Blog post on ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://www.asyncapi.com/blog/websocket-part1"}),"WebSocket, Shrek, and AsyncAPI - An Opinionated Intro")),Object(s.b)("li",{parentName:"ul"},"Blog post on ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://www.asyncapi.com/blog/websocket-part2"}),"Creating AsyncAPI for WebSocket API - Step by Step")),Object(s.b)("li",{parentName:"ul"},"And soon I'll release the last blog post on ",Object(s.b)("a",Object(o.a)({parentName:"li"},{href:"https://github.com/asyncapi/website/pull/237"}),"From API-First to Code Generation - A WebSocket Use Case")," ")),Object(s.b)("p",null,"In addition, you can have a look at ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/asyncapi/spec/blob/master/examples/2.0.0/websocket-gemini.yml"}),"official WebSocket example"),"."),Object(s.b)("p",null,"There is also a ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.youtube.com/watch?v=8tFBcf31e_c"}),"live stream")," I did about this topic. I will also present at ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://edasummit.com/"}),"EDASummit")," on 19th of May and most probably at ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.meetup.com/Apiops-Helsinki/"}),"APIOps Helsinki")," someday around mid-June. Stay tuned."),Object(s.b)("h2",{id:"jobs"},"Jobs"),Object(s.b)("p",null,"Is your company looking for an AsyncAPI expert? Now you can share your job description on the AsyncAPI website to share it directly with the AsyncAPI community. In April, we had 300 individual users looking at Jobs view even though we do not actively promote it. Once the list of jobs grows, we will promote it more to increase the traffic and job offers visibility."),Object(s.b)("p",null,"Head on ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.asyncapi.com/jobs"}),"here")," and check out instructions on getting your job posting published. "),Object(s.b)("p",null,"This option to add custom job offers, including jobs filtering, was contributed by ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://twitter.com/_acebuild"}),"Acebuild"),Object(s.b)("undefined",{parentName:"p"}," ",Object(s.b)("span",{role:"img","aria-label":"folded hands"},"\ud83d\ude4f"),".")),Object(s.b)("h2",{id:"rss"},"RSS"),Object(s.b)("p",null,"We finally have an ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.asyncapi.com/rss.xml"}),"rss feed")," for our AsyncAPI blog. All thanks to ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://twitter.com/PermittedSoc"}),"Mike Ralphson"),"."),Object(s.b)("p",null,"If you do not like feed readers, just like me, then use some service like ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://blogtrottr.com/"}),"Blogtrottr")," to get email notifications. I use it for a GitHub blog on the free plan, and I'm super happy."),Object(s.b)("h2",{id:"asyncapi-workshop-aka-training"},"AsyncAPI workshop aka training"),Object(s.b)("p",null,"More and more people learn about AsyncAPI. We need to make sure there are good learning materials for anyone. More important, we need a solution that is easy to scale."),Object(s.b)("p",null,"Our new initiative is to work on training materials that can be used for in-class workshops with trainers, but on the other hand, they need to be available on a platform that offers self-learning training. All discussions happen ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/asyncapi/training/discussions"}),"here"),", and you can also join the #training channel in our ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.asyncapi.com/slack-invite/"}),"Slack"),"."),Object(s.b)("p",null,Object(s.b)("undefined",{parentName:"p"},"We need people that want to become trainers, trainees or help to work preparing training materials. All hands aboard ",Object(s.b)("span",{role:"img","aria-label":"flexed biceps"},"\ud83d\udcaa"),".")),Object(s.b)("p",null,"Who knows, maybe once it grows to a proper size, we will start thinking about some official certification program?"),Object(s.b)("h2",{id:"asyncapi-and-kafka"},"AsyncAPI and Kafka"),Object(s.b)("p",null,"This year there were many sessions about AsyncAPI at ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.kafka-summit.org/events/kafka-summit-europe-2021/about"}),"Kafka Summit"),". You need to have a look. If you want to work around the registration process, watch the below recording from ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://twitter.com/dalelane"}),"Dale Lane")," explaining how to use AsyncAPI with Kafka:"),Object(s.b)(b,{id:"Ni5tCY9r0TY",mdxType:"YouTube"}),Object(s.b)("p",null,"Dale has more content about AsyncAPI. For example, have a look at his work on the AsyncAPI ",Object(s.b)("a",Object(o.a)({parentName:"p"},{href:"https://nodered.org/"}),"Node-RED")," plugin:"),Object(s.b)(b,{id:"3B4O10V2PA0",mdxType:"YouTube"}),Object(s.b)("h2",{id:"interest-growth"},"Interest growth"),Object(s.b)("p",null,"I'm losing track here. It is growing so fast that we should expose some real-time metric that shows some aggregated data."),Object(s.b)("p",null,"For example, on Twitter, we went up by 200 followers in April, up to 1900. Now, when I write this article, it is already over 2000. "),Object(s.b)("p",null,"On Slack, we are already over 1200, and on LinkedIn, over 1100."),Object(s.b)("p",null,Object(s.b)("undefined",{parentName:"p"},Object(s.b)("span",{role:"img","aria-label":"rocket"},"\ud83d\ude80")," ",Object(s.b)("span",{role:"img","aria-label":"rocket"},"\ud83d\ude80")," ",Object(s.b)("span",{role:"img","aria-label":"rocket"},"\ud83d\ude80"))),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"Photo by ",Object(s.b)("a",{href:"https://unsplash.com/@waldemarbrandt67w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"},"Waldemar Brandt")," on ",Object(s.b)("a",{href:"https://unsplash.com/s/photos/april?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"},"Unsplash"))))}u.isMDXComponent=!0},"7ljp":function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return d}));var n=a("q1tI"),o=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var b=o.a.createContext({}),l=function(e){var t=o.a.useContext(b),a=t;return e&&(a="function"===typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=l(e.components);return(o.a.createElement(b.Provider,{value:t},e.children))},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return(o.a.createElement(o.a.Fragment,{},t))}},h=o.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,i=e.parentName,b=s(e,["components","mdxType","originalType","parentName"]),p=l(a),u=n,h=p["".concat(i,".").concat(u)]||p[u]||m[u]||r;return a?o.a.createElement(h,c(c({ref:t},b),{},{components:a})):o.a.createElement(h,c({ref:t},b))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"===typeof e||n){var r=a.length,i=new Array(r);i[0]=h;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"===typeof e?e:n,i[1]=c;for(var b=2;b<r;b++)i[b]=a[b];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,a)}h.displayName="MDXCreateElement"},Ff2n:function(e,t,a){"use strict";function n(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}a.d(t,"a",(function(){return n}))},Qetd:function(e,t,a){"use strict";var n=Object.assign.bind(Object);e.exports=n,e.exports.default=e.exports},wx14:function(e,t,a){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.d(t,"a",(function(){return n}))}},[["/gMh",0,1]]]);