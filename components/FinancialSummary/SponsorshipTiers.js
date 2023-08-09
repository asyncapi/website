import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function SponsorshipTiers() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16 bg-purple-100">
            <div className="col-start-2 col-span-7 my-12">
                <div id="sponsorship">
                <Heading level="h1" typeStyle="heading-md my-3 mx-3">
                    <h1 id="sponsorship-tiers" style={{ fontSize: '32px' }}>Sponsorship Tiers</h1>
                </Heading>

                <Paragraph typeStyle="body-md" className="my-3 max-w-4xl mx-auto" style={{ fontSize: '16px', color: '#212526', textAlign: 'center' }}>
                    AsyncAPI offers various sponsorship tiers, each with its own set
                    of benefits and privileges. These tiers include Bronze, Silver,
                    Gold, and Platinum.
                </Paragraph>
                </div>

                <div className="overflow-x-auto">
                    <div className="my-3 mx-3">
                        <table className="my-8 w-full max-w-full border-collapse border border-gray-500">
                            <thead style={{ backgroundColor: '#805CDA' }} className="text-lg text-white">
                                <tr>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6" style={{ fontSize: '24px' }}>Tiers</th>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6" style={{ fontSize: '24px' }}>Amounts</th>
                                    <th className="border border-gray-500 px-6 py-4 md:px-10 md:py-6" style={{ fontSize: '24px' }}>Benefits</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm" style={{ fontWeight: 400 }}>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>Bronze</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>$100/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left" style={{ fontSize: '16px', color: '#212526' }}>
                                        Company logo in README on GitHub
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>Silver</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>$500/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left" style={{ fontSize: '16px', color: '#212526' }}>
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>Gold</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>$1000/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left" style={{ fontSize: '16px', color: '#212526' }}>
                                        Company logo in README on GitHub and asyncapi.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>Platinum</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2" style={{ fontSize: '16px', color: '#212526' }}>$2000/month</td>
                                    <td className="border border-gray-500 px-6 py-2 md:px-10 md:py-2 text-left" style={{ fontSize: '16px', color: '#212526' }}>
                                        Company logo in README on GitHub and asyncapi.com.
                                        Up to 2 hours of support per month. Support will be
                                        remote with the option of a shared screen or via private chat.
                                        Support hours do not accumulate.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <style>
                        {`
            @media (max-width: 768px) {
              /* Add custom styles for mobile devices here */
              /* For example, you can reduce the font size or adjust the table layout */
              .text-lg {
                font-size: 14px;
              }
              .text-sm {
                font-size: 12px;
              }
              .px-6 {
                padding-left: 4px;
                padding-right: 4px;
              }
              .py-2 {
                padding-top: 2px;
                padding-bottom: 2px;
              }
              #sponsorship{
                margin-left:10px;
              }
            }
          `}
                    </style>
                </div>
            </div>
        </div>
    );
}

export default SponsorshipTiers