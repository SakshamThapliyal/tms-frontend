export interface TaskSummary {
  taskId: number;

  taskTitle: string;

  projectId: number;

  assigneeName: string;

  projectName: string;

  status: string;

  priority: string;

  dueDate: Date | null;
}
