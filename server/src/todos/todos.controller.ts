import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './DTO/createTodo.dto';
import { UpdateTodoDto } from './DTO/updateTodo.dto';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/interfaces/auth-request.interface';

@Controller('todos')
@UseGuards(JWTAuthGuard)
export class TodosController {
  constructor(private TodosService: TodosService) {}

  @Get()
  getAllTodos(@Req() request: AuthRequest): any {
    const token = request.token;
    return this.TodosService.getAllTodos(token);
  }
  @Post('create')
  createTodo(
    @Req() request: AuthRequest,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const token = request.token;
    return this.TodosService.createTodo(token, createTodoDto);
  }

  @Put('update/:id')
  updateTodoById(
    @Param('id') id: string,
    @Req() request: AuthRequest,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const token = request.token;
    return this.TodosService.updateTodoById(parseInt(id), token, updateTodoDto);
  }

  @Patch('update/:id/status')
  markCompleted(@Param('id') id: string, @Req() request: AuthRequest) {
    const token = request.token;
    return this.TodosService.markCompleted(parseInt(id), token);
  }

  @Delete('delete/:id')
  deleteTodoById(@Req() request: AuthRequest, @Param('id') id: string) {
    const token = request.token;
    return this.TodosService.deleteTodoById(token, parseInt(id));
  }
}
