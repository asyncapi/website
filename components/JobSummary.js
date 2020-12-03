import ApplyJobButton from "./buttons/ApplyJob";

export default function JobSummary({ remote = true, region = 'any', employmentType = 'full-time', className = '' }) {
  return (
    <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:px-6">
        <dl>
          <dt className="sr-only">Location</dt>
          <dd className="flex mt-1 text-sm text-gray-900">
            <svg viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-gray-400"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
            <div className="ml-4">
              {remote && <p>Remote</p>}
              <p className="text-gray-700">{region === 'any' ? 'Anywhere (on planet Earth)' : region}</p>
            </div>
          </dd>
        </dl>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl>
          <dt className="sr-only">Employment type</dt>
          <dd className="flex mt-1 text-sm text-gray-900">
            <svg viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-gray-400"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15a24.98 24.98 0 01-8-1.308z"></path></svg>
            <span className="ml-4">{employmentType === 'full-time' ? 'Full-time' : employmentType}</span>
          </dd>
        </dl>
      </div>

      <div className="hidden lg:block border-t border-gray-200 px-4 py-5 sm:px-6">
        <ApplyJobButton className="block text-center" />
      </div>
    </div>
  )
}