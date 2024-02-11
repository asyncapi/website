import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import TextLink from '../typography/TextLink'

export default function ContactUs() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-4">
                <div className="col-start-3 col-span-5">
                    <div className="mx-2">
                    <Heading level="h1" typeStyle="heading-lg">Interested in getting in touch?</Heading>
                    <Paragraph typeStyle="body-md" className="my-2 max-w-4xl">
                        Feel free to contact us if you need more explanation. We are happy to hop on a call and help with
                        onboarding to the project as a sponsor. Write email to <span><TextLink className="text-violet text-base font-semibold dark:hover:text-white" href="mailto:info@asyncapi.io" target='_blank'>info@asyncapi.io</TextLink></span>
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
        </div>
    )
}