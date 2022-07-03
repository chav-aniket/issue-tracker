import { readFileSync } from "fs";
import type { Handler } from "@aws-cdk/aws-lambda";
import { createServer } from "@graphql-yoga/node";
import { configure } from "@vendia/serverless-express";

import resolvers from "./resolvers";

const typeDefs = readFileSync("./schema.gql", "utf8");

const app = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  // cors: {
  //   origin: "*",
  //   credentials: true,
  //   allowedHeaders: ["X-Custom-Header", "content-type"],
  //   methods: ["POST", "GET"],
  // },
});

export const handler: Handler = configure({
  app,
  log: app.logger,
});

// start the server and explore http://localhost:4000/graphql
// app.start();
