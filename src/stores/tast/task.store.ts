import { devtools } from 'zustand/middleware';
import type { Task, TaskStatus } from '../../interfaces';
import { create, StateCreator } from 'zustand';

interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task>; // same as => tasks: { [key: string]: Task };

    getTaskByStatus: (status: TaskStatus) => Task[];

    setDraggingTaskId: (id: string) => void;
    removeDraggingTaskId: () => void;
}

const storeApi: StateCreator<TaskState, [['zustand/devtools', never]]> = (
    set,
    get
) => ({
    draggingTaskId: undefined,
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

    setDraggingTaskId(taskId: string) {
        console.log(taskId);
        set({ draggingTaskId: taskId });
    },
    removeDraggingTaskId() {
        set({ draggingTaskId: undefined });
    },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
