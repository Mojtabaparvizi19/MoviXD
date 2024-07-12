import axios from "axios";
import express from "express";
const app = express();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZkNGJjZDU1YTAzMGQwNWY1ZDI5MDQyZmEwNDc4ZiIsInN1YiI6IjY1ZGYzODc0N2YyZDRhMDE2MzY3N2JhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pWxzEtvGhXFgYD8O_Ipr2hwqp3Fxw7PgHoNmFGk1qqI",
  },
};
class Movie {
  constructor() {}

  getPopularMovies() {
    app.get("/", async (req, res) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          options
        );
        const results = response.data;
        res.render("index.ejs", {
          data: results,
        });
      } catch (error) {
        console.error(error);
      }
    });
  }
}

export default Movie;
