import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./src/database/database.js";
import {userRouter} from './src/routes/index.js'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/user",userRouter)

app.get("/", (req, res) => {
  res.send("Home page web ban hang");
});


app.listen(port, async () => {
  await connect();
  console.log(`listening on port http://localhost:${port}`);
});