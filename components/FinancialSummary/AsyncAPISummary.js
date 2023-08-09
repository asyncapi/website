import Button from '../buttons/Button'
import Container from '../layout/Container'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function AsyncAPISummary() {
    return (
        <Container wide>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8">
                <div className="col-start-3 col-span-5">
                <Heading level="h1" typeStyle="heading-md my-3 mx-3" style={{ fontSize: '48px' }}>
                        <h1>AsyncAPI Financial Summary</h1>
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-4 max-w-4xl">
                        To help improve the current state of Event-Driven Architectures and their tooling, you can show your support for
                        the AsyncAPI Initiative by making a financial contribution. We offer three donation options: <strong>Open Collective, GitHub
                            Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are managed through Open Collective and GitHub Sponsors,
                        while Linux Foundation Crowdfunding operates separately.
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-center my-4">
                <Button
                    text="Become a Sponsor"
                    href="https://opencollective.com/asyncapi#category-CONTRIBUTE"
                />
            </div>
            <hr className="my-12 border-t border-gray-300" />
            <div className="text-center text-sm">
                <Heading level="h1" typeStyle="heading-md">Ways to Support Us?</Heading>
            </div>
            <div className="text-center my-4 text-sm max-width">
                <Paragraph typeStyle="body-md" className="my-4">
                    The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br />there are alternative options,
                    they may involve greater effort. Contribute <br />monetarily using the following channels.
                </Paragraph>
            </div>
            <div className="text-center">
                <a href="https://opencollective.com/asyncapi">
                    <img className="mx-2 inline" src="/img/finance/OpenCollective.png" alt="Open Collective" width="60px" height="60px" />
                </a>
                <a href="https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc">
                    <img className="mx-2 inline" src="/img/finance/LFX.png" alt="Linux Foundation" width="50px" height="50px" />
                </a>
                <a href="https://github.com/sponsors/asyncapi">
                    <img className="mx-2 inline" src="/img/finance/GitHub.png" alt="Github" width="60px" height="60px" />
                </a>
            </div>

        </Container>
    );
}

export default AsyncAPISummary