export interface CreateTask {
  title: string;

  description?: string;

  status: string;

  priority: string;

  dueDate?: Date;

  projectId: number;

  assignedToUserId?: number;
}
