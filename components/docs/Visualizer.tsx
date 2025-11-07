import React from 'react';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import type { JSONSchema7Object } from 'json-schema';
import schema from '../../config/3.0.0.json';

const typeSchema = schema as unknown as JSONSchema7Object;

/**
 * @description This component renders the spec explorer (lightweight alternative to Schyma).
 */
function Visualizer() {
  return (
    <div style={{ backgroundColor: '#0b0c10', padding: '1rem', borderRadius: '12px' }}>
      <h2 style={{ color: '#51d6ca', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        AsyncAPI Specification
      </h2>
      <p style={{ color: '#ccc', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        The AsyncAPI Specification defines a set of fields that can be used in an AsyncAPI document
        to describe an application's API. The document may reference other files for additional
        details or shared fields, but it is typically a single, primary document that encapsulates
        the API description.
      </p>

      <JsonView data={typeSchema} style={darkStyles} shouldExpandNode={() => false} />
    </div>
  );
}

export default Visualizer;
