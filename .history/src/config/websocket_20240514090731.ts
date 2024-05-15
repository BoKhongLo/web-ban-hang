import { Server, Socket } from "socket.io";
import { IMessages } from "../models";
import { addMessageService } from "../services/rooomchat.service";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let ioInstance:  Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export const roomHandler = (socket: Socket, io:  Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    ioInstance = io;

    const joinRoom = ({ roomId }) => {
        socket.join(roomId);
        console.log(`Joined ${roomId}`);
        socket.on("disconnect", () => {
            console.log("user left the room");
        });
    };

    const addMessage = async (message: IMessages) => {
        let newMessage = await addMessageService(message)
        if (newMessage == null) return;
        console.log(newMessage.id)
        io.to(message.roomId).emit("add-message", newMessage);
    };

    socket.on("join-room", joinRoom);
    socket.on("send-message", addMessage);
};

export const sendNotify = (content: any) => {
    if (ioInstance) {
        ioInstance.emit("new-user", content);
    } else {
        console.error("Socket instance is not available.");
    }
};