import { IMessages, MessagesModel, UserModel, roomchatModel } from "../models";
import { Types } from "mongoose";
import createId from "../utils/generater";
import { v5 as uuidv5 } from 'uuid';

export async function getAllRoomService(adminId: string) {
    try {
        let userCheck = await UserModel.findOne({
            id: adminId,
        })
        if (!userCheck) {
            return { data : {error: "User is exist!"}, status: 401 };
        }
        if (!("ADMIN" in userCheck.role || "TELESAlES" in userCheck.role))  {
            return { data : {error: "User is exist!"}, status: 401 };
        }
        if ("BANNED" in userCheck.role) {
            return { data : {error: "the user is banned!"}, status: 401 };
        }
        let allRoom = await roomchatModel.find();
        let dataReturn = [];
        allRoom.map((value, index) => {
            dataReturn.push(value.toJSON())
        })
        return { data : dataReturn, status: 201 }
    } catch (error) {
        console.error(error);
        return { data : { error: "Get room failed" }, status: 500 };
    }
}

export async function createRoomService(userId: string) {
    try {
        let newRoom = new roomchatModel();
        newRoom.id = await createId(userId, roomchatModel);
        newRoom.updateAt = new Date();
        newRoom.createdAt = new Date();
        newRoom.userId = userId;
        newRoom.messages = new Types.DocumentArray<IMessages>([]);
        newRoom.isBlock = false;
        newRoom.isDisplay = true;
        await newRoom.save();
        return newRoom.toJSON();
    } catch (error) {
        console.error(error);
        return { data : { error: "Login failed" }, status: 500 };
    }
}

export async function addMessageService(megs: IMessages) {
    try {
        let roomUser = await roomchatModel.findOne({
            id: megs.roomId,
        });

        if (!roomUser) {
            return null;
        }

        let newMessage = new MessagesModel();
        newMessage.id = uuidv5(megs.content + roomUser.messages.length, uuidv5.URL);
        newMessage.content = megs.content;
        newMessage.urlFile = megs.urlFile;
        newMessage.typeMegs = "MESSAGE";
        newMessage.roomId = megs.roomId;
        newMessage.userId = megs.userId;
        roomUser.messages.push(newMessage);
        await roomUser.save();
        return newMessage.toJSON();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRoomByIdService(userId: string) {
    try {
        let userCheck = await UserModel.findOne({
            id: userId,
        })
        if (!userCheck) {
            return { data : {error: "User is exist!"}, status: 401 };
        }
        if ("BANNED" in userCheck.role) {
            return { data : {error: "the user is banned!"}, status: 401 };
        }
        let roomUser = await roomchatModel.findOne({
            userId: userId,
        });
        if (!roomUser) {
            return { data : {error: "This room is exist!"}, status: 401 };
        }
        return { data : roomUser.toJSON(), status: 201 }
    } catch (error) {
        console.error(error);
        return { data : { error: "Get room failed" }, status: 500 };
    }
}