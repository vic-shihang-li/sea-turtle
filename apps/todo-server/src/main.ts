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

const app = express();
apolloServer.applyMiddleware({ app });

app.get("/api", (req, res) => {
  res.send({ message: "todo-server is live!" });
});

const port = process.env.PORT || 3333;

const expressServer = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

expressServer.on("error", console.error);
