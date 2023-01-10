import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

export default function Home() {
  const { data: articles, isLoading, error } = useSWR("/api/articles");

  // if (isLoading) return null;
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <h1>Articles</h1>
      <ul>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          articles.map((article) => (
            <li key={article.id}>
              <article>
                <Link href={`/articles/${article.id}`}>
                  <h2>{article.name}</h2>
                </Link>
                <div>
                  <h3>Categories</h3>
                  <UnbulletedList>
                    {article.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </UnbulletedList>
                </div>
              </article>
            </li>
          ))
        )}
      </ul>
      <Link href={"/create"}>Add new Article</Link>
    </>
  );
}

const UnbulletedList = styled.ul`
  padding: 0;
  list-style: none;
`;
