export interface Task {
  taskId: number;

  title: string;

  description?: string;

  status: string;

  priority: string;

  dueDate?: Date;

  projectId: number;

  assignedToUserId?: number;

  createdAt: Date;

  updatedAt?: Date;
}
