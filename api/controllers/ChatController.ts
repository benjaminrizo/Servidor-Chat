import type { Socket, Server } from "socket.io";
import type { ChatMessagePayload } from "../models/Message.model";
import ChatService from "../services/ChatService";
import UserService from "../services/UserService";

export class ChatController {
  handleMessage(socket: Socket, io: Server, payload: ChatMessagePayload): void {
    const sender = UserService.getUserBySocketId(socket.id);
    const fallbackUserId = sender?.userId || socket.id;

    const message = ChatService.createMessage(payload, fallbackUserId);

    if (!message) {
      return;
    }

    io.emit("chat:message", message);
    
    console.log(
      "Relayed chat message from:",
      message.userId,
      "message:",
      message.message
    );
  }
}