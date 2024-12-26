import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new NotFoundException();
      }
      const isPasswordMatching = await this.comparePassword(password, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, name: user.name, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  // Compare the password with the stored hashed password
  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
