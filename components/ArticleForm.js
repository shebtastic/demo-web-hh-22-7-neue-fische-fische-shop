function ArticleForm({ onSubmit, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      ...Object.fromEntries(formData),
      categories: formData.getAll("categories"),
    };

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-input">Name</label>
        <input
          defaultValue={defaultData.name}
          id="name-input"
          type="text"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="category-input">Categories</label>
        <input
          defaultValue={defaultData.categories[0]}
          id="category-input"
          type="text"
          name="categories"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ArticleForm;
