// import { body, validationResult } from "express-validator";
import Person from "../models/Person.js";
import passport from "passport";

const register = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // const { name, password, email } = req.body;
    // // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new Person({ name, password: hashedPassword, email });
    // await user.save();
    // res.json({ message: "Registration successful" });
    res.send("[POST] register");
};
const login = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // const { name, password } = req.body;
    // const user = await Person.findOne({ name });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return res.status(401).json({ error: "Invalid username or password" });
    // }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // res.json({ token });
    res.send("[POST] login");
};

const logout = async (req, res) => {
    // req.logout();

    // res.redirect("/");
    res.send("[POST] Logout");
};
const deleteAccount = async (req, res) => {
    // const user = req.user;
    // // Delete user and related data (orders, reviews, etc.)
    // await user.delete();
    // res.json({ message: "Account deleted successfully" });
    res.send("[POST] Delete");
};
const getUserDetails = async (req, res) => {
    // const user = req.user;
    // res.json(user);
    res.send("[GET] Detail User");
};
const updateUserDetails = async (req, res) => {
    // const { name, email, phone } = req.body;
    // const user = req.user;
    // user.name = name;
    // user.email = email;
    // user.phone = phone;
    // await user.save();
    // res.json({ message: "Update successful" });
    res.send("[POST] Update Detail User");
};

export default {
    register,
    login,
    getUserDetails,
    updateUserDetails,
    deleteAccount,
    logout,
};
