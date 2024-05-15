import { Server, Socket } from "socket.io";
import { IMessages } from "../models";
import { addMessageService } from "../services/rooomchat.service";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

To enable the sendNotify function to be called from a controller or other parts of your application, you need to ensure it is accessible outside the roomHandler scope. Here’s how you can modify your code to achieve that:

Define the sendNotify function outside the roomHandler function so it can be exported and used elsewhere.
Store a reference to the socket instance to be used when calling sendNotify.
Here's how you can refactor your code to achieve this:

Step 1: Refactor sendNotify for External Use
typescript
Copy code
import { Server, Socket } from "socket.io";
import { IMessages } from "../models";
import { addMessageService } from "../services/rooomchat.service";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let socketInstance: Socket | null = null;
export const roomHandler = (socket: Socket, io:  Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
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