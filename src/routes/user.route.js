import express from "express";
import AppController from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET users");
});
router.get("/getUserDetails", AppController.userController.getUserDetails);
router.post("/updateUserDetails", AppController.userController.updateUserDetails);
export default router;
