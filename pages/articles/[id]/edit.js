import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import ArticleForm from "../../../components/ArticleForm";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: article, isLoading, error } = useSWR(`/api/articles/${id}`);

  function editArticle(article) {
    fetch(`/api/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(article),
    });
  }

  async function deleteArticle() {
    await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  if (!isReady || isLoading || error) return <h1>Loading...</h1>;

  return (
    <>
      <Link href={`/articles/${id}`}>Go Back</Link>
      <h1>{id}</h1>
      <ArticleForm defaultData={article} onSubmit={editArticle} />
      <button onClick={deleteArticle}>Delete Article</button>
    </>
  );
}
