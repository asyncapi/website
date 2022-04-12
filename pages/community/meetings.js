import GenericLayout from "../../components/layout/GenericLayout";
import Calendar from '../../components/Calendar'
import Button from '../../components/buttons/Button'

import Heading from "../../components/typography/Heading";

export default function meetings() {
  const description =
    "Learn about all official AsyncAPI meetings.";
  const image = "/img/social/meetings.png";

  return (
    <GenericLayout
      title="AsyncAPI Meetings"
      description={description}
      image={image}
      wide
    >

      <div className="py-12 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <div className="text-center">         
          <Heading level="h1" typeStyle="heading-lg">
              AsyncAPI Meetings
          </Heading>   
          <p className="my-4 text-base text-gray-600">
              All meetings are live streamed to all AsyncAPI social media accounts. To learn more about meetings setup and automation <a href="https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md" className="hover:text-gray-500">read our FAQ</a>.
          </p>
          <Button className="block md:inline-block md:flex-1 md:text-center" text="Add to Google Calendar" href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" target="_blank" />
          <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Download ICS File" href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics" target="_blank" />
          <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" text="Subscribe to Notifications" href="/newsletter" target="_blank" />
          <div className="pt-10 grid grid-cols-10 lg:text-center">

          <div className="col-start-3 col-span-6"><Calendar text="text-center"/></div>
        </div>
        </div>
        <div className="pt-10 grid lg:grid-cols-2 lg:gap-8 lg:text-center">
          <div>
            <div className="pt-6">
              <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
                <h3 className="font-semibold text-primary-800 mb-2 lg:text-2xl">
                  Community Meeting
                </h3>
                <p className="my-4 text-base text-gray-600">
                  <strong>Purpose:</strong> This is a community meeting to regularly talk in open about important topics around AsyncAPI Initiative. We organize it every two weeks in different time zones.
                </p>
                <p className="my-4 text-base text-gray-600">
                  <strong>Host:</strong> <a href="https://github.com/derberg" className="hover:text-gray-500">Lukasz Gornicki</a>
                </p>
                <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Watch recordings" href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS" target="_blank" />
              </div>
            </div>
            <div className="pt-6">
              <div className="pt-6 rounded-md border border-gray-200 overflow-hidden bg-white p-4">
                <h3 className="font-semibold text-primary-800 mb-2 lg:text-2xl">
                  Spec 3.0 Meeting
                </h3>
                <p className="my-4 text-base text-gray-600">
                  <strong>Purpose:</strong> This is the meeting for community member involved in works related to 3.0 release of AsyncAPI Specification. We organize it every two weeks at the same time.
                </p>
                <p className="my-4 text-base text-gray-600">
                  <strong>Host:</strong> <a href="https://github.com/jonaslagoni" className="hover:text-gray-500">Jonas Lagoni</a>
                </p>
                <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Watch recordings" href="https://www.youtube.com/playlist?list=PLbi1gRlP7pihClJY-kXuTRRJ8n1awb0VV" target="_blank" />
              </div>
            </div>
          </div>
          <div>
            <div className="pt-6">
              <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
                <h3 className="font-semibold text-primary-800 mb-2 lg:text-2xl">
                  Thinking Out Loud
                </h3>
                <p className="my-4 text-base text-gray-600">
                  <strong>Purpose:</strong> This is a live stream about different topics related to AsyncAPI Initiative and Event Driven Architectures. It is always an open discussion between a host and a guest.
                </p>
                <p className="my-4 text-base text-gray-600">
                  <strong>Host:</strong> <a href="https://github.com/fmvilas" className="hover:text-gray-500">Fran Mendez</a>
                </p>
                <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Watch recordings" href="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPxRRylHGCvpdppYLmSKfJ" target="_blank" />
              </div>
            </div>
            <div className="pt-6">
              <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
                <h3 className="font-semibold text-primary-800 mb-2 lg:text-2xl">
                  Let's talk about contributing
                </h3>
                <p className="my-4 text-base text-gray-600">
                  <strong>Purpose:</strong> This live stream focuses on contributors, focuses on people that want to contribute to AsyncAPI Initiative but do not know how to do it.
                </p>
                <p className="my-4 text-base text-gray-600">
                <strong>Host:</strong> <a href="https://github.com/derberg" className="hover:text-gray-500">Lukasz Gornicki</a>
                </p>
                <Button className="mt-2 md:mt-0 md:ml-2 block md:inline-block md:flex-1 md:text-center" bgClassName="bg-indigo-500 hover:bg-indigo-400" text="Watch recordings" href="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY" target="_blank" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="pt-6 col-start-3 col-span-5">
            <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
              <h3 className="font-semibold text-primary-800 mb-2 lg:text-2xl">
                Ad Hoc Meeting
              </h3>
              <p className="my-4 text-base text-gray-600">
                <strong>Purpose:</strong> Do you want to discuss something with community and other meeting formats won't work? This is what this meeting is for, to schedule something specific with the community. 
              </p>
              <p className="my-4 text-base text-gray-600">
              <strong>Host:</strong> Anyone from the list of hosts of other meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}


