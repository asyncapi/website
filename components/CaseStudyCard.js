import Paragraph from './typography/Paragraph';

export default function CaseStudyCard({ 
  studies = []
}) {
    if(studies.length === 0){
      return null;
    }
    return (
      <div className="pt-10 grid lg:grid-cols-3 lg:gap-8 lg:text-center">
        {studies.map((study, index) => (
          <a key={index} href={`casestudies/${study.id}`}>
            <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4">
              <span className="inline-block mr-2">                  
                <a href={study.company.website} target='_blank' rel='noopener noreferrer'>
                  <img
                    className="inline-block sm:h-16"
                    src={study.company.logo}
                    alt={study.company.name}
                  />
                </a>
              </span>
              <Paragraph typeStyle="body-md" className="my-4">
                  { study.company.description }
              </Paragraph>
            </div>
          </a>
        ))}
      </div>
    );
}
