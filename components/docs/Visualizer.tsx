import 'schyma/dist/esm/style.css';

import type { JSONSchema7Object } from 'json-schema';
import React from 'react';
import Schyma from 'schyma';

import schemav3 from '../../config/3.0.0.json';
import schemav3_1 from '../../config/3.1.0.json';

/**
 * @description This component renders the spec explorer.
 */

interface VisualizerProps {
  version: string;
}
function Visualizer({ version }: VisualizerProps) {
  let typeSchema = schemav3 as unknown as JSONSchema7Object;
  if (version === '3.1.0') {
    typeSchema = schemav3_1 as unknown as JSONSchema7Object;
  }
  return (
    <div className="overflow-hidden">
      <Schyma
        title="AsyncAPI Specification"
        description="The AsyncAPI Specification defines a set of fields that can be used in an
        AsyncAPI document to describe an application's API. The document may reference other files for
        additional details or shared fields, but it is typically a single,
        primary document that encapsulates the API description."
        schema={typeSchema}
      />
    </div>
  );
}

export default Visualizer;
