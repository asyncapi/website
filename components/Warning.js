import IconExclamation from "./icons/Exclamation";

export default function Warning({ className = '', title, description }) {
  return (
    <div class={`${className} rounded-md bg-yellow-50 p-4`}>
      <div class="flex">
        <div class="flex-shrink-0">
          <IconExclamation className="h-5 w-5" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm leading-5 font-medium text-yellow-800 uppercase">
            {title}
          </h3>
          <div class="mt-2 text-sm leading-5 text-yellow-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}