
import { Types } from "mongoose";
import { EditProfileDto } from "../dtos/user";
import { UserModel } from "../models";

export async function getUserByIdService(userId: string) {
    try {
        const user = await UserModel.findOne({ id: userId }).select('+hash');
        let dataReturn = user.toJSON();
        delete dataReturn.refresh_token;
        delete dataReturn.hash;
        return { data : dataReturn, status: 200 };
    }
    catch (error) {
        console.error(error);
        return { data : { error: "Get data failed" }, status: 500 };
    }
}


export async function editProfileService(dto : EditProfileDto) {
    try {
        const user = await UserModel.findOne({ id: dto.userId }).select('+hash');
        user.username = dto.username ? dto.username : user.username;
        user.firstName = dto.firstName ? dto.firstName : user.firstName;
        user.lastName = dto.lastName ? dto.lastName : user.lastName;
        user.address = dto.address ? dto.address : user.address;
        user.birthday = dto.birthday ? dto.birthday : user.birthday;
        user.gender = dto.gender ? dto.gender : user.gender;
        user.imgDisplay = dto.imgDisplay ? dto.imgDisplay : user.imgDisplay;
        user.phoneNumber = dto.phoneNumber ? dto.phoneNumber : user.phoneNumber;
        await user.save();
        let dataReturn = user.toJSON();
        delete dataReturn.refresh_token;
        delete dataReturn.hash;
        return { data : dataReturn, status: 200 };
    }
    catch (error) {
        console.error(error);
        return { data : { error: "Get data failed" }, status: 500 };
    }
}


export async function addHeartProductService(productId: string, userId: string) {
    try {
        const user = await UserModel.findOne({ id: userId }).select('+hash');
        if (!(user.heart.includes(productId))) {
            
        }
        await user.save();
        let dataReturn = user.toJSON();
        delete dataReturn.refresh_token;
        delete dataReturn.hash;
        return { data : dataReturn, status: 200 };
    }
    catch (error) {
        console.error(error);
        return { data : { error: "Get data failed" }, status: 500 };
    }
}


export async function removeHeartProductService(productId: string, userId: string) {
    try {
        const user = await UserModel.findOne({ id: userId }).select('+hash');
        let newData = user.heart.filter(item => item !== productId)
        user.heart = new Types.Array<string>()
        user.heart.push(...newData)
        await user.save();
        let dataReturn = user.toJSON();
        delete dataReturn.refresh_token;
        delete dataReturn.hash;
        return { data : dataReturn, status: 200 };
    }
    catch (error) {
        console.error(error);
        return { data : { error: "Get data failed" }, status: 500 };
    }
}