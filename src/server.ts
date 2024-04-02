import express, { Express }  from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./database/database.ts";
import { routerAuth, routerUser } from "./routes";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(morgan('combined'))

//routes
app.use("/user", urlencodedParser, routerUser)
app.use("/auth", urlencodedParser, routerAuth)

app.listen(port, async () => {
  await connectDb();
  console.log(`listening on port http://localhost:${port}`);
});