import type { OnlineUser } from "../models/User.model";

class UserService {
  private onlineUsers: OnlineUser[] = [];

  addUser(socketId: string): void {
    this.onlineUsers.push({ socketId, userId: "" });
  }

  updateUserId(socketId: string, userId: string): void {
    const existingUserIndex = this.onlineUsers.findIndex(
      user => user.socketId === socketId
    );

    if (existingUserIndex !== -1) {
      this.onlineUsers[existingUserIndex] = { socketId, userId };
    } else if (!this.onlineUsers.some(user => user.userId === userId)) {
      this.onlineUsers.push({ socketId, userId });
    } else {
      this.onlineUsers = this.onlineUsers.map(user =>
        user.userId === userId ? { socketId, userId } : user
      );
    }
  }

  removeUser(socketId: string): void {
    this.onlineUsers = this.onlineUsers.filter(
      user => user.socketId !== socketId
    );
  }

  getUserBySocketId(socketId: string): OnlineUser | null {
    return this.onlineUsers.find(user => user.socketId === socketId) ?? null;
  }

  getOnlineUsers(): OnlineUser[] {
    return this.onlineUsers;
  }

  getUserCount(): number {
    return this.onlineUsers.length;
  }
}

export default new UserService();