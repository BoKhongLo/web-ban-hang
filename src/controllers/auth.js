import passport from "passport";
import User from "../models/Users.js";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import bcrypt from "bcrypt";
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password, email } = req.body;
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, hash: hashedPassword, email });
    await user.save();
    res.json({ message: "Registration successful" });
    res.send("[POST] register");
};
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.hash))) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};

const logout = async (req, res) => {
    req.logout();
    res.redirect("/");
    res.send("Logout");
};
const deleteAccount = async (req, res) => {
    const user = req.user;
    try {
        await user.delete(); // Delete user and related data (orders, reviews, etc.) - Implement logic as needed
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Account deletion failed" });
    }
};
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }
        const resetToken = randomstring.generate({ length: 20 });
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const transporter = nodemailer.createTransport({
            service: "gmail", // Replace with your email service
            auth: {
                user: process.env.EMAIL_ADDRESS, // Replace with your email address
                pass: process.env.EMAIL_PASSWORD, // Replace with your email password
            },
        })
        const mailOptions = {
            from: "Your App Name <noreply@yourapp.com>", // Replace with your app info
            to: email,
            subject: "Password Reset",
            text: `You have requested a password reset for your account.\n\n
        Please click on the following link to reset your password:\n
        <span class="math-inline">\{process\.env\.CLIENT\_URL\}/reset\-password/</span>{resetToken}\n\n
        If you did not request a password reset, please ignore this email.\n`,
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send password reset link" });
    }
};
const resetPassword = async (req, res) => {
    const { resetToken, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                error: "Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.hash = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: "Đặt lại mật khẩu thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đặt lại mật khẩu thất bại" });
    }
};
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        // Implement login or password reset logic here
        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};
const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = req.user;
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Mật khẩu mới không khớp!" });
    }
    // Xác thực mật khẩu hiện tại (sử dụng bcrypt.compare)
    // ...

    // Cập nhật mật khẩu mới (sử dụng bcrypt.hash)
    // ...
    await user.save();
    res.json({ message: "Đổi mật khẩu thành công" });
};
export default {
    register,
    login,
    logout,
    deleteAccount,
    changePassword,
    verifyOTP,
    resetPassword,
    forgotPassword
};
