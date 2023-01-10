import mongoose, { model, models, Schema } from "mongoose";
import crypto from "crypto";

const URI = `mongodb+srv://michael:${process.env.MONGODB_PASSWORD}@cluster0.pjgtprn.mongodb.net/?retryWrites=true&w=majority`;

const articleSchema = new Schema({
  id: String,
  name: String,
  categories: [String],
});

const Article = models.Article || model("Article", articleSchema);

async function connectDatabase() {
  await mongoose.connect(URI);
}

async function getAllArticles() {
  await connectDatabase();

  const articles = await Article.find({});
  return articles;
}

async function getArticle(id) {
  await connectDatabase();

  const article = await Article.findOne({
    id,
  });
  return article;
}

async function createArticle(article) {
  await connectDatabase();

  const createdArticle = await Article.create({
    ...article,
    id: crypto.randomUUID(),
  });

  return createdArticle;
}

async function updateArticle(id, article) {
  await connectDatabase();

  await Article.updateOne(
    {
      id,
    },
    article
  );

  const updatedArticle = getArticle(id);

  return updatedArticle;
}

async function deleteArticle(id) {
  await connectDatabase();

  const deletedArticle = getArticle(id);
  await Article.deleteOne({
    id,
  });
  return deletedArticle;
}

export {
  getAllArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
};
