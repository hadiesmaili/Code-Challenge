
export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: number;
}

export type FilterStatus = 'all' | 'completed' | 'pending';

export interface TaskState {
  items: Task[];
  filter: FilterStatus;
}
