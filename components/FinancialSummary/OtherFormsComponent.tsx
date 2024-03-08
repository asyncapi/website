import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

const OtherFormsComponent: React.FC = () => {
  return (
    <div className='bg-[#F5F5F5] px-4 sm:px-6 lg:px-8'>
      <div className='grid lg:grid-cols-9 lg:gap-8 lg:text-center'>
        <div className='col-span-7 col-start-2 my-12'>
          <div className='mx-2'>
            <Heading className='mx-3 mb-5 mt-10 text-center text-base'>
                            Other Forms Of Financial Support
            </Heading>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mb-3 max-w-4xl text-center text-darkGunMetal'>
                            You can also support AsyncAPI initiative by getting<br className='hidden lg:inline-block'></br> involved through employment, providing services and<br className='hidden lg:inline-block'></br> organizing events
            </Paragraph>
          </div>
          <div className='mx-3 mt-8 grid grid-cols-1 gap-10 md:grid-cols-3'>
            <div className='flex flex-col items-center rounded-md bg-white p-4 text-center shadow-md'>
              <img src='/img/illustrations/EmployeeInvolvement.webp' alt='Employee involvement' className='m-2 h-auto w-1/3 object-cover' />
              <h2 className='my-2 text-2xl font-semibold'>Employee involvement</h2>
              <p className='mx-2 mt-1 text-base text-darkGunMetal'>
                                Assign your employees to contribute to projects under the AsyncAPI Initiative on a regular basis, and we&apos;ll welcome them as new maintainers.
              </p>
            </div>

            <div className='flex flex-col items-center rounded-md bg-white p-4 text-center shadow-md'>
              <img src='/img/illustrations/ServiceProvision.webp' alt='Service provision' className='m-2 h-auto w-1/3 object-cover' />
              <h2 className='my-2 text-2xl font-semibold'>Service provision</h2>
              <p className='mx-2 mt-1 text-base text-darkGunMetal'>
                                AsyncAPI Initiative relies on numerous tools, many of which incur costs. Your organization can provide services such as hosting or storage to support our efforts.
              </p>
            </div>

            <div className='flex flex-col items-center rounded-md bg-white p-4 text-center shadow-md'>
              <img src='/img/illustrations/EventOrganization.webp' alt='Event organization' className='m-2 h-auto w-1/3 object-cover' />
              <h2 className='my-2 text-2xl font-semibold'>Event organization</h2>
              <p className='mx-2 mt-1 text-base text-darkGunMetal'>
                                Host AsyncAPI conferences by sponsoring and organizing events under the AsyncAPI brand at your provided venue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherFormsComponent;
