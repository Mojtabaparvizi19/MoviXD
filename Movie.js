import axios from "axios";
import express from "express";
const app = express();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer **********************************************************",
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
