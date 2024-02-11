import TextLink from '../typography/TextLink'

export default function SuccessStories() {
    return (
        <div className="dark:bg-slate-700 px-4 sm:px-6 lg:px-8 bg-purple-100">
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16">
                <div className="col-start-2 col-span-7 my-12">
                    <div className="mx-2">
                    <h1 id="success-stories" className="font-bold text-center my-3 mx-3 text-4xl">
                        Success Stories
                    </h1>
                    <p className="dark:text-gray-600 my-3 max-w-4xl mx-auto text-lg text-darkGunMetal text-center">
                        Thanks to financial support we can already see many<br className="hidden lg:inline-block" /> success stories in
                        the project.
                    </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-2xl font-semibold">Community Manager</h1>
                            <p className="dark:text-gray-600 text-base text-darkGunMetal">
                                With the addition of a dedicated Community Manager, we now have a monthly newsletter,
                                regular status updates, an active social media presence, and the ability to drive
                                initiatives such as event organization. Dedicated focus enables us to also focus on  <TextLink href='https://github.com/orgs/asyncapi/discussions/948' target='_blank' className='text-violet'>a year to year vision</TextLink>.
                            </p>
                        </div>
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-2xl font-semibold">AsyncAPI Mentorship</h1>
                            <p className="dark:text-gray- text-base text-darkGunMetal">
                                The 2022 mentorship program yielded significant achievements: Kafka support in
                                Glee, a centralized platform for sharing AsyncAPI tools, and a versatile error
                                handling library for multiple projects.
                            </p>
                        </div>
                        <div className="m-4 p-2">
                            <h1 className="mb-2 text-2xl font-semibold">AsyncAPI Conference</h1>
                            <p className="dark:text-gray-600 text-base text-darkGunMetal">
                                Every year we organize a conference that attracts many participants. In 2022
                                the online conference generated <TextLink href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl" target='_blank' className='text-violet'>3k views</TextLink>. In 2023 we organized <TextLink href="https://conference.asyncapi.com" target='_blank' className='text-violet'>four different in person events</TextLink>, some that was also live streamed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}