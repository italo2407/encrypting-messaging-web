export interface Message {
  id?: string;
  title: string;
//   s3Path: string;
  createdAt: Date;
  updatedAt: Date;
  senderId?: string;
  receiverId: string;
  content?: string;
//   encryptedContent?: string;
}