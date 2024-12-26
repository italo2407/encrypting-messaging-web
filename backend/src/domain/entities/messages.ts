export class Messages {
  id?: string;
  title: string;
  s3Path: string;
  createdAt: Date;
  updatedAt: Date;
  senderId?: string;
  receiverId: string;
  content?: string;
  encryptedContent?: string;

  constructor(data: Partial<Messages>) {
    Object.assign(this, data);
  }
}
