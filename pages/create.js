import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateArticlePage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      ...Object.fromEntries(formData),
      categories: formData.getAll("categories"),
    };

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">Name</label>
          <input id="name-input" type="text" name="name" />
        </div>
        <div>
          <label htmlFor="category-input">Categories</label>
          <input id="category-input" type="text" name="categories" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
