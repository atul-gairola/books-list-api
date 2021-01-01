const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: String,
    genre: String,
    author_id: { type: Schema.Types.ObjectId, ref: "Author" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);