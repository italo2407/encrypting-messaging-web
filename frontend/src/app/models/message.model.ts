import { SenderMessage } from "./senderMessage.model";

export interface Message {
  id: string,
  title: string,
//   s3Path: string,
  createdAt: Date,
  updatedAt: Date,
  sender: SenderMessage,
  // senderId?: string,
  receiverId: string,
  content?: string,
//   encryptedContent?: string
  isRead: boolean
}