import { devtools } from 'zustand/middleware';
import type { Task, TaskStatus } from '../../interfaces';
import { create, StateCreator } from 'zustand';
import { v4 as uuid4 } from 'uuid';

interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task>; // same as => tasks: { [key: string]: Task };

    getTaskByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;

    setDraggingTaskId: (id: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [['zustand/devtools', never]]> = (
    set,
    get
) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(
            (task: Task) => task.status === status
        );
    },

    addTask(title: string, status: TaskStatus) {
        const newTask: Task = { id: uuid4(), title, status };
        set((state) => ({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask,
            },
        }));
    },

    setDraggingTaskId(taskId: string) {
        set({ draggingTaskId: taskId });
    },
    removeDraggingTaskId() {
        set({ draggingTaskId: undefined });
    },

    changeTaskStatus(taskId: string, status: TaskStatus) {
        const task = get().tasks[taskId];
        task.status = status;
        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: task,
            },
        }));
    },

    onTaskDrop(status: TaskStatus) {
        const draggingTaskId = get().draggingTaskId;
        if (!draggingTaskId) return;
        get().changeTaskStatus(draggingTaskId, status);
        get().removeDraggingTaskId();
    },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
