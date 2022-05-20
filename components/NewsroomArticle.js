import articlesData from "../config/articles.json"

export default function NewsroomArticle() {
    return (
        <div className="flex flex-col gap-3 overflow-y-auto max-h-120 mx-auto w-fit">
            {
                articlesData.map((article, index) => (
                    <a className="block px-4 py-6 rounded-md shadow border-2 border-gray-100 hover:border-gray-400 w-72 lg:w-96 md:mx-2 text-left" href={article.url} key={index}>
                        <div className="text-gray-400 text-sm">
                            {article.publishDate}
                        </div>
                        <div className="mt-2 text-base font-semibold">
                            {article.title}
                        </div>
                    </a>
                ))
            }
        </div>
    )
}
