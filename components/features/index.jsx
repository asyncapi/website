import Heading from "../typography/Heading";
import Paragraph from "../typography/Paragraph";
import TextLink from "../typography/TextLink";
import Link from 'next/link'
import { features } from "./FeatureList";
import { useTranslation } from "../../lib/i18n";

export default function Features() {

  const { t } = useTranslation('landing-page');

  return (
    <section className="relative bg-white pt-16">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <Heading
          level="h2"
          typeStyle="heading-lg"
          className="mt-2"
        >
          {t('features.title')}
        </Heading>
        <Paragraph className="mt-2 max-w-prose mx-auto">
          {t('features.description')}
        </Paragraph>
        <div className="mt-12 text-left">
          <ul className="grid  grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="Feature-ul">
            {features.map((feature) => (
              <li key={feature.name} className="flex flex-col justify-between border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg px-6 pb-8"
                data-testid="Feature-li">
                <div >
                  <Heading
                    level="h3"
                    typeStyle="heading-md-semibold"
                    className="mt-8"

                  >
                    {feature.name}
                  </Heading>
                  {feature.description && (
                    <Paragraph typeStyle="body-md" className="mt-5">
                      {feature.description}
                    </Paragraph>
                  )}
                </div>
                <div className="flex justify-between" >
                  {feature.links.map((link) => {
                    return (
                      <Link href={link.href} key={link.label}>
                        <TextLink id={link.id} href={link.href} className="mt-6 inline-block">
                          {link.label}
                        </TextLink>
                      </Link>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
