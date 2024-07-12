import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZkNGJjZDU1YTAzMGQwNWY1ZDI5MDQyZmEwNDc4ZiIsIm5iZiI6MTcyMDI4NDIzNS41OTMwODUsInN1YiI6IjY1ZGYzODc0N2YyZDRhMDE2MzY3N2JhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cj6dUrtMqDkpbe62ILhwC7ckqEtSaYfW11BbAnnuiE0",
  },
});
