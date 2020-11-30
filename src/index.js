const { GraphQLServer } = require("graphql-yoga");
const express = require("express");
const path = require("path");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

const options = {
  PORT: process.env.PORT || 4000,
};

// if (options.PORT === "production") {
//   server.express.use(express.static("public"));
//   server.express.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "public", "index.html"));
//   });
// }

server.start(options, ({ PORT }) =>
  console.log(`Server is running on port ${PORT}`)
);

// server.express.listen((options.PORT) => {})
