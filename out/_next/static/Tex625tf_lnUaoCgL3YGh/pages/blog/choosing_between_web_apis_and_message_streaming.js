(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"0s+U":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/choosing_between_web_apis_and_message_streaming",function(){return n("ThMt")}])},"7ljp":function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var a=n("q1tI"),r=n.n(a);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"===typeof e?e(t):i(i({},t),e)),n},b=function(e){var t=p(e.components);return(r.a.createElement(l.Provider,{value:t},e.children))},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return(r.a.createElement(r.a.Fragment,{},t))}},h=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=p(n),u=a,h=b["".concat(o,".").concat(u)]||b[u]||m[u]||s;return n?r.a.createElement(h,i(i({ref:t},l),{},{components:n})):r.a.createElement(h,i({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"===typeof e||a){var s=n.length,o=new Array(s);o[0]=h;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"===typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},Ff2n:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.d(t,"a",(function(){return a}))},Qetd:function(e,t,n){"use strict";var a=Object.assign.bind(Object);e.exports=a,e.exports.default=e.exports},ThMt:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n("wx14"),r=n("Ff2n"),s=n("q1tI"),o=n.n(s),i=n("7ljp"),c=(o.a.createElement,{}),l="wrapper";function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)(l,Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This post originally appeared on ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://medium.com/capital-one-tech/choosing-between-rest-web-apis-and-message-streaming-8e2f4813a058"}),"Capital One Tech"))),Object(i.b)("p",null,"When faced with a variety of options, how are developers building APIs supposed to know which is the right one for their solution? In this article, I\u2019m going to outline the common characteristics for both REST APIs and message streaming so developers can better understand when (and when not) to use each one."),Object(i.b)("h2",{id:"characteristics-of-rest-based-web-apis"},"Characteristics of REST-Based Web APIs"),Object(i.b)("p",null,"REST-based web APIs create a conversation between a client (the API consumer) and an API server (the backend). When we build REST-based APIs within Capital One, we use HTTP as our protocol. Our designs depend heavily on HTTP, from the methods (e.g. GET, POST, PUT, PATCH, DELETE) to the headers that help us communicate between client and server (e.g. Authorization, Accept, Content-Type)."),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-1.webp",alt:"Request/response client-server list conversation"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'GET /projects\nAccept: application/json\n\n200 OK\nContent-Type: application/json\n \n [\n  { "projectId":"...", "name":"..." },\n  { "projectId":"...", "name":"..." },\n  { "projectId":"...", "name":"..." },\n  ...\n ]\n')),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-2.webp",alt:"Request/response client-server create conversation"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'POST/projects\nContent-Type: application/json\n\n{ "name":"...", ... }\n\n201 Created\nContent-Type: application/json\n \n { "projectId":"...", "name":"...", ... }\n\n')),Object(i.b)("p",null,"The client (or API consumer) is the app, which sends a message (i.e. an HTTP request) to the API whenever it needs something. The server then replies with the response, including a status code that indicates if the request was processed successfully (2xx error code), failed due to client error (4xx error code), or failed due to server error (5xx error code). All communication flows from the consumer to the API backend."),Object(i.b)("p",null,"When we add in hypermedia links, we extend the conversation with some additional information that may be helpful to the client:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-3.webp",alt:"Request/response client-server hypermedia conversation"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'GET /projects/12345\nAccept: application/json\n\n200 OK\nContent-Type: application/json\n \n { \n "name":"...", ...,\n "_links": {\n   { "self" :"/projects/1234" }, \n   { "related_projects": [\n     { "4567" :"/projects/4567" }, \n     { "8901" :"/projects/8901" }, \n     { "9012" :"/projects/9012" } \n   ]}, \n   { "members": [\n     { "1" :"/users/1" }, \n     { "2" :"/users/2" }, \n     { "3" :"/users/3" }, \n     { "4" :"/users/4" }, \n     { "5" :"/users/5" } \n   ]}\n }\n')),Object(i.b)("p",null,"REST-based APIs have a specific set of characteristics that are summarized below:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Request/response model")," \u2014 API consumers send requests to an API server and receive a response."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Pull-based interaction")," \u2014 API consumers send an API request when data or functionality is required (e.g. user interface, at a pre-scheduled time)."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Synchronous")," \u2014 API consumers receive the response after a request is sent."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Multiple content types")," \u2014 since REST APIs are built upon HTTP, responses may be JSON, XML, or other content types as necessary to support consumer needs (e.g. CSV, PDF)."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Flexible interactions")," \u2014 Building upon the available HTTP verbs, consumers may interact with REST-based APIs through resources in a variety of ways: queries/search, creating new resources, modifying existing resources, and deleting resources. We can also build complex workflows by combining these interactions into higher-level processes."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Caching and concurrency protocol support")," \u2014 HTTP has caching semantics built-in, allow for caching servers to be placed between the consumer and API server, as well as cache control of responses and eTags for concurrency control to prevent overwriting content."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Internal and external access")," \u2014 REST APIs may be restricted for internal use or for external use by partners or public developers.")),Object(i.b)("p",null,"For most solutions, offering a REST-based API is a great starting point, allowing any application or automation script to interact with your API over HTTP."),Object(i.b)("h2",{id:"characteristics-of-message-streaming"},"Characteristics of Message Streaming"),Object(i.b)("p",null,"Unlike REST APIs, message streaming is better at providing notifications when new messages arrive. Once subscribed, the client will be notified when new messages are available:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-4.webp",alt:"Event-based API subscription"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'POST /subscriptions\nContent-Type: application/json\n\n{ "callbackUrl":"https://my.callback/path", ... }\n\n201 Created\nContent-Type: application/json\n \n')),Object(i.b)("p",null,"Now that the client is subscribed to a topic, it will receive notifications when new messages are available. This may be the result of a REST API processing incoming requests from a web or mobile app, then adding messages into the message stream topic to notify anyone that is interested:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-5.webp",alt:"Event-based API notifications"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"POST https://my.callback/path\n<<project created event>>\n\nPOST https://my.callback/path\n<<project archived event>>\n\nPOST https://my.callback/path\n<<project updated event>>\n")),Object(i.b)("p",null,"Notice how our conversation became more interesting. We now can be notified when things change or critical business events occur; without needing to modify and redeploy the API to support a new integration that emerges in the future. This is called loose coupling, and it helps our systems be used in new ways without the originator of the messages even knowing about current and future subscribers."),Object(i.b)("p",null,"Those familiar with message brokers will realize that this is familiar. The difference between a message broker and message streaming is that ",Object(i.b)("em",{parentName:"p"},"message streaming allows us to revisit past messages in sequence as well"),":"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/img/posts/choosing_between_web_apis_and_message_streaming/convo-6.webp",alt:"Streaming API conversation"}))),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"<<request last 12 messages from project_messages topic>>\n\n<<retrieve and send last 12 messages from project_messages topic>>\n")),Object(i.b)("p",null,"This feature is useful when we need to go aggregate values or perform a new calculation we previously didn\u2019t realize we needed."),Object(i.b)("p",null,"Note \u2014 we can\u2019t filter messages or perform other aggregate queries when requesting the messages \u2014 only the client can do this after requesting the messages from the topic. REST APIs are better suited for performing ad hoc queries than message streams."),Object(i.b)("p",null,"As you are discovering, message streaming is a different style of interaction than REST-based APIs. Additional characteristics of message streaming are summarized below:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Publish/subscribe model")," \u2014 Apps or APIs publish messages to a topic which may have zero, one, or many subscribers rather than a request/response model."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Subscriber notification interaction")," \u2014 Apps receive notification when a new message is available, such as when data is modified or new data is available."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Asynchronous")," \u2014 Unlike REST APIs, apps cannot use message streams to submit a request and receive a response back without complex coordination between parties."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Single content-type")," \u2014 At Capital One, our message streaming is built upon Avro, a compact binary format useful for data serialization. Unlike HTTP, Avro doesn\u2019t support other content types (e.g. CSV, PDF)."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Replayability")," \u2014 At Capital One, our message streaming is built on Kafka, subscribers may revisit and replay previous messages sequentially."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"No caching or concurrency protocol support")," \u2014 Message streaming doesn\u2019t offer caching semantics, cache-control, or concurrency control between publisher and subscriber."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"Internal access only")," \u2014 Subscribers must be internal to the organization, unlike HTTP which may be externalized to partner or public consumers.")),Object(i.b)("p",null,"Message streaming offers some additional communication options that REST-based APIs do not \u2014 push-based notifications when new data or state changes occur, and the option of revisiting past messages in the stream to perform new calculations or re-execute logic that failed previously. When combined together, REST-APIs enable consuming apps to integrate easily with an HTTP API, while message streaming allow consumers to be notified of changes without needing to check with the REST API first. This can be a powerful combination that can satisfy use cases that exist today, while allowing emerging use cases to be handled in the future \u2014 all without modifying existing systems to accommodate new solutions."),Object(i.b)("h2",{id:"summary"},"Summary"),Object(i.b)("p",null,"As you may have realized, choosing between a web API and message streaming isn\u2019t difficult, as long as you understand the characteristics of each one. REST APIs are best suited to request/response interactions where the client application sends a request to the API backend over HTTP. Message streaming is best suited to notification when new data or events occur that you may want to take action upon. Just be sure to match the needs of the consumer with one or more approaches to offer a robust interface to your solution\u2019s capabilities."))}p.isMDXComponent=!0},wx14:function(e,t,n){"use strict";function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}n.d(t,"a",(function(){return a}))}},[["0s+U",0,1]]]);