---
title: Reusable parts
weight: 149
---

Reusable parts provide flexibility, modularity, and code reusability. Making it easier to generate code and validate the specification. You can reuse specific document sections such as Messages or schema definitions.

Reusable parts allow you to split up the AsyncAPI document into many files and reference them using the Reference Object ($ref).

## External files

You can use the ref keyword to reference external files within the document. For example:

```yaml
##### ./asyncapi.yaml
asyncapi: 2.3.0
---
channels:
user/signedup:
subscribe:
message:
$ref: './messages/userSignedUp.yaml'
```

```yaml
##### ./messages/userSignedUp.yaml
name: UserSignup
title: User signup
summary: Action to sign a user up.
description: A longer description
contentType: application/json
payload:
```

## Another AsyncAPI document

You can use the ref keyword to reference messages defined in another AsyncAPI document. For example:

```yaml
##### ./asyncapi.A.yaml

asyncapi: 2.3.0
---
channels:
user/signedup:
subscribe:
message:
$ref: '#/components/messages/userSignedUp'
components:
messages:
UserSignup:
name: UserSignup
title: User signup
summary: Action to sign a user up.
description: A longer description
contentType: application/json
payload:
```

```yaml
##### ./asyncapi.B.yaml
---
channels:
user/signedup:
publish:
message:
$ref: './asyncapi.A.yaml#/components/messages/userSignedUp'
```
