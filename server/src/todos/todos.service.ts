import { Injectable } from '@nestjs/common';
import { TodoPriority, TodoStatus } from './todos.model';
import { CreateTodoDto } from './DTO/createTodo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos(userId: number): Promise<any> {
    const allTodos = await this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return allTodos;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<any> {
    const { userId, description, priority, date } = createTodoDto;

    const todo = await this.prisma.todo.create({
      data: {
        description,
        priority:
          priority === 'high'
            ? TodoPriority.HIGH
            : priority === 'medium'
            ? TodoPriority.MEDIUM
            : TodoPriority.LOW,
        date: new Date(date).toISOString(),
        status: TodoStatus.PENDING,
        userId,
      },
    });

    return todo;
  }
}