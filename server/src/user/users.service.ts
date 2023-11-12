import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserCredentialsDto } from './DTO/user-credentials.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });
    return newUser;
  }

  async login(userCredentialsDto: UserCredentialsDto) {
    const { email, password } = userCredentialsDto;
    const authUser = this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        hashedPassword: true,
      },
    });
    console.log(await authUser);
    if (await authUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        (await authUser).hashedPassword,
      );
      if (isPasswordCorrect) {
        return { email: (await authUser).email, name: (await authUser).name, id: (await authUser).id };
      } else {
        return { error: 'user not found' };
      }
    } else {
      return { error: 'user not found' };
    }
  }
}
