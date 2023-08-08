import Button from '../buttons/Button'
import Container from '../layout/Container'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function ContactUs() {
    return (
        <Container wide>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16">
                <div className="col-start-3 col-span-5">
                    <Heading level="h1" typeStyle="heading-md">Interested in getting in touch?</Heading>
                    <Paragraph typeStyle="body-sm" className="my-2 max-w-4xl">
                        Feel free to contact us if you need more explanation. We are happy to hop on a call and help with
                        onboarding to the project as a sponsor. Write email to <span style={{ color: "#8054F2", fontWeight: 900 }}>info@asyncapi.io.</span>
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    text="Contact Us"
                    href="#"
                />
            </div>
        </Container>
    )
}

export default ContactUs