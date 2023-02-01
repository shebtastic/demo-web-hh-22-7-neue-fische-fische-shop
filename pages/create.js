import Link from "next/link";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import ArticleForm from "../components/ArticleForm";

async function fetcher(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    throw new Error(`Status code is not OK: ${response.status}`);
  }
  return response.json();
}

export default function CreateArticlePage({ addArticle }) {
  const { trigger, error, isMutating, data } = useSWRMutation(
    "/api/articles",
    fetcher
  );
  const router = useRouter();

  async function handleSubmit(data) {
    // await fetch("/api/articles", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });

    try {
      await trigger(data);
    } catch (e) {}

    if (!error) {
      router.push("/");
    }
  }

  return (
    <>
      <Link href="/">Back Home</Link>
      <h1>Create new Article</h1>
      <span>{error?.message}</span>
      <ArticleForm isSubmitting={isMutating} onSubmit={handleSubmit} />
    </>
  );
}
