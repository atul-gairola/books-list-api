const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// on successful connection
mongoose.connection.on("connected", () => {
  console.log("Connected to the DB");
});

// on connection failure
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to the DB \n", err);
});

// when connection disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the DB");
});

// if node process ends, close the connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from the DB via app termination");
  });
  process.exit(0);
});

module.exports = mongoose;
