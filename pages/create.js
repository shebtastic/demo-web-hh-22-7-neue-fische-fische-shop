import Link from "next/link";
import { useRouter } from "next/router";

import ArticleForm from "../components/ArticleForm";

export default function CreateArticlePage() {
  const router = useRouter();

  async function handleSubmit(data) {
    //TODO: hier kommt noch fehlerbehandlung!
    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify(data),
    });

    router.push("/");
  }

  return (
    <>
      <Link href="/">Back Home</Link>
      <h1>Create new Article</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </>
  );
}
