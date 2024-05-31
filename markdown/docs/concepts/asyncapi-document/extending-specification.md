---
title: Extending specification
weight: 240
---

Extending the AsyncAPI specification allows you to include specific information for your domain or use case that's not currently supported by the original specification or the protocol bindings. Extension capability allows for customization, making it possible to integrate unique aspects into APIs that the standard AsyncAPI specification doesn't normally accommodate.

## Specification extensions

The AsyncAPI Specification allows the addition of custom properties through patterned fields prefixed with an `x-`. That way, you can create unique things without causing problems in future updates.

The `x-` prefix is used to define custom properties. These properties are user-defined and won't conflict with future specification versions because any property starting with `x-` is reserved for user definitions.

Extensions can be used in any part of the AsyncAPI document.

Here is an example of how to extend the AsyncAPI document with a custom property:

```yml
asyncapi: 3.0.0
info:
  title: Cool Example
  version: 0.1.0
  x-linkedin: '/company/asyncapi'  
```

The above document shows an `info` object extended with custom information about a company's LinkedIn account that owns the application. Custom information is represented via a custom property called `x-linkedin`.

<Remember>
AsyncAPI tools might not support AsyncAPI extensions. Our tools can be extended to understand and handle the added data, especially if the tools are internal or open source.
</Remember>

## Extending unsupported features

If you need a feature not covered by the AsyncAPI specification, you can create an extension for it. Should this extension be useful to others, consider contributing it back to the AsyncAPI community. You can do this by [opening a spec issue](https://github.com/asyncapi/spec) in the AsyncAPI GitHub repository. Before contributing, review the [AsyncAPI contribution guidelines](https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md).
