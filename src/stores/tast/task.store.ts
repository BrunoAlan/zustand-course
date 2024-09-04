import type { Task, TaskStatus } from '../../interfaces';
import { create, StateCreator } from 'zustand';

interface TaskState {
    tasks: Record<string, Task>; // same as => tasks: { [key: string]: Task };

    getTaskByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
    tasks: {
        '1': {
            id: '1',
            title: 'Task 1',
            status: 'open',
        },
        '2': {
            id: '2',
            title: 'Task 2',
            status: 'in-progress',
        },
        '3': {
            id: '3',
            title: 'Task 3',
            status: 'open',
        },
        '4': {
            id: '4',
            title: 'Task 4',
            status: 'open',
        },
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(
            (task: Task) => task.status === status
        );
    },
});

export const useTaskStore = create<TaskState>()(storeApi);
