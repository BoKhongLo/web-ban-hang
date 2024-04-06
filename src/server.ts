import express, { Express }  from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./database/database.ts";
import { routerAuth, routerUser } from "./routes";
import passport from "passport";
import session from "express-session";
import IORedis from "ioredis";
import RedisStore from "connect-redis";
import "./config/passport.ts"

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3,
        },
    })
)

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(morgan('combined'))

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/user", urlencodedParser, passport.authenticate('jwt', { session: false }), routerUser)
app.use("/auth", urlencodedParser, routerAuth)

app.listen(port, async () => {
  await connectDb();
  console.log(`listening on port http://localhost:${port}`);
});