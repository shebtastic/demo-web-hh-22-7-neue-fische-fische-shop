// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import articles from "../../db.json";

export default function handler(request, response) {
  //serverless functions
  // response.status(200).send({ name: 'John Doe' })
  console.log(request.method);
  // console.log(localStorage); gibts nicht

  switch (request.method) {
    case "GET": {
      response.status(200).json(articles);
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
