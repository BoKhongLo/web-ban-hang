import express from "express";
import AppController from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET users");
});
router.post("/login", AppController.userController.login);
router.post("/register", AppController.userController.register);
router.get("/getUserDetails", AppController.userController.getUserDetails);

export default router;
