import GenericLayout from "../../components/layout/GenericLayout";
import Calendar from '../../components/Calendar';
import Meeting from '../../components/Meeting';
import GoogleCalendarButton from '../../components/buttons/GoogleCalendarButton';
import ICSFileButton from '../../components/buttons/ICSFileButton';
import SubscribeButton from '../../components/buttons/SubscribeButton';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
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

      <div className="py-10 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="col-start-3 col-span-5">       
            <Heading level="h1" typeStyle="heading-lg">
                AsyncAPI Meetings
            </Heading>   
            <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
                All meetings are live streamed to all AsyncAPI social media accounts. To learn more about meetings setup and automation 
                <TextLink href="https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md" target="_blank">
                  read our FAQ
                </TextLink>.
            </Paragraph>
            <GoogleCalendarButton href="https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" />
            <SubscribeButton 
              href="/newsletter" 
              className="mt-2 md:mt-0 md:ml-2"
            />
            <ICSFileButton 
              href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics" 
              className="mt-2 md:mt-0 md:ml-2"
            />
            <div className="pt-10 lg:text-center">
                <Calendar text="text-center"/>
            </div>
          </div>
        </div>
        <div className="pt-10 grid lg:grid-cols-2 lg:gap-8 lg:text-center">
          <div>
            <div className="pt-6">
              <Meeting
                name="Community Meeting"
                purpose="This is a community meeting to regularly talk in open about important topics around AsyncAPI Initiative. We organize it every two weeks in different time zones."
                host="Lukasz Gornicki"
                hostProfile="https://github.com/derberg"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pijUwZJErzyYf_Rc-PWu4lXS" 
              />
            </div>
            <div className="pt-6">
              <Meeting
                name="Spec 3.0 Meeting"
                purpose="This is the meeting for community member involved in works related to 3.0 release of AsyncAPI Specification. We organize it every two weeks at the same time."
                host="Jonas Lagoni"
                hostProfile="https://github.com/jonaslagoni"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pihClJY-kXuTRRJ8n1awb0VV" 
              />
            </div>
          </div>
          <div>
            <div className="pt-6">
              <Meeting
                name="Thinking Out Loud"
                purpose="This is a live stream about different topics related to AsyncAPI Initiative and Event Driven Architectures. It is always an open discussion between a host and a guest."
                host="Fran Mendez"
                hostProfile="https://github.com/fmvilas"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPxRRylHGCvpdppYLmSKfJ" 
              />
            </div>
            <div className="pt-6">
              <Meeting
                name="Let's talk about contributing"
                purpose="This live stream focuses on contributors, focuses on people that want to contribute to AsyncAPI Initiative but do not know how to do it."
                host="Lukasz Gornicki"
                hostProfile="https://github.com/derberg"
                youtube="https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY" 
              />
            </div>
          </div>
        </div>
        <div className="pt-10 grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="pt-6 col-start-3 col-span-5">
            <Meeting
                name="Ad Hoc Meeting"
                purpose="Do you want to discuss something with community and other meeting formats won't work? This is what this meeting is for, to schedule something specific with the community."
                host="Anyone from the list of hosts of other meetings"
                youtube="https://www.youtube.com/asyncapi" 
              />
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}


