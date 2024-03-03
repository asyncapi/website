import GenericLayout from '../../../components/layout/GenericLayout';
import GithubButton from '../../../components/buttons/GithubButton';

import {
    DocumentAddIcon,
    BadgeCheckIcon,
    GlobeIcon,
    CodeIcon,
} from '@heroicons/react/outline';

import CodeBlock from '../../../components/editor/CodeBlock';
import Heading from '../../../components/typography/Heading';
import Paragraph from '../../../components/typography/Paragraph';
import DocsButton from '../../../components/buttons/DocsButton';
import Button from '../../../components/buttons/Button';
import {
    getAllLanguageSlugs,
    getLanguage, useTranslation
} from '../../../lib/i18n';

const features = [
    {
        name: 'cli.features.new-files.name',
        description: () => {
            const { t } = useTranslation('tools');
            return t("cli.features.new-files.description");
        },
        icon: DocumentAddIcon,
    },
    {
        name: 'cli.features.validate.name',
        description: () => {
            const { t } = useTranslation('tools');
            return t("cli.features.validate.description");
        },
        icon: BadgeCheckIcon,
    },
    {
        name: 'cli.features.open-studio.name',
        // eslint-disable-next-line react/display-name
        description: () => {
            const { t } = useTranslation('tools');
            return (
                <>
                    {t("cli.features.open-studio.description_pretext")}{' '}
                    <code className=" px-1 py-0.5 bg-gray-200 text-gray-900 rounded font-mono text-sm">
                        asyncapi start studio
                    </code>{' '}
                    {t("cli.features.open-studio.description_posttext")}
                </>)
        },
        icon: CodeIcon,
    },
    {
        name: 'cli.features.open-source.name',
        description: () => {
            const { t } = useTranslation('tools');
            return t("cli.features.open-source.description");
        },
        icon: GlobeIcon,
    },
];

export default function CliPage() {

    const { t } = useTranslation('tools');

    function renderButtons() {
        return (
            <div className="mt-8">
                <GithubButton
                    className="block mt-2 md:mt-0 md:inline-block w-full sm:w-auto"
                    href="https://www.github.com/asyncapi/cli"
                />
                <Button text={t("cli.docsButton")} href="/docs/tools/cli" className="ml-2 block mt-2 md:mt-0 md:inline-block w-full sm:w-auto" />
            </div>
        );
    }

    const description =
        'cli.description';
    const image = '/img/social/cli-card.jpg';

    const getPkgCode = () => {
        return `# Download latest PKG file\ncurl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg\n# Install application on MacOS\nsudo installer -pkg asyncapi.pkg -target /`;
    };

    const setUpWin = () => {
        return `# Download latest asyncapi.x64.exe for 64-bit Windows\n https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x64.exe\n# Download asyncapi.x86.exe for 32-bit Windows\n https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x86.exe`;
    };

    const setUpLinux = () => {
        return `# For Debian based distros, you can install the AsycAPI CLI using the dpkg package manager for Debian\ncurl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb\n# To download a specific release of the CLI, run this command in your terminal\ncurl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb /`;
    };


    return (
        <GenericLayout title="CLI" description={description} image={image} wide>
            <div className="py-12 overflow-hidden">
                <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
                    <div className="relative">
                        <Heading level="h1" typeStyle="heading-lg" className="text-center">
                            <span className="hidden md:block">
                                {t("cli.title")}
                            </span>
                            <span className="md:hidden">AsyncAPI CLI</span>
                        </Heading>
                        <Paragraph className="mt-4 max-w-3xl mx-auto text-center">
                            {t(description)}
                        </Paragraph>
                    </div>

                    <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div className="relative lg:mt-8">
                            <Heading level="h4" typeStyle="heading-md-semibold">
                                {t("cli.installationTitle")}
                            </Heading>
                            <Paragraph className="mt-3 lg:pr-4">
                                {t("cli.installationDescription")}
                            </Paragraph>
                            {renderButtons()}
                        </div>

                        <div className="relative w-full mt-8 mx-auto space-y-10">
                            <div>
                                <Heading level="h3" typeStyle="heading-sm-semibold" className="mb-4 text-center md:text-left">
                                    {t("cli.installingTitle")}
                                </Heading>
                                <CodeBlock
                                    language="generator-cli"
                                    textSizeClassName="text-sm"
                                    className="shadow-lg"
                                    codeBlocks={[
                                        {
                                            language: 'npm',
                                            code: `npm install -g @asyncapi/cli`,
                                        },
                                        {
                                            language: 'brew',
                                            code: `brew install asyncapi`
                                        },
                                        {
                                            language: '.pkg',
                                            code: getPkgCode()
                                        },
                                        {
                                            language: 'windows',
                                            code: setUpWin()
                                        },
                                        {
                                            language: 'linux',
                                            code: setUpLinux()
                                        }
                                    ]}
                                />
                            </div>

                            <div>
                                <Heading level="h3" typeStyle="heading-sm-semibold" className="text-center md:text-left">
                                    {t("cli.exampleTitle")}
                                </Heading>
                                <div className="space-y-5">
                                    <div>
                                        <Paragraph typeStyle="body-md" className="mb-4">
                                            {t("cli.exampleDescription")}
                                        </Paragraph>
                                        <CodeBlock
                                            language="generator-cli"
                                            textSizeClassName="text-sm"
                                            className="shadow-lg"
                                            codeBlocks={[
                                                {
                                                    language: 'npm',
                                                    code: `asyncapi new`,
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:py-12 bg-white mt-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <Heading level="h2" typeStyle="heading-md-semibold">
                                    {t("cli.featuresTitle")}
                                </Heading>
                                <Paragraph className="mt-3 text-center lg:pr-4 max-w-lg mx-auto">
                                    {t("cli.featuresDescription")}
                                </Paragraph>
                            </div>

                            <div className="mt-10">
                                <dl className=" md:grid lg:grid-cols-2 lg:space-y-0">
                                    {features.map(({ description: Description, ...feature }) => (
                                        <div key={feature.name} className="relative mb-10">
                                            <dt>
                                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 text-gray-900 border border-gray-900">
                                                    <feature.icon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <Heading level="h4" typeStyle="heading-sm-semibold" className="ml-16">
                                                    {t(feature.name)}
                                                </Heading>
                                            </dt>
                                            <dd className="mt-2 ml-16 pr-10">
                                                <Paragraph typeStyle="body-md">
                                                    <Description />
                                                </Paragraph>
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 text-center">{renderButtons()}</div>
                </div>
            </div>
        </GenericLayout>
    );
}

export async function getStaticPaths() {
    const paths = getAllLanguageSlugs();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const language = getLanguage(params.lang);
    return {
        props: {
            language,
        },
    };
}
