const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Now_Playing = require("../models/movie");
const Order = require("../models/order");
const router = express.Router();
const currentUser = {
  userName: "john",
  email: "john@gmail.com",
  _id: "64d5285ba4304b7955bede1c",
};

// Route - /Cart

router.post("/addToCart", (req, res) => {
  const toAddMovieId = req.body.movieId;
  console.log(req.body.movieId);
  let newCart = [];
  let newQuantity = 1;
  User.findById({ _id: currentUser._id })
    .then((user) => {
      newCart = [...user.cart.items];
      console.log(user.cart.items);

      const cartMovieIndex = user.cart.items.findIndex((m) => {
        console.log(m);
        return m.movieId.toString() == toAddMovieId.toString();
      });
      console.log(cartMovieIndex);
      if (cartMovieIndex >= 0) {
        console.log(user.cart.items[cartMovieIndex].quantity);
        // Item already exists in the cart, increase the quantity
        newQuantity = user.cart.items[cartMovieIndex].quantity + 1;
        newCart[cartMovieIndex].quantity = newQuantity;
      } else {
        // Item does not exist in the cart, add a new item

        newCart.push({
          movieId: new mongoose.Types.ObjectId(toAddMovieId),
          quantity: newQuantity,
        });
      }
      let newCartEl = { items: newCart };
      return User.updateOne(
        { _id: currentUser._id },
        { $set: { cart: newCartEl } }
      );
    })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.status(200).json(updatedUser); // Return the updated user object
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/getCart", (req, res) => {
  let userInfo;
  User.findById({ _id: currentUser._id })
    .then((user) => {
      userInfo = user;
      const moviesId = user.cart.items.map((el) => {
        return el.movieId;
      });
      return Now_Playing.find({ _id: { $in: moviesId } });
    })
    .then((retrevedMovies) => {
      var items = retrevedMovies.map((m) => {
        return {
          adult: m.adult,
          backdrop_path: m.backdrop_path,
          genre_ids: m.genre_ids,
          id: m.id,
          original_language: m.original_language,
          original_title: m.original_title,
          overview: m.overview,
          poster_path: m.poster_path,
          release_date: m.release_date,
          title: m.title,
          video: m.video,
          vote_average: m.vote_average,
          vote_count: m.vote_count,
          quantity: userInfo.cart.items.find((item) => {
            return item.movieId.toString() == m._id.toString();
          }).quantity,
        };
      });
      res.json({ cartItems: items });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

router.post("/checkOut", (req, res) => {
  const cartItems = req.body.cartItems;
  const newOrder = new Order({
    items: cartItems,
    user: {
      _id: new mongoose.Types.ObjectId(currentUser._id),
      userName: currentUser.userName,
      email: currentUser,
    },
  });
  newOrder
    .save()
    .then((createdOrder) => {
      User.updateOne(
        { _id: currentUser._id },
        { $set: { cart: { items: [] } } }
      ).then((updatedCartInfo) => {
        console.log(updatedCartInfo);
        res.json("check Out is completed!");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getOrders", function (req, res) {
  Order.find({ "user._id": currentUser._id })
    .then((userOrders) => {
      console.log(userOrders);
      res.json(userOrders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/removeFromCart", (req, res) => {
  const movieId = req.body.movieId;
  User.findById(currentUser._id)
    .then((user) => {
      const cartMovieIndex = user.cart.items.findIndex((item) => {
        return item.movieId.toString() == movieId.toString();
      });

      if (cartMovieIndex !== -1) {
        user.cart.items.splice(cartMovieIndex, 1); // Remove the item from the cart
      }

      return User.save(); // Save the updated user
    })
    .then((updatedUser) => {
      console.log("updatedUser", updatedUser);
      res.status(200).json(updatedUser); // Return the updated user object
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Route - /user
router.post("/addUser", (req, res) => {
  const userData = req.body;
  const newUser = new User({
    userName: userData.userName,
    email: userData.email,
    cart: {
      items: [],
    },
  });
  newUser
    .save()
    .then((newuser) => {
      res.json({ message: "user created!!" });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

module.exports = router;
