import Button from '../buttons/Button'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function ContactUs() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-16">
                <div className="col-start-3 col-span-5">
                    <div id="contact">
                    <Heading level="h1" typeStyle="heading-md"><h1 id="contact-us">Interested in getting in touch?</h1></Heading>
                    <Paragraph typeStyle="body-sm" className="my-2 max-w-4xl">
                        Feel free to contact us if you need more explanation. We are happy to hop on a call and help with
                        onboarding to the project as a sponsor. Write email to <span><a style={{ color: "#8054F2", fontWeight: 900 }} href="mailto:info@asyncapi.io" target='_blank'>info@asyncapi.io</a></span>
                    </Paragraph>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    text="Contact Us"
                    href="mailto:info@asyncapi.io"
                    target='_blank'
                />
            </div>
            <style>
                        {`
            @media (max-width: 768px) {
              #contact{
                margin-left:10px;
              }
            `}
            </style>
        </>
    )
}

export default ContactUs