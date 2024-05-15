import { validationResult } from "express-validator";
import { Request, Response } from "express";
import {
  RefreshTokenService,
  SendOptService,
  VerifyOptService,
  loginService,
  signUpService,
} from "../services/auth.service";
import { CreateOtpDto, LoginDto, SignUpDto, VerifyOtpDto } from "../dtos/auth";
import { validate } from "class-validator";

const signUpController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new SignUpDto();
  dto.email = req.body.email;
  dto.password = req.body.password;
  dto.phoneNumber = req.body.phoneNumber;
  dto.firstName = req.body.firstName;
  dto.lastName = req.body.lastName;
  dto.username = req.body.username;
  dto.address = req.body.address;
  dto.gender = req.body.gender;
  dto.otpId = req.body.otpId;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await signUpService(dto);

  return res.status(returnData.status).json(returnData.data);
};

const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  let dto = new LoginDto();
  dto.email = email;
  dto.password = password;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await loginService(dto);
  return res.status(returnData.status).json(returnData.data);
};

const refreshController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (typeof req.headers.authorization !== "string") {
    return res.status(400).json({ error: "Invalid Authorization header" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const returnData = await RefreshTokenService(token);
    return res.status(returnData.status).json(returnData.data);
  } else {
    return res.status(400).json({ errors: "Invalid Authorization header" });
  }
};

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Email not found" });
//         }
//         const resetToken = randomstring.generate({ length: 20 });
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         await user.save();
//         const transporter = nodemailer.createTransport({
//             service: "gmail", // Replace with your email service
//             auth: {
//                 user: process.env.EMAIL_ADDRESS, // Replace with your email address
//                 pass: process.env.EMAIL_PASSWORD, // Replace with your email password
//             },
//         })
//         const mailOptions = {
//             from: "Your App Name <noreply@yourapp.com>", // Replace with your app info
//             to: email,
//             subject: "Password Reset",
//             text: `You have requested a password reset for your account.\n\n
//         Please click on the following link to reset your password:\n
//         <span class="math-inline">\{process\.env\.CLIENT\_URL\}/reset\-password/</span>{resetToken}\n\n
//         If you did not request a password reset, please ignore this email.\n`,
//         };
//         await transporter.sendMail(mailOptions);
//         res.json({ message: "Password reset link sent to your email" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to send password reset link" });
//     }
// };

// const resetPassword = async (req, res) => {
//     const { resetToken, password } = req.body;

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: resetToken,
//             resetPasswordExpires: { $gt: Date.now() },
//         });
//         if (!user) {
//             return res.status(400).json({
//                 error: "Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn",
//             });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.hash = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();
//         res.json({ message: "Đặt lại mật khẩu thành công" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Đặt lại mật khẩu thất bại" });
//     }
// };

const verifyOtpController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, otpCode, type } = req.body;
  let dto = new VerifyOtpDto();
  dto.email = email;
  dto.type = type;
  dto.otpCode = otpCode;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await VerifyOptService(dto);
  return res.status(returnData.status).json(returnData.data);
};

const sendOtpController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, type } = req.body;
  let dto = new CreateOtpDto();
  dto.email = email;
  dto.type = type;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await SendOptService(dto);
  return res.status(returnData.status).json(returnData.data);
};
// const changePassword = async (req, res) => {
//     const { currentPassword, newPassword, confirmPassword } = req.body;
//     const user = req.user;
//     if (newPassword !== confirmPassword) {
//         return res.status(400).json({ error: "Mật khẩu mới không khớp!" });
//     }
//     // Xác thực mật khẩu hiện tại (sử dụng bcrypt.compare)
//     // ...
//     // Cập nhật mật khẩu mới (sử dụng bcrypt.hash)
//     // ...
//     await user.save();
//     res.json({ message: "Đổi mật khẩu thành công" });
// };

export {
  signUpController,
  loginController,
  verifyOtpController,
  sendOtpController,
  refreshController,
  // deleteAccount,
  // changePassword,
  // resetPassword,
  // forgotPassword
};
