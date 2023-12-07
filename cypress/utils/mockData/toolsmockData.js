export const toolData = {
  "APIs": {
    "description": "The following is a list of APIs that expose functionality related to AsyncAPI.",
    "toolsList": [
      {
        "title": "API Tracker - AsyncAPI specs",
        "description": "Explore APIs and companies with public AsyncAPI specifications.",
        "links": {
          "websiteUrl": "https://apitracker.io/specifications/asyncapi",
          "repoUrl": ""
        },
        "filters": {
          "categories": ["api", "directory"],
          "hasCommercial": false,
          "isAsyncAPIOwner": false,
          "technology": []
        }
      },
      {
        "title": "AsyncAPI Server API",
        "description": "Server API providing official AsyncAPI tools",
        "links": {
          "websiteUrl": "https://api.asyncapi.com/v1",
          "docsUrl": "https://api.asyncapi.com/v1/docs",
          "repoUrl": "https://github.com/asyncapi/server-api"
        },
        "filters": {
          "technology": [
            { "name": "Node.js", "color": "bg-[#BDFF67]", "borderColor": "border-[#84CE24]" },
            { "name": "TypeScript", "color": "bg-[#61d0f2]", "borderColor": "border-[#40ccf7]" }
          ],
          "categories": ["api"],
          "hasCommercial": false,
          "isAsyncAPIOwner": true
        }
      }
    ]
  }
};
