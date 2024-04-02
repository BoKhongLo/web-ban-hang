import AppModals from "../models/index.js";

const getUserDetails = async (req, res) => {
    const user = req.user;
    res.json(user);
    res.send("[GET] Detail User");
};
const updateUserDetails = async (req, res) => {
    const { name, email, phone } = req.body;
    const user = req.user;
    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();
    res.json({ message: "Update successful" });
    res.send("[POST] Update Detail User");
};
const getOrderHistory = async (req, res) => {
    const user = req.user;
    // Lấy lịch sử mua hàng của user
    const orders = await AppModals.Orders.find({ user: user._id });
    res.render("order-history", {
        title: "Lịch sử mua hàng",
        orders: orders,
    });
};
const addAddress = async (req, res) => {
    const { address } = req.body;
    const user = req.user;
    user.addresses.push(address); // Assuming 'addresses' is an array in User model
    await user.save();
    res.json({ message: "Địa chỉ giao hàng đã được thêm" });
};

const getAddresses = async (req, res) => {
    const user = req.user;
    res.json(user.addresses);
};

export default {
    getUserDetails,
    updateUserDetails,
    getOrderHistory,
    addAddress,
    getAddresses,
};
