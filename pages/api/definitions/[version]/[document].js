/**
 * This API handler is for our JSON Schema files for validating AsyncAPI documents. 
 * 
 * It is an extension of the repository https://github.com/asyncapi/spec-json-schemas
 * 
 * Because we need to disable the normal rendering of pages, we rewrite any incoming requests 
 * that is made to the path `/definitions` and reroute it (internally) to `/api/definitions`.
 * 
 * This is done in the the next.config.js file in the root folder.
 * 
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
  const { document, version } = req.query
  try {
    // eslint-disable-next-line no-undef
    const schema = require(`@asyncapi/specs/definitions/${version}/${document}`)
    res.status(200).json(schema)
  } catch(e) {
    const errorMessage = `Could not find AsyncAPI JSON Schema ${document} for version ${version}`;
    console.error(errorMessage)
    res.status(404).send(errorMessage)
  }
}
