import bcrypt from "bcrypt";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
import {LoginDto} from "dtos/auth/login.dto";
import { CreateOtpDto, SignUpDto, VerifyOtpDto } from "dtos/auth";
import { v5 as uuidv5 } from 'uuid';
import * as OTPAuth from "otpauth";
import * as otpGenerator from 'otp-generator';
import { OtpModel } from "../models/OtpCode.model";
import { sendMail } from "../config/mailer";
import createId from "../utils/generater";
import { createCartService } from "./cart.service";
import { createRoomService } from "./rooomchat.service";
import { sendNotify } from "../config/websocket";

export async function loginService(dto: LoginDto) {
    try {
        const user = await UserModel.findOne({ email: dto.email }).select('+hash');
        if (!user) {
            return { data : {error: "User is not exist"}, status: 401 };
        }
        if (!(await bcrypt.compare(dto.password, user.hash))) {
            return { data : {error: "Invalid password"}, status: 401 };
        }
        if ("BANNED" in user.role) {
            return { data : {error: "the user is banned!"}, status: 401 };
        }
        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_ACCESS, { expiresIn: "1h"});
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '15d'});
        user.refresh_token = refresh_token
        await user.save();
        return { data : {access_token, refresh_token}, status: 200 };
    } catch (error) {
        console.error(error);
        return { data : { error: "Login failed" }, status: 500 };
    }
}

export async function signUpService(dto: SignUpDto) {
    try {
        const userCheck = await UserModel.findOne({ email: dto.email });
        if (userCheck) {
            return { data : {error: "User is exist!"}, status: 401 };
        }

        const optCheck = await OtpModel.findOne({ id: dto.otpId})
        if (!optCheck) {
            return { data : {error: "Otp is not validate!"}, status: 401 };
        }

        const user = new UserModel();
        user.id = await createId(dto.email, UserModel);
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '15d'});
        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_ACCESS, { expiresIn: "1h"});
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        user.hash = hashedPassword;
        user.email = dto.email;
        user.refresh_token = refresh_token;
        user.username = dto.username;
        user.phoneNumber = dto.phoneNumber;
        user.gender = dto.gender ? dto.gender : "OTHER";
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.address = dto.address ? dto.address : "";
        user.cartId = await createCartService(user.toJSON().id);
        user.roomId = await createRoomService(user.toJSON().id);
        console.log('cart id :',user.cartId);
        await user.save();
        sendNotify({userId : user.id, roomId: user.roomId})
        return { data : {access_token, refresh_token}, status: 200 };
    } catch (error) {
        console.error(error);
        return { data : { error: "SignIn failed" }, status: 500 };
    }
}


export async function SendOptService(dto: CreateOtpDto) {
    try {
        const optCheck = await OtpModel.findOne({ 
            email: dto.email, 
            type: dto.type,
            isDisplay: true
        });
        // if (optCheck) {
        //     const currentDate: Date = new Date();
        //     const thirtySeconds = 30 * 1000;
        //     const createdAtDate: Date = new Date(optCheck.createdAt);
        //     const isWithin30s = Math.abs(createdAtDate.getTime() - currentDate.getTime()) <= thirtySeconds;
        //     if (!isWithin30s) {
        //         return { data : {error: "Still counting down the time"}, status: 401 };
        //     }
        // }
        let generatedOTP: string = otpGenerator.generate(6, { digits: false, upperCaseAlphabets: false, specialChars: false });

        let totp = new OTPAuth.TOTP({
            algorithm: "SHA224",
            digits: 6,
            secret: generatedOTP,
        });

        let token: string = totp.generate().toString();
        let idOtp: string = uuidv5(dto.email + generatedOTP + token, uuidv5.URL)
        while (true) {
            const dataPreOtp = await OtpModel.findOne({
                id: idOtp,
                email: dto.email
            })
            if (dataPreOtp) {
                generatedOTP = otpGenerator.generate(6, { digits: false, upperCaseAlphabets: false, specialChars: false });
                totp = new OTPAuth.TOTP({
                    algorithm: "SHA224",
                    digits: 6,
                    secret: generatedOTP,
                });

                token = totp.generate().toString();
                idOtp = uuidv5(dto.email + generatedOTP + token, uuidv5.URL)
            }
            else {
                break;
            }
        }
        if (optCheck) {
            optCheck.otpCode = token;
            optCheck.id = idOtp
            optCheck.value = false;
            optCheck.isDisplay = true;
            await optCheck.save()
        }
        else {
            const newOtp = new OtpModel({
                id: idOtp,
                email: dto.email,
                otpCode: token,
                isDisplay: true,
                value: false,
                type: dto.type,
            })

            await newOtp.save()
        }
        if (dto.type == "ForgotPassword") {
            const userCheck = await UserModel.findOne({ email: dto.email });
            if (userCheck) {
                return { data : {error: "User is exist!"}, status: 401 };
            }
            if (userCheck && userCheck.role.includes("BANNED")) {
                return { data: { error: "The user is banned!" }, status: 401 };
            }
            await sendMail(
                dto.email, 
                'Otp Forget Password Black Cat Chat',
                userCheck.username,
                token,
                'forgetPassword',
            )
            return { data : {isRequest: true}, status: 200 };
        }
        else if (dto.type == "SignUp") {
            await sendMail(
                dto.email, 
                'Otp Create Account Black Cat Chat',
                "",
                token,
                'createAccount',
            )
            return { data : {isRequest: true}, status: 200 };
        }
        return { data : {isRequest: false}, status: 401 };
    } catch (error) {
        console.error(error);
        return { data : { error: "Create Otp failed" }, status: 500 };
    }
}

export async function VerifyOptService(dto: VerifyOtpDto) {
    try {
        const userCheck = await UserModel.findOne({ email: dto.email });
        if (userCheck && userCheck.role.includes("BANNED")) {
            return { data: { error: "The user is banned!" }, status: 401 };
        }
        const optCheck = await OtpModel.findOne({ 
            email: dto.email, 
            type: dto.type,
            otpCode: dto.otpCode,
            value: false,
            isDisplay: true
        });
        if (!optCheck) {
            return { data : {error: "The user have not OTP CODE!"}, status: 401 };
        }
        optCheck.value = true;
        optCheck.isDisplay = false;
        await optCheck.save();
        return { data : {otpId: optCheck.id, value: optCheck.value}, status: 200 };
    } catch (error) {
        console.error(error);
        return { data : { error: "Verify Otp failed" }, status: 500 };
    }
}


export async function RefreshTokenService(dto : string) {
    try {
        console.log(dto)
        const token : any = await new Promise((resolve, reject) => {
            jwt.verify(dto, process.env.JWT_SECRET_KEY_REFRESH, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
        const userCheck = await UserModel.findOne({ id: token.id });

        if (!userCheck) {
            return { data: { error: "User not found" }, status: 404 };
        }
        if (userCheck.role.includes("BANNED")) {
            return { data: { error: "The user is banned!" }, status: 401 };
        }
        const access_token = jwt.sign({ id: token.id }, process.env.JWT_SECRET_KEY_ACCESS, { expiresIn: "1h" });
        const refresh_token = jwt.sign({ id: token.id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '15d' });
        
        userCheck.refresh_token = refresh_token;
        await userCheck.save();

        return { data: { access_token, refresh_token }, status: 200 };
    } catch (error) {
        return { data: { error: "Error refreshing token" }, status: 500 };
    }
}