import bcrypt from "bcrypt";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
import {LoginDto} from "dtos/auth/login.dto";
import { SignInDto } from "dtos/auth";
import { v5 as uuidv5 } from 'uuid';
import { Types } from "mongoose";

export async function loginService(dto: LoginDto) {
    try {
        const user = await UserModel.findOne({ email: dto.email });
        if (!user || !(bcrypt.compare(dto.password, user.hash))) {
            return { data : {error: "Invalid username or password"}, status: 401 };
        }
        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_ACCESS, { expiresIn: 60 * 5});
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '15d'});
        return { data : {access_token, refresh_token}, status: 200 };
    } catch (error) {
        console.error(error);
        return { data : { error: "Login failed" }, status: 500 };
    }
}

export async function signInService(dto: SignInDto) {
    try {
        const userCheck = await UserModel.findOne({ email: dto.email });
        if (userCheck) {
            return { data : {error: "User is exist!"}, status: 401 };
        }
        const user = new UserModel();
        user.id = uuidv5(dto.email, uuidv5.URL)
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_REFRESH, { expiresIn: '15d'});
        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY_ACCESS, { expiresIn: 60 * 5});
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        user.hash = hashedPassword;
        user.email = dto.email;
        user.isDisplay = true;
        user.refresh_token = refresh_token;
        user.username = dto.username;
        user.phoneNumber = new Types.Array<string>();
        user.phoneNumber.push(dto.phoneNumber)
        user.gender = dto.gender  ? dto.gender : "OTHER";
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.address = dto.address ? dto.address : "NONE";
        await user.save();
        return { data : {access_token, refresh_token}, status: 200 };
    } catch (error) {
        console.error(error);
        return { data : { error: "SignIn failed" }, status: 500 };
    }
}