import { ProjectStats } from './project-stats';
import { UserProductivity } from './user-productivity';

export interface Dashboard {

  totalUsers: number;

  totalProjects: number;

  totalTasks: number;

  projectStatistics: ProjectStats[];

  userProductivity: UserProductivity[];

}
