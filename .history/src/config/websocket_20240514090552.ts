import { Server, Socket } from "socket.io";
import { IMessages } from "../models";
import { addMessageService } from "../services/rooomchat.service";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let socketInstance: Socket | null = null;

export const roomHandler = (socket: Socket, io:  Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socketInstance = socket;

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
        console.log(newMessage.id)
        io.to(message.roomId).emit("add-message", newMessage);
    };

    socket.on("join-room", joinRoom);
    socket.on("sendNotify", sendNotify);
    socket.on("send-message", addMessage);
};

export const sendNotify = (content: any) => {
    if (socketInstance) {
        socketInstance.emit("notification", content);
    } else {
        console.error("Socket instance is not available.");
    }
};