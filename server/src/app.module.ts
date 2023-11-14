import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodosModule, PrismaModule, UserModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
