import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: article,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/articles/${id}`);

  if (!isReady || isLoading || error) return <h1>Loading...</h1>;

  return (
    <>
      <Link href={"/"}>Back Home</Link>
      <h1>{article.name}</h1>
      <h2>{article.id}</h2>
      <h3>Categories</h3>
      <ul>
        {article.categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <Link href={`/articles/${id}/edit`}>Artikel editieren</Link>
    </>
  );
}
