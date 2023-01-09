import { getArticle } from "../../../helpers/db";

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
    default: {
      response
        .status(405)
        .setHeader("Allow", "GET")
        .json({
          message: `Request method ${request.method} is not allowed on ${request.url}`,
        });
    }
  }
}
