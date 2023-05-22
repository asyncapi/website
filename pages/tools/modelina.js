import GenericLayout from '../../components/layout/GenericLayout'
import React, { useRef, useState } from 'react'
import CodeBlock from '../../components/editor/CodeBlock'
import GithubButton from '../../components/buttons/GithubButton'
import Button from '../../components/buttons/Button'
import IconRocket from '../../components/icons/Rocket'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

export default function ModelinaPlaygroundPage() {
  const [error, setError] = useState();
  const description = 'Sometimes you just want to generate data models for your payload. Modelina is a library for generating data models based on inputs such as AsyncAPI, OpenAPI, or JSON Schema documents.';
  const image = '/img/social/modelina-card.jpg';

  const tabs = (
    <CodeBlock
      language="javascript"
      textSizeClassName="text-sm"
      className="shadow-lg w-full"
      highlightClassName="h-120"
      codeBlocks={[
        {
          language:'javascript',
          title: 'Generator code',
          code: exampleModelinaCode,
        },
        {
          language:'javascript',
          title: 'Output model',
          code: exampleOutputModel,
        },
      ]}
    />
  );

  return (
    <GenericLayout
      title="Modelina"
      description={description}
      image={image}
      wide
    >
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative text-center">
          <Heading level="h1" typeStyle="heading-lg">
            Modelina
          </Heading>
          <Paragraph className="mt-4 max-w-3xl mx-auto">
            {description}
          </Paragraph>
        </div>

        <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative mb-8 lg:mt-8">
            <Heading level="h4" typeStyle="heading-md-semibold">
                Installation & Usage
            </Heading>
            <Paragraph className="mt-3 lg:pr-4">
              Start using Modelina really quickly. Select one of the available languages we offer and start generating models from your AsyncAPI document in a few seconds.
            </Paragraph>
            <div className="mt-8">
              <CodeBlock language="bash" showLineNumbers={false} className="mt-8" textSizeClassName="text-sm">npm install @asyncapi/modelina</CodeBlock>
              <div className="flex gap-x-2 justify-center lg:justify-start">
                <GithubButton
                  className="block md:mt-0 md:inline-block mt-2"
                  href="https://www.github.com/asyncapi/modelina"
                />
                <Button 
                  className="block md:mt-0 text-center md:inline-block mt-2 " 
                  text="Try it now"
                  icon={<IconRocket className="inline-block -mt-1 w-6 h-6" />}
                  href="https://modelina.org/playground" target='blank'
                      />
              </div>
            </div>
          </div>
          <div className="relative lg:mt-8">
            {tabs}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold mr-4">Error!</strong>
            <span className="block sm:inline">{typeof error.toString === 'function' ? error.toString() : error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-2">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {setError(undefined)}}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}
      </div>
    </GenericLayout>
  )
}

const exampleModelinaCode = `import { JavaGenerator, JAVA_COMMON_PRESET } from '@asyncapi/modelina'
  
const generator = new JavaGenerator({
  collectionType: "List",
  presets: [
    {
      preset: JAVA_COMMON_PRESET,
      options: {
        classToString: true
      }
    }
  ]
});

// const input = ...AsyncAPI document
const models = await generator.generate(input)`;

const exampleOutputModel = `import java.util.List;
import java.util.Map;

public class LightMeasured {
  private Integer id;
  private Integer lumens;
  private java.time.OffsetDateTime sentAt;
  private Map<String, Object> additionalProperties;

  public Integer getId() { return this.id; }
  public void setId(Integer id) { this.id = id; }

  public Integer getLumens() { return this.lumens; }
  public void setLumens(Integer lumens) { this.lumens = lumens; }

  public java.time.OffsetDateTime getSentAt() { return this.sentAt; }
  public void setSentAt(java.time.OffsetDateTime sentAt) { this.sentAt = sentAt; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }

  @Override
  public String toString() {
    return "class LightMeasured {\\n" +   
      "    id: " + toIndentedString(id) + "\\n" +
      "    lumens: " + toIndentedString(lumens) + "\\n" +
      "    sentAt: " + toIndentedString(sentAt) + "\\n" +
      "    additionalProperties: " + toIndentedString(additionalProperties) + "\\n" +
    "}";
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\\n", "\\n    ");
  }
}`;

