const global = {
  main: {
    page: 1,
    total_page: 0,
  },
};

import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import apiClient from "./public/services/apiClient.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZkNGJjZDU1YTAzMGQwNWY1ZDI5MDQyZmEwNDc4ZiIsInN1YiI6IjY1ZGYzODc0N2YyZDRhMDE2MzY3N2JhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pWxzEtvGhXFgYD8O_Ipr2hwqp3Fxw7PgHoNmFGk1qqI",
  },
};

app.get("/", async (req, res) => {
  try {
    global.main.page = 1;
    const popularMovies = await apiClient.get("movie/popular");
    const popularShow = await apiClient.get("tv/popular");
    const genreResponse = await apiClient.get("genre/movie/list");
    const movies = popularMovies.data.results;
    const shows = popularShow.data.results;
    const genres = genreResponse.data.genres;
    res.render("index.ejs", {
      movieData: movies,
      showData: shows,
      genreData: genres,
      page: global.main.page,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/details/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await apiClient.get(`movie/${id}`);

    const resRecomendation = await apiClient.get(`movie/${id}/similar`);
    const recomendation = resRecomendation.data;

    const results = response.data;

    res.render("detail.ejs", {
      data: results,
      recomendation: recomendation.results,
    });
  } catch (error) {
    res.status(400).send({ Error: "something is wrong" });
  }
});

app.get("/genre/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const genreResponse = await apiClient.get("genre/movie/list");
    const genres = genreResponse.data.genres;
    const response = await apiClient.get("discover/movie", {
      params: {
        with_genres: id,
      },
    });

    const data = response.data.results;
    res.render("genre-search.ejs", {
      movieData: data,
      genreData: genres,
      page: global.main.page,
      color: "green",
    });
  } catch (error) {}
});

app.post("/load-page", async (req, res) => {
  try {
    global.main.page += 1;
    const response = await apiClient.get(
      `movie/popular?page=${global.main.page}`
    );

    res.render("load-more.ejs", {
      movieData: response.data.results,
      page: global.main.page,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/previous-page", async (req, res) => {
  try {
    global.main.page -= 1;
    if (global.main.page === 1) {
      const popularMovies = await apiClient.get("movie/popular");
      const popularShow = await apiClient.get("tv/popular");
      const movies = popularMovies.data.results;
      const shows = popularShow.data.results;

      res.render("index.ejs", {
        movieData: movies,
        showData: shows,
        page: global.main.page,
      });
    } else {
      const response = await apiClient.get(
        `movie/popular?page=${global.main.page}`
      );

      res.render("load-more.ejs", {
        movieData: response.data.results,
        page: global.main.page,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/previous-page", async (req, res) => {
  try {
    global.main.page -= 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?page=${global.main.page}`,
      options
    );

    res.render("previous-page.ejs", {
      movieData: response.data.results,
      page: global.main.page,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/details-show/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}`,
      options
    );

    const recomendationRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar`,
      options
    );
    res.render("detail-show.ejs", {
      data: response.data,
      recomendation: recomendationRes.data.results,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const request = req.body;
    const type = request["checked"];
    const searched = request["search-input"];
    let results;
    let url;
    if (type === "movie") {
      url = `search/movie?query=${searched}`;
      const response = await apiClient.get(url);
      results = response.data.results;
      res.render("search.ejs", {
        data: results,
      });
    } else if (type === "show") {
      url = `search/tv?query=${searched}`;
      const response = await apiClient.get(url, options);
      results = response.data.results;
      res.render("search-show.ejs", {
        data: results,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
