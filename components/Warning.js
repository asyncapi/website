import IconExclamation from "./icons/Exclamation";

export default function Warning({ className = '', title, description }) {
  return (
    <div className={`${className} rounded-md bg-yellow-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm leading-5 font-medium text-yellow-800 uppercase">
            {title}
          </h3>
          <div className="mt-2 text-sm leading-5 text-yellow-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}