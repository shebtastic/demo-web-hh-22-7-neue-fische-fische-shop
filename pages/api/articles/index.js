// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import articles from "../../db.json";
import { createArticle, getAllArticles } from "../../../helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const articles = await getAllArticles();
      response.status(200).json(articles);
      break;
    }
    case "POST": {
      const article = JSON.parse(request.body);
      const createdArticle = await createArticle(article);
      response.status(201).json(createdArticle);
      // response.status(500).json({ message: "omg" });
      break;
    }
    default: {
      response
        .status(405)
        .setHeader("Allow", "GET,POST")
        .json({
          message: `Request method ${request.method} is not allowed on ${request.url}`,
        });
    }
  }
}
