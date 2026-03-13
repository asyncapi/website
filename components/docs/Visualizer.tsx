/* eslint-disable require-jsdoc */
import 'schyma/dist/esm/style.css';

import type { JSONSchema7Object } from 'json-schema';
import React, { useEffect, useState } from 'react';
import Schyma from 'schyma';

interface VisualizerProps {
  version: string;
}

type SupportedVersion = '3.0.0' | '3.1.0';

const schemaLoaders: Record<SupportedVersion, () => Promise<{ default: unknown }>> = {
  '3.0.0': () => import('../../config/3.0.0.json'),
  '3.1.0': () => import('../../config/3.1.0.json')
};

function Visualizer({ version }: VisualizerProps) {
  const [schema, setSchema] = useState<JSONSchema7Object | null>(null);

  useEffect(() => {
    let isMounted = true;
    const currentVersion: SupportedVersion = version === '3.1.0' ? '3.1.0' : '3.0.0';

    setSchema(null);
    (async () => {
      try {
        const schemaModule = await schemaLoaders[currentVersion]();

        if (isMounted) setSchema(schemaModule.default as JSONSchema7Object);
      } catch {
        if (isMounted) setSchema(null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [version]);

  if (!schema) {
    return null;
  }

  return (
    <div className='overflow-hidden'>
      <Schyma
        title='AsyncAPI Specification'
        description="The AsyncAPI Specification defines a set of fields that can be used in an
        AsyncAPI document to describe an application's API. The document may reference other files for
        additional details or shared fields, but it is typically a single,
        primary document that encapsulates the API description."
        schema={schema}
      />
    </div>
  );
}

export default Visualizer;
