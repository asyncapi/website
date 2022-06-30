import Paragraph from '../typography/Paragraph';
import Heading from '../typography/Heading';
import articlesData from '../../config/articles.json';

export default function NewsroomArticle() {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-120 lg:w-full px-2 pb-4">
      {articlesData.map((article, index) => (
        <a
          className="block p-6 rounded-md mb-2 shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg lg:w-full text-left"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <div>
            <Paragraph typeStyle="body-sm" textColor="text-gray-600">{article.publishDate}</Paragraph>
            <Heading
              level="h4"
              typeStyle="heading-xs-semibold"
              className="mt-3"
            >
              {article.title}
            </Heading>
          </div>
        </a>
      ))}
    </div>
  );
}
