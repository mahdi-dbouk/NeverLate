import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
