import express from "express";
import AppController from "../controllers/index.js";

const router = express.Router();
router.get("/", (req, res) => {
    res.send("register");
});
router.post("/register", AppController.authController.register);
router.post("/login", AppController.authController.login);
export default router;
