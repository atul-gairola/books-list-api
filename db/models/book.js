const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
