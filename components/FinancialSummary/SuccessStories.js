import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function SuccessStories() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
                <div className="col-start-2 col-span-7 my-12">
                    <div id="success">
                    <Heading level="h1" typeStyle="heading-md my-3 mx-3">
                        <h1 id="success-stories" style={{ fontSize: '32px' }}>Success Stories</h1>
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto" style={{ fontSize: '26px', color: '#212526', textAlign: 'center' }}>
                        Thanks to financial support we can already see many success stories in
                        the project.
                    </Paragraph>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div className="m-4 p-2">
                            <Heading level="h6" typeStyle="heading-sm" className="mb-2" style={{ fontSize: '16px'}}>Community Manager</Heading>
                            <Paragraph typeStyle="body-sm" className="text-gray-600" style={{ fontSize: '16px', color: '#212526' }}>
                                With the addition of a dedicated Community Manager, we now have a monthly newsletter,
                                regular status updates, an active social media presence, and the ability to drive
                                initiatives such as event organization.
                            </Paragraph>
                        </div>
                        <div className="m-4 p-2">
                            <Heading level="h6" typeStyle="heading-sm" className="mb-2" style={{ fontSize: '16px' }}>AsyncAPI Mentorship</Heading>
                            <Paragraph typeStyle="body-sm" className="text-gray-600" style={{ fontSize: '16px', color: '#212526' }}>
                                The 2022 mentorship program yielded significant achievements: Kafka support in
                                Glee, a centralized platform for sharing AsyncAPI tools, and a versatile error
                                handling library for multiple projects.
                            </Paragraph>
                        </div>
                        <div className="m-4 p-2">
                            <Heading level="h6" typeStyle="heading-sm" className="mb-2" style={{ fontSize: '16px'}}>AsyncAPI Conference</Heading>
                            <Paragraph typeStyle="body-sm" className="text-gray-600" style={{ fontSize: '16px', color: '#212526' }}>
                                Every year we organize a conference that attracts many participants. Only last year
                                the conference generated <span><a href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl" target='_blank' style={{ color: "rgb(128,92,218)", fontWeight: 700, textDecoration: "underline" }}>3k views</a></span>. We
                                plan to do a series of events in different locations every year.
                            </Paragraph>
                        </div>
                    </div>

                </div>
            </div>
            <style>
                        {`
            @media (max-width: 768px) {
              #success{
                margin-left:10px;
              }
            `}
            </style>
        </>
    )
}

export default SuccessStories