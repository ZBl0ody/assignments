var mongoose = require("mongoose");
var mongoosValidator = require("mongoose-unique-validator");
let userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        movieId: mongoose.Types.ObjectId,
        quantity: Number,
      },
    ],
  },
});
userSchema.plugin(mongoosValidator);
module.exports = mongoose.model("User", userSchema);
// { typeof: String, required: true, unique: true }
