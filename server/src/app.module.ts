import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/users.module';

@Module({
  imports: [TodosModule, PrismaModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
