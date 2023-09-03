import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

function AsyncAPISummary() {
    return (
        <div>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8 mx-4">
                <div className="col-start-3 col-span-5">
                    <Heading level="h2" className="text-5xl my-3 mx-3">
                        AsyncAPI Financial Summary
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-4 max-w-4xl text-[#212526]">
                        To help improve the current state of Event-Driven Architectures and their tooling, you can show your support for
                        the AsyncAPI Initiative by making a financial contribution. We offer three donation options: <strong>Open Collective, GitHub
                            Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are managed through Open Collective and GitHub Sponsors,
                        while Linux Foundation Crowdfunding operates separately.
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-center my-1">
                <Button
                    text="Become a Sponsor"
                    href="https://opencollective.com/asyncapi#category-CONTRIBUTE"
                    target='_blank'
                />
            </div>
            <hr className="my-12 border-t border-gray-300" />
            <div className="text-center text-sm">
                <Heading level="h1" typeStyle="heading-md" className="4xl">
                    Ways to Support Us?
                </Heading>
            </div>
            <div className="text-center my-4 text-sm max-width text-[#212526]">
                <Paragraph typeStyle="body-sm" className="my-4">
                    The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br />there are alternative options,
                    they may involve greater effort. Contribute <br />monetarily using the following channels.
                </Paragraph>
            </div>

            <div className="text-center">
                <a href="https://opencollective.com/asyncapi" target='_blank'>
                    <img className="mx-2 inline w-15 h-10" src="/img/finance/OpenCollective.webp" alt="Open Collective" />
                </a>
                <a href="https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc" target='_blank'>
                    <img className="mx-2 inline w-15 h-10" src="/img/finance/LFX.webp" alt="Linux Foundation" />
                </a>
                <a href="https://github.com/sponsors/asyncapi" target='_blank'>
                    <img className="mx-2 inline w-15 h-10" src="/img/finance/GitHub.webp" alt="Github" />
                </a>
            </div>
        </div>
    );
}

export default AsyncAPISummary