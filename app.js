import express from "express";
import router from "./router/router.js";
import "dotenv/config.js";
const app = express();

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
