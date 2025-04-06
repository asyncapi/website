declare module 'jgexml/json2xml' {
  interface Json2Xml {
    getXml(feed: unknown, attributePrefix: string, defaultValue: string, indentLevel: number): string;
  }

  const json2xml: Json2Xml;

  export = json2xml;
}
