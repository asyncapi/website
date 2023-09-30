import Paragraph from './typography/Paragraph';

export default function CaseStudyCard({ 
  studies = []
}) {
    if(studies.length === 0){
      return null;
    }
    return (
      <div className="pt-10 flex flex-wrap lg:grid lg:grid-cols-3 lg:gap-8 lg:text-center">
        {studies.map((study, index) => (
          <a key={index} href={`casestudies/${study.id}`}>
            <div className="rounded-md border border-gray-200 overflow-hidden bg-white p-4 max-w-sm" data-testid="CaseStudyCard-main">
              <span className="mr-2">                  
                  <img
                    className="m-auto h-16"
                    src={study.company.logo}
                    alt={study.company.name}
                  />
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
