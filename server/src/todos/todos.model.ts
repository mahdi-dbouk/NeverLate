export interface Todo {
  id: number;
  description: string;
  priority: TodoPriority;
  status: TodoStatus;
  date: Date;
}

export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum TodoPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
