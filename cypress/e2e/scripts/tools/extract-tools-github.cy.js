import { getData } from "../../../../scripts/tools/extract-tools-github";
describe('det Data', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/tools');
      const stubbedResponse = 
      {
          "total_count": 18,
          "incomplete_results": false,
          "items": [
            {
              "name": ".asyncapi-tool",
              "path": ".asyncapi-tool",
              "sha": "c15324ea8e92cfa873de90a3c91e9866e208537a",
              "url": "https://api.github.com/repositories/442113220/contents/.asyncapi-tool?ref=4b17fadbc95df6197fb057e4b50287834e2ab486",
              "git_url": "https://api.github.com/repositories/442113220/git/blobs/c15324ea8e92cfa873de90a3c91e9866e208537a",
              "html_url": "https://github.com/LEGO/AsyncAPI.NET/blob/4b17fadbc95df6197fb057e4b50287834e2ab486/.asyncapi-tool",
              "repository": {
                "id": 442113220,
                "node_id": "R_kgDOGlocxA",
                "name": "AsyncAPI.NET",
                "full_name": "LEGO/AsyncAPI.NET",
                "private": false,
                "owner": {
                  "login": "LEGO",
                  "id": 4530164,
                  "node_id": "MDEyOk9yZ2FuaXphdGlvbjQ1MzAxNjQ=",
                  "avatar_url": "https://avatars.githubusercontent.com/u/4530164?v=4",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/LEGO",
                  "html_url": "https://github.com/LEGO",
                  "followers_url": "https://api.github.com/users/LEGO/followers",
                  "following_url": "https://api.github.com/users/LEGO/following{/other_user}",
                  "gists_url": "https://api.github.com/users/LEGO/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/LEGO/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/LEGO/subscriptions",
                  "organizations_url": "https://api.github.com/users/LEGO/orgs",
                  "repos_url": "https://api.github.com/users/LEGO/repos",
                  "events_url": "https://api.github.com/users/LEGO/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/LEGO/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "html_url": "https://github.com/LEGO/AsyncAPI.NET",
                "description": "The AsyncAPI.NET SDK contains a useful object model for AsyncAPI documents in .NET",
                "fork": false,
                "url": "https://api.github.com/repos/LEGO/AsyncAPI.NET",
                "forks_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/forks",
                "keys_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/teams",
                "hooks_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/hooks",
                "issue_events_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/issues/events{/number}",
                "events_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/events",
                "assignees_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/assignees{/user}",
                "branches_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/branches{/branch}",
                "tags_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/tags",
                "blobs_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/languages",
                "stargazers_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/stargazers",
                "contributors_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/contributors",
                "subscribers_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/subscribers",
                "subscription_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/subscription",
                "commits_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/issues/comments{/number}",
                "contents_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/contents/{+path}",
                "compare_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/merges",
                "archive_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/downloads",
                "issues_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/issues{/number}",
                "pulls_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/labels{/name}",
                "releases_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/releases{/id}",
                "deployments_url": "https://api.github.com/repos/LEGO/AsyncAPI.NET/deployments"
              },
              "score": 1.0
            },
        ]
        };
  
      // Intercept the API request and stub the response
      cy.intercept('GET', 'https://api.github.com/search/code?q=filename:.asyncapi-tool*', {
        statusCode: 200,
        body: stubbedResponse,
        headers: {
          accept: 'application/vnd.github.text-match+json',
          authorization: `token *`,
        },
      }).as('getData');
  
      // Manually trigger the function
      getData().then((response) => {
        expect(response).to.exist;
      });
    
    });
  });
  