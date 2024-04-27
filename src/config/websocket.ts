import { Socket } from "socket.io";
import { IMessages } from "../models";
import { addMessageService } from "../services/rooomchat.service";

export const roomHandler = (socket: Socket) => {
    const joinRoom = ({ roomId }) => {
        socket.join(roomId);
        console.log(`Joined ${roomId}`);
        socket.on("disconnect", () => {
            console.log("user left the room");
        });
    };
    const sendNotify = (content: any) => {
        socket.emit(content);
    };

    const addMessage = async (message: IMessages) => {
        let newMessage = await addMessageService(message)
        if (newMessage == null) return;
        socket.to(message.roomId).emit("add-message", newMessage);
    };

    socket.on("join-room", joinRoom);
    socket.on("sendNotify", sendNotify);
    socket.on("send-message", addMessage);
};