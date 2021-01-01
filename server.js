require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/graphql");

const app = express();

const PORT =
  process.env.NODE_ENV === "production" ? process.env.SERVER_PORT : 8080;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// listens on PORT
app
  .listen(PORT, () => {
    console.log(
      `------------------- Server listening on PORT : ${PORT} -------------------`
    );
  })
  .on("error", (e) => {
    console.error(
      `Error listening on PORT : ${PORT} ------------ \n${e.message}\n------------------`
    );
  });
