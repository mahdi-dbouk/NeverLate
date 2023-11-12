import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/createTodo.dto';

@Controller('todos')
export class TodosController {
  constructor(private TodosService: TodosService) {}

  @Get()
  getAllTodos(@Body('userId') userId: number): any {
    return this.TodosService.getAllTodos(userId);
  }
  @Post('create')
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.TodosService.createTodo(createTodoDto);
  }
}
