import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

export default function OtherFormsComponent() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center">
                <div className="col-start-2 col-span-7 my-12">
                    <div className="mx-2">
                        <Heading className="mt-10 mb-5 mx-3 text-center text-base">
                            Other Forms Of Financial Support
                        </Heading>
                        <Paragraph typeStyle="body-md" className="mb-3 max-w-4xl mx-auto text-center text-darkGunMetal">
                            You can also support AsyncAPI initiative by getting<br className="hidden lg:inline-block"></br> involved through employment, providing services and<br className="hidden lg:inline-block"></br> organizing events
                        </Paragraph>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 mx-3">
                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center text-center">
                            <img src="/img/illustrations/EmployeeInvolvement.webp" alt="Employee involvement" className="w-1/3 h-auto object-cover m-2" />
                            <h2 className="text-2xl font-semibold my-2">Employee involvement</h2>
                            <p className="text-base text-darkGunMetal mt-1 mx-2">
                                Assign your employees to contribute to projects under the AsyncAPI Initiative on a regular basis, and we'll welcome them as new maintainers.
                            </p>
                        </div>

                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center text-center">
                            <img src="/img/illustrations/ServiceProvision.webp" alt="Service provision" className="w-1/3 h-auto object-cover m-2" />
                            <h2 className="text-2xl font-semibold my-2">Service provision</h2>
                            <p className="text-base text-darkGunMetal mt-1 mx-2">
                                AsyncAPI Initiative relies on numerous tools, many of which incur costs. Your organization can provide services such as hosting or storage to support our efforts.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center text-center">
                            <img src="/img/illustrations/EventOrganization.webp" alt="Event organization" className="w-1/3 h-auto object-cover m-2" />
                            <h2 className="text-2xl font-semibold my-2">Event organization</h2>
                            <p className="text-base text-darkGunMetal mt-1 mx-2">
                                Host AsyncAPI conferences by sponsoring and organizing events under the AsyncAPI brand at your provided venue.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}