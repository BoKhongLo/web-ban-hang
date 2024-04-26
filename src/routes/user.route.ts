import express from "express";
import { getUserByID, editUserByID } from "../controllers/users.controller";

const routerUser = express.Router();

routerUser.get("/", (req, res) => {
    res.send("GET users");
});
routerUser.get("/detail", getUserByID);
routerUser.post("/update", editUserByID);
export { routerUser };
