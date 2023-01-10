import { deleteArticle, getArticle, updateArticle } from "../../../helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const article = await getArticle(request.query.id);
      if (!article) {
        response.status(404).json({
          message: `Article ${request.query.id} was not found.`,
        });
      } else {
        response.status(200).json(article);
      }
      break;
    }
    case "PATCH": {
      const article = JSON.parse(request.body);
      const updatedArticle = await updateArticle(request.query.id, article);
      console.log(updateArticle);
      if (!updatedArticle) {
        response.status(404).json({
          message: `Article ${request.query.id} was not found.`,
        });
      } else {
        response.status(200).json(updatedArticle);
      }
      break;
    }
    case "DELETE": {
      const deletedArticle = await deleteArticle(request.query.id);
      if (!deletedArticle) {
        response.status(404).json({
          message: `Article ${request.query.id} was not found.`,
        });
      } else {
        response.status(200).json(deletedArticle);
      }
      break;
    }
    default: {
      response
        .status(405)
        .setHeader("Allow", "GET,DELETE,PATCH")
        .json({
          message: `Request method ${request.method} is not allowed on ${request.url}`,
        });
    }
  }
}
