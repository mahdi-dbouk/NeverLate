import { Injectable } from '@nestjs/common';
import { TodoPriority, TodoStatus } from './todos.model';
import { CreateTodoDto } from './DTO/createTodo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './DTO/updateTodo.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodosService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getAllTodos(token: string): Promise<any> {
    const id = this.extractUserIdFromToken(token);
    const allTodos = await this.prisma.todo.findMany({
      where: {
        userId: id,
      },
    });
    return allTodos;
  }

  async createTodo(token: string, createTodoDto: CreateTodoDto): Promise<any> {
    const id = this.extractUserIdFromToken(token);
    const { description, priority, date } = createTodoDto;

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
        userId: id,
      },
    });

    return todo;
  }

  async deleteTodoById(token: string, id: number) {
    const userId = this.extractUserIdFromToken(token);

    const isTodoFound = await this.prisma.todo.count({
      where: {
        id,
      },
    });

    if (isTodoFound) {
      const todo = await this.prisma.todo.delete({
        where: {
          id,
          userId,
        },
      });

      if (await todo) {
        return { message: 'deleted' };
      } else {
        return { message: 'failed to delete' };
      }
    } else {
      return { message: 'todo not found' };
    }
  }

  async updateTodoById(
    id: number,
    token: string,
    updateTodoDto: UpdateTodoDto,
  ) {
    const userId = this.extractUserIdFromToken(token);
    const isTodoFound = await this.prisma.todo.count({
      where: {
        id,
        userId,
      },
    });
    if (isTodoFound) {
      const { description, priority, status, date } = updateTodoDto;
      const updatedTodo = await this.prisma.todo.update({
        data: {
          description,
          priority:
            priority === 'high'
              ? TodoPriority.HIGH
              : priority === 'medium'
              ? TodoPriority.MEDIUM
              : TodoPriority.LOW,
          status:
            status === 'pending' ? TodoStatus.PENDING : TodoStatus.COMPLETED,
          date: new Date(date).toISOString(),
        },
        where: {
          id,
        },
      });

      return updatedTodo;
    } else {
      return { message: 'todo was not found' };
    }
  }

  async markCompleted(id: number, token: string) {
    const userId = this.extractUserIdFromToken(token);
    const isTodoFound = await this.prisma.todo.count({
      where: {
        id,
        userId,
      },
    });
    if (isTodoFound) {
      const updatedTodo = await this.prisma.todo.update({
        data: {
          status: TodoStatus.COMPLETED,
        },
        where: {
          id,
        },
      });

      return updatedTodo;
    } else {
      return { message: 'todo was not found' };
    }
  }

  extractUserIdFromToken(token: string): number {
    const verifiedClaims = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const { id }: { id: number } = verifiedClaims;
    return id;
  }
}
