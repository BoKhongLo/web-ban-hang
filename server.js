import express from "express";
import morgan from "morgan";
import path from "path";
import { engine } from "express-handlebars";
import * as dotenv from "dotenv";

dotenv.config();

import connect from "./src/database/database.js";
import AppRouter from "./src/routes/index.js";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(morgan('combined'))
app.engine('.hbs', engine({extname: '.hbs'}));// config lại đuôi .handlebars thành .hbs để làm frontend
app.set('view engine', '.hbs');
// khai báo routes lên trên thì mới dùng được :>
//routes
app.use("/user",AppRouter.userRouter)
app.use("/auth",AppRouter.authRouter)
app.get("/", (req, res) => {
  res.send("Home page web ban hang");
});
app.listen(port, async () => {
  await connect();
  console.log(`listening on port http://localhost:${port}`);
});