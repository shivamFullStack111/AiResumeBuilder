const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql/mainGraphQl");

const app = express();

app.use(cors());
app.use(express.json());

// connect mongoose compas
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/ResumeBuilder")
  .then(() => console.log("db connection established"))
  .catch((error) => console.log(error.message));

app.get("/health", (req, res) => {
  res.status(200).send("Server is running!");
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

startServer();

app.listen(5050, async () => {
  console.log("server is running on port 8000");
});
