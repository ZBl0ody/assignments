const express = require("express");
const Movies = require("../models/movie");
const mongoose = require("mongoose");
const router = express.Router();

//movies  get //get all movies
router.get("/getAllmovies", function (req, res) {
  const pageNumber = +req.query.page;
  const pageSize = +req.query.pageSize;
  const myQuery = Movies.find();
  let fetchedMovies;
  if (pageNumber && pageSize) {
    myQuery.skip(pageSize * (pageNumber - 1)).limit(pageSize);
  }
  myQuery
    .then(function (moviesData) {
      fetchedMovies = moviesData;
      return Movies.count();
      // res.status(200).send(moviesData);
    })
    .then((moviesCount) => {
      res.status(200).json({
        movies: fetchedMovies,
        totalmovieCount: moviesCount,
      });
    })
    .catch(function (err) {
      console.log("Error");
    });
});

//  /movies/:id  get getmovieById

router.get("/getMovieById/:id", function (req, res) {
  const movieId = req.params.id;
  Movies.findOne({ id: movieId })
    .then(function (singlemovie) {
      if (!singlemovie) {
        res.send({
          message: "No movie Founded with this id",
        });
      } else {
        res.send(singlemovie);
      }
    })
    .catch(function (err) {
      console.log(`Error ${err}`);
    });
});

// /addmovie  Post add new movie

router.post("/addmovie", function (req, res) {
  const newMovieData = req.body;
  console.log(req.body);
  const newMovie = new Movies({
    adult: newMovieData.adult,
    backdrop_path: newMovieData.backdrop_path,
    genre_ids: newMovieData.genre_ids,
    id: newMovieData.id,
    original_language: newMovieData.original_language,
    original_title: newMovieData.original_title,
    overview: newMovieData.overview,
    poster_path: newMovieData.poster_path,
    release_date: newMovieData.release_date,
    title: newMovieData.title,
    video: newMovieData.video,
    vote_average: newMovieData.vote_average,
    vote_count: newMovieData.vote_count,
  });

  newMovie
    .save()
    .then(function (data) {
      console.log("movie added!");
      console.log(data);
    })
    .catch(function (err) {
      console.log("Error");
    });
});

module.exports = router;
