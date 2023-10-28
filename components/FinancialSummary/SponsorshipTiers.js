import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function SponsorshipTiers() {
    return (
        <div className="grid lg:grid-cols-9 lg:gap-8 px-4 sm:px-6 lg:px-8 lg:text-center mt-16 bg-purple-100">
            <div className="col-start-2 col-span-7 my-12">
                <div id="sponsorship" className="mx-2">
                    <Heading level="h1" typeStyle="heading-md my-3 mx-3">
                        <h1 id="sponsorship-tiers" className="text-4xl">Sponsorship Tiers</h1>
                    </Heading>

                    <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto text-base text-darkGunMetal">
                        AsyncAPI offers various sponsorship tiers, each with its own set <br class="hidden lg:inline-block"></br>
                        of benefits and privileges. These tiers include Bronze, Silver,<br class="hidden lg:inline-block"></br>
                        Gold, and Platinum.
                    </Paragraph>
                </div>

                <div className="overflow-x-auto">
                    <div className="my-3 mx-3">
                        <table className="my-8 w-full max-w-full border-collapse border border-gray-500">
                            <thead className="bg-[#805CDA] text-lg text-white">
                                <tr>
                                    <th className="border border-gray-500 md:px-6 md:py-4 md:px-10 md:py-6 md:text-2xl">Tiers</th>
                                    <th className="border border-gray-500 md:px-6 md:py-4 md:px-10 md:py-6 md:text-2xl">Amounts</th>
                                    <th className="border border-gray-500 md:px-6 md:py-4 md:px-10 md:py-6 md:text-2xl">Benefits</th>
                                </tr>

                            </thead>

                            <tbody className="text-sm font-normal">
                                <tr>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal text-left">Bronze</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal">$100/month</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 text-left md:text-base text-darkGunMetal">
                                        Company logo in README on GitHub
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal text-left">Silver</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal">$500/month</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 text-left md:text-base text-darkGunMetal">
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal text-left">Gold</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal">$1000/month</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-left text-base text-darkGunMetal">
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal">Platinum</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 md:text-base text-darkGunMetal">$2000/month</td>
                                    <td className="border border-gray-500 p-2 md:px-6 md:py-2 md:px-10 md:py-4 text-left md:text-base text-darkGunMetal">
                                        Company logo in README on GitHub and asyncapi.com.
                                        Up to 2 hours of support per month. Support will be
                                        remote with the option of a shared screen or via private chat.
                                        Support hours do not accumulate.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SponsorshipTiers