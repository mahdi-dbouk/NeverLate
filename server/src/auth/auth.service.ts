import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/users.service';
import { UserLoginDto } from './DTO/user-login.dto';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './DTO/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const { hashedPassword, ...data } = user;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      throw new NotFoundException('invalid email or password');
    }

    return {
      token: this.jwtService.sign({ id: data.id, email }),
      data,
    };
  }

  async register(registetUserDto: UserRegisterDto) {
    const user = await this.userService.createUser(registetUserDto);
    if (!user) {
      throw new HttpException(
        'Registration Failed',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const { hashedPassword, ...data } = user;
    return {
      token: this.jwtService.sign({ id: data.id, email: data.email }),
      data,
    };
  }
}
