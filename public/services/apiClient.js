import axios from "axios";
import "dotenv/config.js";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZkNGJjZDU1YTAzMGQwNWY1ZDI5MDQyZmEwNDc4ZiIsInN1YiI6IjY1ZGYzODc0N2YyZDRhMDE2MzY3N2JhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pWxzEtvGhXFgYD8O_Ipr2hwqp3Fxw7PgHoNmFGk1qqI",
  },
});
