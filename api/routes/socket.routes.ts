import type { Server, Socket } from "socket.io";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";

const userController = new UserController();
const chatController = new ChatController();

export function registerSocketEvents(io: Server): void {
  io.on("connection", (socket: Socket) => {
    // Manejar conexión
    userController.handleConnection(socket, io);

    // Evento: nuevo usuario
    socket.on("newUser", (userId: string) => {
      userController.handleNewUser(socket, io, userId);
    });

    // Evento: mensaje de chat
    socket.on("chat:message", (payload) => {
      chatController.handleMessage(socket, io, payload);
    });

    // Evento: desconexión
    socket.on("disconnect", () => {
      userController.handleDisconnect(socket, io);
    });
  });
}