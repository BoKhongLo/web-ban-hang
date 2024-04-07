import express, { Express } from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./config/database.ts";
import { routerAuth, routerUser } from "./routes";
import passport from "passport";
import session from "express-session";
import "./config/passport.ts"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./config/websocket.ts";
import "./config/mailer.ts"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:4200",
}

app.use(cors(corsOptions));

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

io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


httpServer.listen(port, async () => {
    await connectDb();
    console.log(`Listening on port http://localhost:${port}`);
});


