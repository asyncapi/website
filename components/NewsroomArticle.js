import articlesData from '../config/articles.json';
import Paragraph from './typography/Paragraph';
import Heading from './typography/Heading';

export default function NewsroomArticle() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-120 lg:w-full">
      {articlesData.map((article, index) => (
        <a
          className="block p-6 rounded-md shadow-md border-2 border-gray-100 transition-all duration-300 ease-in-out lg:w-full text-left"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <Paragraph typeStyle="body-md" className="">
            <div className="text-gray-400 text-sm">{article.publishDate}</div>
            <Heading
              level="h4"
              typeStyle="heading-xs-semibold"
              className="mt-3"
            >
              {article.title}
            </Heading>
          </Paragraph>
        </a>
      ))}
    </div>
  );
}
