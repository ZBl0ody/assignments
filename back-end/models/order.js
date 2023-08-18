var mongoose = require("mongoose");
let orderSchema = mongoose.Schema({
  items: [
    {
      adult: Boolean,
      backdrop_path: String,
      genre_ids: [String],
      id: Number,
      original_language: String,
      original_title: String,
      overview: String,
      poster_path: String,
      release_date: Date,
      title: String,
      video: Boolean,
      vote_average: Number,
      vote_count: Number,
      quantity: Number,
    },
  ],
  user: {
    _id: mongoose.Types.ObjectId,
    userName: String,
    email: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
