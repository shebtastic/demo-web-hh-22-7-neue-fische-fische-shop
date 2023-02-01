import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import ArticleForm from "../../../components/ArticleForm";

async function fetcher(url, { arg }) {
  // wir hätten arg auch genested destructuren können um die variablen method und body direkt zu bekommen
  // async function fetcher(url, { arg: { method, body } }) {
  await fetch(url, {
    method: arg.method,
    body: arg.body ? JSON.stringify(arg.body) : undefined,
  });
}

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: article,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/articles/${id}`);
  const { trigger: triggerPatch, isMutating: isUpdating } = useSWRMutation(
    `/api/articles/${id}`,
    fetcher
  );
  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    `/api/articles/${id}`,
    fetcher
  );

  async function editArticle(article) {
    await triggerPatch({ method: "PATCH", body: article });
    await mutate();
  }

  async function deleteArticle() {
    await triggerDelete({ method: "DELETE" });
    router.push("/");
  }

  if (!isReady || isLoading || error) return <h1>Loading...</h1>;

  return (
    <>
      <Link href={`/articles/${id}`}>Go Back</Link>
      <h1>{id}</h1>
      <ArticleForm
        isSubmitting={isUpdating || isDeleting}
        defaultData={article}
        onSubmit={editArticle}
      />
      <button disabled={isUpdating || isDeleting} onClick={deleteArticle}>
        Delete Article
      </button>
    </>
  );
}
