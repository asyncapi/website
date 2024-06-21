import 'schyma/dist/esm/style.css';

import type { JSONSchema7Object } from 'json-schema';
import React from 'react';
import Schyma from 'schyma';

import schema from '../../config/3.0.0.json';
import Head from '../Head';

const typeSchema = schema as unknown as JSONSchema7Object;

interface IGenericLayoutProps {
  title: string;
  description: string;
}

/**
 * @description This component renders the spec explorer.
 */
function Visualizer({ title, description }: IGenericLayoutProps) {
  return (
    <div>
      <Head title={title} description={description} />
      <Schyma
        title='AsyncAPI Specification'
        description="The AsyncAPI Specification defines a set of fields that can be used in an AsyncAPI document to describe an application's API. The document may reference other files for additional details or shared fields, but it is typically a single, primary document that encapsulates the API description."
        schema={typeSchema}
      />
    </div>
  );
}

export default Visualizer;
