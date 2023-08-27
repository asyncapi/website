import Container from '../layout/Container'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function OtherFormsOfFinancialSupport() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    return (
        <Container wide>
            <div className="flex flex-wrap lg:justify-center lg:items-start my-8">
                <div className="flex sm:flex-col gap-2 flex-row">
                    <img className="mx-6 my-7 hidden lg:block" src="/img/finance/other_1.webp" alt="Image 1" width="100px" height="100px" />
                    <img className="mx-6 my-7 hidden lg:block" src="/img/finance/other_2.webp" alt="Image 2" width="100px" height="100px" />
                    <img className="mx-6 my-7 hidden lg:block" src="/img/finance/other_3.webp" alt="Image 3" width="100px" height="100px" />
                </div>


                <div className="flex flex-col gap-4 max-w-4xl lg:w-3/5">
                    <div className="my-2">
                        <Heading level="h1" typeStyle="heading-md"><h1 id="financial-support">Other forms of financial support</h1></Heading>
                    </div>

                    <div className="my-2">
                        <Heading level="h2" typeStyle="heading-sm">Employee involvement</Heading>
                        <Paragraph typeStyle="body-md" className="my-2">
                            Assign your employees to contribute to projects under the AsyncAPI Initiative
                            on a regular basis, and we'll welcome them as new maintainers. You can
                            also provide direct assistance to a member of the <span style={{color:"rgb(128,92,218)", fontWeight:700}}>Technical Steering Committee</span>
                            (TSC) through contracts or employment for specific tasks.
                        </Paragraph>
                    </div>

                    <div className="my-2">
                        <Heading level="h2" typeStyle="heading-sm">Event organization</Heading>
                        <Paragraph typeStyle="body-md" className="my-2">
                            Host AsyncAPI conferences by sponsoring and organizing events under the AsyncAPI
                            brand at your provided venue.
                        </Paragraph>
                    </div>

                    <div className="my-2">
                        <Heading level="h2" typeStyle="heading-sm">Service provision</Heading>
                        <Paragraph typeStyle="body-md" className="my-2">
                            AsyncAPI Initiative relies on numerous tools, many of which incur costs. Your
                            organization can provide services such as hosting or storage to support our efforts.
                        </Paragraph>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default OtherFormsOfFinancialSupport