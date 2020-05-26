export default function Sponsors ({ className }) {
  return (
    <div className={`text-center ${className || ''}`}>
      <div className="mb-8 md:px-4">
        <a href="https://www.iqvia.com" target="_blank"><img className="inline-block px-4 mt-6 w-1/2 sm:w-auto sm:h-10" src="img/sponsors/iqvia.png" /></a>
        <a href="https://www.mulesoft.com" target="_blank"><img className="inline-block px-4 mt-6 w-1/2 sm:w-auto sm:h-12" src="img/sponsors/mulesoft.png" /></a>
        <a href="https://www.salesforce.com" target="_blank"><img className="inline-block px-8 mt-6 w-1/2 sm:w-auto sm:h-12" src="img/sponsors/salesforce.png" /></a>
        <a href="https://www.sap.com" target="_blank"><img className="inline-block px-8 mt-6 w-1/2 sm:w-auto sm:h-12" src="img/sponsors/sap.png" /></a>
        <a href="https://www.slack.com" target="_blank"><img className="inline-block px-4 mt-6 w-1/2 sm:w-auto sm:h-12" src="img/sponsors/slack.png" /></a>
        <a href="https://www.solace.com" target="_blank"><img className="inline-block px-4 mt-6 w-1/2 sm:w-auto sm:h-10" src="img/sponsors/solace.png" /></a>
        <a href="https://www.tibco.com" target="_blank"><img className="inline-block px-4 mt-6 w-1/2 sm:w-auto sm:h-12" src="img/sponsors/tibco.png" /></a>
      </div>
      <div className="md:px-4">
        <span className="text-gray-500">Platinum sponsors</span> — <a href="https://opencollective.com/asyncapi" target="_blank" className="text-primary-600">Join the best companies in the world.</a>
      </div>
    </div>
  )
}