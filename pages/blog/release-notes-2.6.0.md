---
title: AsyncAPI Spec 2.6.0 Release Notes
date: 2023-02-01T23:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.6.0/cover.webp
authors:
  - name: Azeez Elegbede
    photo: /img/avatars/ace.webp
    link: https://twitter.com/acethecreator
    byline: Software Engineer & Open-Source Advocate 
excerpt: "The release of AsyncAPI 2.6 added an exciting feature which is the support for Apache Pulsar"
featured: true
---

The new version of the AsyncAPI specification - 2.6.0 - is now available.

> This is a minor release and doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.5.0'` into `asyncapi: '2.6.0'`

## Added Pulsar Bindings and Protocol to AsyncAPI specification

The specification now supports a new custom protocol through the bindings feature called [Pulsar](https://pulsar.apache.org/).

Here is an example of the server representation in Pulsar:

```yaml
servers:
  production:
    bindings:
      pulsar:
        tenant: contoso
        bindingVersion: '0.1.0'
```

And also an example of the channel representation in Pulsar:

```yaml
channels:
  user-signedup:
    bindings:
      pulsar:
        namespace: 'staging'
        persistence: 'persistent'
        compaction: 1000
        geo-replication:
          - 'us-east1'
          - 'us-west1'
        retention:
          time: 7
          size: 1000
        ttl: 360
        deduplication: false
        bindingVersion: '0.1.0'
```

Thanks to [Alex Wichmann](https://github.com/VisualBean) for this incredible feature.  For more details, check out this [Pulsar bindings pull request](https://github.com/asyncapi/spec/pull/882) and the [binding definition](https://github.com/asyncapi/bindings/tree/master/pulsar).


> Photo by Clem Onojeghuo: https://www.pexels.com/photo/low-angle-photography-of-metal-building-on-grayscale-175771/