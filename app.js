import express from "express";
import router from "./router/router.js";
const app = express();

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port: ${PORT}`);
});
