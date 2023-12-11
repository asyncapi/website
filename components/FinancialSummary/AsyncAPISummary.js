import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

export default function AsyncAPISummary() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8 mx-4">
                <div className="col-start-3 col-span-5">
                    <Heading level="h2" className="text-5xl text-center my-3 mx-3">
                        AsyncAPI Financial Summary
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-1 max-w-4xl text-darkGunMetal">
                        To help improve the current state of Event-Driven Architectures and their tooling, you can show your support for
                        the AsyncAPI Initiative by making a financial contribution. We offer three donation options: <strong>Open Collective, GitHub
                            Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are managed through Open Collective and GitHub Sponsors,
                        while Linux Foundation Crowdfunding operates separately.
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-center mb-20">
                <Button
                    text="Become a Sponsor"
                    href="https://opencollective.com/asyncapi#category-CONTRIBUTE"
                    target='_blank'
                />
            </div>
            <div className="text-center text-sm mt-4">
                <Heading level="h1" typeStyle="heading-md" className="4xl">
                    Ways to Support Us?
                </Heading>
            </div>
            <div className="text-center my-4 text-base max-width text-darkGunMetal">
                <Paragraph typeStyle="body-sm" className="my-4">
                    The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br class="hidden lg:inline-block"></br>there are alternative options,
                    they may involve greater effort. Contribute <br class="hidden lg:inline-block"></br>monetarily using the following channels.
                </Paragraph>
            </div>

            <div className="text-center">
                <a href="https://opencollective.com/asyncapi" target='_blank'>
                    <img className="mx-4 inline w-10 h-10 transform transition-transform hover:scale-110 active:scale-90" src="/img/logos/OpenCollective.svg" alt="Open Collective" />
                </a>
                <a href="https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc" target='_blank'>
                    <img className="mx-4 inline w-10 h-10 transform transition-transform hover:scale-110 active:scale-90" src="/img/logos/LFX.svg" alt="Linux Foundation" />
                </a>
                <a href="https://github.com/sponsors/asyncapi" target='_blank'>
                    <img className="mx-4 inline w-10 h-10 transform transition-transform hover:scale-110 active:scale-90" src="/img/logos/github-black.svg" alt="Github" />
                </a>
            </div>

        </div>
    );
}