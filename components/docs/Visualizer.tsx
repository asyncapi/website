import React from 'react'
import Schyma from 'schyma';
import 'schyma/dist/esm/style.css'
import schema from '../../config/3.0.0.json';
import { JSONSchema7Object } from 'json-schema';

const typeSchema = schema as unknown as JSONSchema7Object


function Visualizer() {
    return (
        <Schyma title="AsyncAPI Specification" description="The AsyncAPI Specification defines a set of fields that can be used in an AsyncAPI document to describe an application's API. The document may reference other files for additional details or shared fields, but it is typically a single, primary document that encapsulates the API description." schema={typeSchema} />
  )
}

export default Visualizer