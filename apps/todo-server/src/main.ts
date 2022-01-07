import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 3333;

const app = express();
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });

  const expressServer = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  expressServer.on("error", console.error);
});
