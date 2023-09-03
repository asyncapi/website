import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

function SuccessStories() {
    return (
        <div>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
                <div className="col-start-2 col-span-7 my-12">
                    <div className="mx-2">
                    <h1 id="success-stories" className="font-bold my-3 mx-3 text-4xl">
                        Success Stories
                    </h1>
                    <p className="my-3 max-w-4xl mx-auto text-md text-[#212526] text-center">
                        Thanks to financial support we can already see many success stories in
                        the project.
                    </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-xl font-bold">Community Manager</h1>
                            <p className="text-gray-600 text-sm">
                                With the addition of a dedicated Community Manager, we now have a monthly newsletter,
                                regular status updates, an active social media presence, and the ability to drive
                                initiatives such as event organization.
                            </p>
                        </div>
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-xl font-bold">AsyncAPI Mentorship</h1>
                            <p className="text-gray-600 text-sm">
                                The 2022 mentorship program yielded significant achievements: Kafka support in
                                Glee, a centralized platform for sharing AsyncAPI tools, and a versatile error
                                handling library for multiple projects.
                            </p>
                        </div>
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-xl font-bold">AsyncAPI Conference</h1>
                            <p className="text-gray-600 text-sm">
                                Every year we organize a conference that attracts many participants. Only last year
                                the conference generated <span><a href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl" target='_blank' style={{ color: "rgb(128,92,218)", fontWeight: 700, textDecoration: "underline" }}>3k views</a></span>. We
                                plan to do a series of events in different locations every year.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SuccessStories