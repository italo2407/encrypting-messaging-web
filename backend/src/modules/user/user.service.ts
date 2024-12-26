import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/domain/entities/user';
import * as bcrypt from 'bcrypt';
import { AwsKmsService } from 'src/common/services/aws-kms.service';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly awsKmsService: AwsKmsService,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async findContainEmail(search: string): Promise<User[]> {
    return this.userRepository.findContainEmail(search);
  }

  async create(user: User): Promise<User> {
    const { publicKey, privateKey } = await this.awsKmsService.generateDataKeyPair();
    user.password = await this.hashPassword(user.password);
    user.publicKey = publicKey;
    user.privateKey = privateKey;

    return this.userRepository.create(user);
  }

  async update(user: User): Promise<User> {
    return this.userRepository.update(user.id, user);
  }

  async delete(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }

  // Hash the password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }
}
