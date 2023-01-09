import useSWR from "swr";

export default function Home() {
  const { data: articles } = useSWR("/api/articles", (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <article>
              <h2>{article.name}</h2>
              <div>
                <h3>Categories</h3>
                <ul>
                  {article.categories.map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
