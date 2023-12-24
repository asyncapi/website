import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

export default function ExpenseBreakdown() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-[#EFFAFE]">
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center mb-16">
                <div className="col-start-2 col-span-7 my-12">
                    <div className="mx-2">
                        <Heading className="my-3 mx-3 text-center text-base">
                            Expense Breakdown
                        </Heading>
                        <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto text-center text-darkGunMetal">
                            Funds from GitHub Sponsors are directly transferred to our AsyncAPI Open
                            Collective account. We maintain transparency in all expenses, and the TSC approves
                            anticipated expenses.
                        </Paragraph>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 mx-3">

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <a href='#mentorship-program'>
                                        <img src="/img/illustrations/MentorshipProgram.webp" alt="Mentorship Program" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                        <h2 className="text-2xl font-semibold my-2 text-center text-darkGunMetal">Mentorship Program</h2>
                                    </a>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">Our AsyncAPI Mentorship program offers paid guidance to develop valuable features, investing in tools and motivated individuals for community benefit.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <a href='#bounty-program'>
                                        <img src="/img/illustrations/BountyProgram.webp" alt="Bounty Program" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                        <h2 className="text-2xl text-center font-semibold my-2 text-darkGunMetal">Bounty Program</h2>
                                    </a>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">Rewarding contributors regardless of affiliation or volunteer status. Free mentoring and support for newcomers to build portfolios and unlock tech prospects.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <a href='#events'>
                                        <img src="/img/illustrations/Events.webp" alt="Events" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                        <h2 className="text-2xl text-center font-semibold my-2 text-darkGunMetal">Events</h2>
                                    </a>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">Supporting AsyncAPI conferences incurs costs for services and travel arrangements. Your contributions facilitate event hosting and community growth.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <a href='#swag-store'>
                                        <img src="/img/illustrations/SwagStore.webp" alt="Swag Store" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                        <h2 className="text-2xl font-semibold my-2 text-center text-darkGunMetal">Swag Store</h2>
                                    </a>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">Creating a swag store for seamless distribution to contributors, mentees, ambassadors, and community members. Store profits can fund complimentary swag expenses.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <a href='#hiring'>
                                        <img src="/img/illustrations/Hiring.webp" alt="Hiring" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                        <h2 className="text-2xl font-semibold my-2 text-center text-darkGunMetal">Hiring</h2>
                                    </a>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">To support our community, we a require full-time commitment. Open Collective helps us hire for AsyncAPI. <a style={{ textDecoration: "underline" }} href="https://www.linkedin.com/in/v-thulisile-sibanda/" target='_blank'>Thulie</a> joins as community manager, with plans to expand the team on our team.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
                            <div className="text-darkGunMetal">
                                <div className="flex flex-col items-center">
                                    <img src="/img/illustrations/Services.webp" alt="Services" className="w-1/5 h-auto object-cover rounded-md m-1" />
                                    <h2 className="text-2xl font-semibold my-2 text-center text-darkGunMetal">Services</h2>
                                </div>
                                <p className="text-base text-center text-darkGunMetal">Occasionally, we must pay for services such as Zoom or Descript, as they are not available through specific Open Source support programs.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}