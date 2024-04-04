import express from "express";
import { getUserDetails, updateUserDetails } from "../controllers/users.controller";

const routerUser = express.Router();

routerUser.get("/", (req, res) => {
    res.send("GET users");
});
routerUser.get("/getUserDetails", getUserDetails);
routerUser.post("/updateUserDetails", updateUserDetails);
export { routerUser };