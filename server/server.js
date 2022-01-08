const express = require('express');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import schema
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// create a new Apollo server and pass in the schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//integrate Apollo server with the Express application as middleware
server.applyMiddleware({ app });

// ********* setUp for Apollo V3 + *******************//
// const startServer = async () => {
//   // create a new Apollo server and pass in the schema data
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
//   });

//   // start the Apollo server

//   await server.strart();

//   //integrate Apollo server with the Express application as middleware
//   server.applyMiddleware({ app });

//   // log where you can go to test GQL API
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// };
// // Initialize the Apollo server
// startServer();
// ****************************************************************************** //

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(
      `🌍 🌍🌍🌍🌍--->Now listening on localhost:${PORT}----->🌍🌍🌍🌍`
    );
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
