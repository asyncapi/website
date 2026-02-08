import 'schyma/dist/esm/style.css';

import type { JSONSchema7Object } from 'json-schema';
import React, { useState } from 'react';
import Schyma from 'schyma';

import schema from '../../config/3.0.0.json';

const typeSchema = schema as unknown as JSONSchema7Object;

/**
 * @description This component renders the spec explorer.
 */
function Visualizer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className={`visualizer-container ${showMap ? 'show-map' : ''}`}>
      <div className='mobile-toggle px-4'>
        <button
          onClick={() => setShowMap(!showMap)}
          className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded mb-2 mt-4 w-full md:hidden'
        >
          {showMap ? 'Hide Visual Map' : 'Show Visual Map'}
        </button>
      </div>
      <Schyma
        title='AsyncAPI Specification'
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
