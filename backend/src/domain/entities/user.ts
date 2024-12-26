export class User {
  id?: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  publicKey: string;
  privateKey: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
