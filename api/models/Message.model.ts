export interface ChatMessage {
  userId: string;
  message: string;
  timestamp: string;
}

export interface ChatMessagePayload {
  userId: string;
  message: string;
  timestamp?: string;
}