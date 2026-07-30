import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    if (!status) {
      return '';
    }

    switch (status) {
      case 'ToDo':
        return 'To Do';

      case 'InProgress':
        return 'In Progress';

      case 'Completed':
        return 'Completed';

      default:
        return status;
    }
  }
}
