require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

require("./db");
const schema = require("./schema/graphql");

const app = express();

const PORT =
  process.env.NODE_ENV === "production"
    ? parseInt(process.env.SERVER_PORT)
    : 8080;

// allow cross origin requests
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// listens on PORT
app
  .listen(PORT, () => {
    console.log(`Server listening on PORT : ${PORT}`);
  })
  .on("error", (e) => {
    console.error(
      `------------------\nError listening on PORT : ${PORT}\n${e.message}\n------------------`
    );
  });
