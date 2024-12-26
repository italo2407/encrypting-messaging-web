import { Injectable } from '@nestjs/common';
import {
  CrudBaseRepository,
  PrismaCrudBaseRepository,
} from 'src/common/repository/crud-base.repository';
import { PrismaUserMapper } from 'src/database/prisma/mappers/user.mapper';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/domain/entities/user';

export abstract class UserRepository extends CrudBaseRepository<User> {
  abstract findByEmail(email: string): Promise<User>;
}

@Injectable()
export class PrismaUserRepository extends PrismaCrudBaseRepository<User> implements UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user, PrismaUserMapper);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return PrismaUserMapper.toEntity(user);
  }
}
