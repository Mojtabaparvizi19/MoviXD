import axios from "axios";
import "dotenv/config.js";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: process.env.APP_API,
  },
});
