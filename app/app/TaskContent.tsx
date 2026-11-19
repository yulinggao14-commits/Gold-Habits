import React, { createContext, useContext, useState } from 'react';

export interface Task {
    id: string;
    title: string;
    reward: number;
    completed: boolean;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (title: string, reward: number) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Finish assignment', reward: 5, completed: false },
    ]);

    const addTask = (title: string, reward: number) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            reward,
            completed: false,
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used inside a TasksProvider');
    return context;
};