import { useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores/tast/task.store';
import { DragEvent } from 'react';
import { TaskStatus } from '../interfaces';

interface Options {
    status: TaskStatus;
}

const useTasksHook = ({ status }: Options) => {
    const isDragging = useTaskStore((state) => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
    const addTask = useTaskStore((state) => state.addTask);

    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Add Task',
            inputLabel: 'Task Title',
            input: 'text',
            inputPlaceholder: 'Enter Task Title',
            showCancelButton: true,
            confirmButtonText: 'Add Task',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'Task Title is required!';
                }
            },
        });
        if (!isConfirmed) return;

        addTask(value, status);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);
    };

    return {
        isDragging,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
};
export default useTasksHook;
