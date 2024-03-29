import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./src/database/database.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connect();
  console.log("listening on port " + port);
});
