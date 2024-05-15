import express, { Express } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDb } from "./config/database.ts";
import passport from "passport";
import session from "express-session";
import "./config/passport.ts";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./config/websocket.ts";
import "./config/mailer.ts";

import {
  routerAuth,
  routerMedia,
  routerProduct,
  routerUser,
  routerCart,
  routerRoomchat,
  routerOrder,
  routerPayment
} from "./routes";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3434"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
  },
});


const whitelist = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3434"];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true
};

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
);

app.use(express.json({ limit: '256mb' }))

app.use(express.urlencoded({ limit: '256mb', extended: false, parameterLimit: 256000 }))

// parse application/json
app.use(bodyParser.json({limit: "256mb"}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "256mb", extended: true, parameterLimit: 256000}))


app.use(morgan("combined"));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/user", routerUser);
app.use("/auth", routerAuth);
app.use("/media", routerMedia);
app.use("/product", routerProduct);
app.use("/cart", routerCart);
app.use("/roomchat", routerRoomchat);
app.use("/order", routerOrder);
app.use("/payment", routerPayment);

io.on("connection", (socket) => {
  console.log("a user connected");
  roomHandler(socket , io);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, async () => {

  await connectDb();
  console.log(`Listening on port http://localhost:${port}`);
});