import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function SponsorshipTiers() {
    return (
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center mt-16 bg-purple-100">
            <div className="col-start-2 col-span-7 my-12">
                <div id="sponsorship">
                    <Heading level="h1" typeStyle="heading-md my-3 mx-3">
                        <h1 id="sponsorship-tiers" className="text-4xl">Sponsorship Tiers</h1>
                    </Heading>

                    <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto text-base text-[#212526]">
                        AsyncAPI offers various sponsorship tiers, each with its own set
                        of benefits and privileges. These tiers include Bronze, Silver,
                        Gold, and Platinum.
                    </Paragraph>
                </div>

                <div className="overflow-x-auto">
                    <div className="my-3 mx-3">
                        <table className="my-8 w-full max-w-full border-collapse border border-gray-500">
                            <thead className="bg-[#805CDA] text-lg text-white">
                                <tr>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6 text-2xl">Tiers</th>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6 text-2xl">Amounts</th>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6 text-2xl">Benefits</th>
                                </tr>

                            </thead>

                            <tbody className="text-sm font-normal">
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">Bronze</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">$100/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left text-base text-[#212526]">
                                        Company logo in README on GitHub
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">Silver</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">$500/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left text-base text-[#212526]">
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">Gold</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">$1000/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left text-base text-[#212526]">
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">Platinum</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-base text-[#212526]">$2000/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left text-base text-[#212526]">
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