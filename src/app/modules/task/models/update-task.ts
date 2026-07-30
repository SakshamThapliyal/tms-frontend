import { CreateTask } from './create-task';

export interface UpdateTask extends CreateTask {
  taskId: number;
}
