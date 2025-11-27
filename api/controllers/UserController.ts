import type { Socket, Server } from "socket.io";
import UserService from "../services/UserService";

export class UserController {
  handleConnection(socket: Socket, io: Server): void {
    UserService.addUser(socket.id);
    io.emit("usersOnline", UserService.getOnlineUsers());
    
    console.log(
      "A user connected with id:",
      socket.id,
      "there are now",
      UserService.getUserCount(),
      "online users"
    );
  }

  handleNewUser(socket: Socket, io: Server, userId: string): void {
    if (!userId) {
      return;
    }

    UserService.updateUserId(socket.id, userId);
    io.emit("usersOnline", UserService.getOnlineUsers());
  }

  handleDisconnect(socket: Socket, io: Server): void {
    UserService.removeUser(socket.id);
    io.emit("usersOnline", UserService.getOnlineUsers());
    
    console.log(
      "A user disconnected with id:",
      socket.id,
      "there are now",
      UserService.getUserCount(),
      "online users"
    );
  }
}