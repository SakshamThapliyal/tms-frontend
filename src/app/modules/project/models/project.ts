export interface Project {
  projectId: number;

  name: string;

  description?: string;

  startDate: Date;

  endDate?: Date;

  createdByUserId: number;

  createdAt?: Date;

  updatedAt?: Date;
}
