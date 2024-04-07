import express from "express";
import { getUserDetails, updateUserDetails } from "../controllers/users.controller";

const routerUser = express.Router();

routerUser.get("/", (req, res) => {
    res.send("GET users");
});
routerUser.get("/detail", getUserDetails);
routerUser.post("/update", updateUserDetails);
export { routerUser };
