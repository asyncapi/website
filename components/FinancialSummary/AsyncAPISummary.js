import Button from '../buttons/Button'
import Heading from "../typography/Heading"
import Paragraph from '../typography/Paragraph'

function AsyncAPISummary() {
    return (
        <>
            <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center my-8">
                <div className="col-start-3 col-span-5">
                    <div id="fin">
                    <Heading level="h2" typeStyle="heading-md my-3 mx-3">
                        <h1 style={{ fontSize: '42px'}}>AsyncAPI Financial Summary</h1>
                    </Heading>
                    <Paragraph typeStyle="body-md" className="my-4 max-w-4xl " style={{ color: "#212526" }}>
                        To help improve the current state of Event-Driven Architectures and their tooling, you can show your support for
                        the AsyncAPI Initiative by making a financial contribution. We offer three donation options: <strong>Open Collective, GitHub
                            Sponsors, and Linux Foundation Crowdfunding</strong>. Our expenses are managed through Open Collective and GitHub Sponsors,
                        while Linux Foundation Crowdfunding operates separately.
                    </Paragraph>
                    </div>
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
                <Heading level="h1" typeStyle="heading-md" style={{ fontSize: '32px' }}>
                    Ways to Support Us?
                </Heading>
            </div>
            <div className="text-center my-4 text-sm max-width" style={{ color: '#212526' }}>
                <Paragraph typeStyle="body-md" className="my-4" style={{ fontSize: '16px' }}>
                    The easiest way to support AsyncAPI is by becoming a financial sponsor. While <br />there are alternative options,
                    they may involve greater effort. Contribute <br />monetarily using the following channels.
                </Paragraph>
            </div>

            <div className="text-center">
                <a href="https://opencollective.com/asyncapi" target='_blank'>
                    <img className="mx-2 inline" src="/img/finance/OpenCollective.webp" alt="Open Collective" width="65px" height="65px" />
                </a>
                <a href="https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc" target='_blank'>
                    <img className="mx-2 inline" src="/img/finance/LFX.webp" alt="Linux Foundation" width="50px" height="50px" />
                </a>
                <a href="https://github.com/sponsors/asyncapi" target='_blank'>
                    <img className="mx-2 inline" src="/img/finance/GitHub.webp" alt="Github" width="60px" height="60px" />
                </a>
            </div>
            <style>
                        {`
            @media (max-width: 768px) {
              #fin{
                margin:7px;
              }
            `}
            </style>
        </>
    );
}

export default AsyncAPISummary