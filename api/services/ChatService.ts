import type { ChatMessage, ChatMessagePayload } from "../models/Message.model";

class ChatService {
  createMessage(
    payload: ChatMessagePayload,
    fallbackUserId: string
  ): ChatMessage | null {
    const trimmedMessage = payload?.message?.trim();

    if (!trimmedMessage) {
      return null;
    }

    return {
      userId: payload.userId || fallbackUserId,
      message: trimmedMessage,
      timestamp: payload.timestamp ?? new Date().toISOString()
    };
  }
}

export default new ChatService();