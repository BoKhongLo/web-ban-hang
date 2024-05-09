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
            return { data : {error: "The user is exist!"}, status: 401 };
        }
        if (!(userCheck.role.includes("ADMIN") || userCheck.role.includes("TELESALES"))) {
            return { data: { error: "The user is not permission" }, status: 401 };
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
        let checkRoom = await roomchatModel.findOne({ userId: userId})
        if (checkRoom) {
            return checkRoom.toJSON().id
        }
        let newRoom = new roomchatModel();
        newRoom.id = await createId(userId, roomchatModel);
        newRoom.userId = userId;
        newRoom.messages = new Types.DocumentArray<IMessages>([]);
        newRoom.isBlock = false;
        newRoom.isDisplay = true;
        await newRoom.save();
        return newRoom.toJSON().id;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addMessageService(megs: IMessages) {
    try {
        let userCheck = await UserModel.findOne({
            id: megs.userId,
        })
        if (!userCheck) {
            console.log("wrong user")
            return null;
        }
        let roomUser = await roomchatModel.findOne({
            id: megs.roomId,
        });
        if (!roomUser) {
            console.log("wrong room")
            return null;
        }

        if (roomUser.isDisplay == false || roomUser.isBlock == true) {
            return null;
        }

        if (roomUser.userId !== megs.userId) {
            if (!(userCheck.role.includes("ADMIN") || userCheck.role.includes("TELESALES"))) {
                return null;
            }
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

export async function getRoomByIdService(adminId: string, roomId: string){
    try {
        let userCheck = await UserModel.findOne({
            id: adminId,
        })
        if (!userCheck) {
            return { data : {error: "The user is exist!"}, status: 401 };
        }
        if (!(userCheck.role.includes("ADMIN") || userCheck.role.includes("TELESALES"))) {
            return { data: { error: "The user is not permission" }, status: 401 };
        }
        let roomUser = await roomchatModel.findOne({
            id: roomId
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

export async function getRoomUserService(userId: string, roomId: string){
    try {
        let roomUser = await roomchatModel.findOne({
            id: roomId,
            userId: userId
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