import { Injectable } from '@nestjs/common';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createDate: Date;
    completedDate: Date;
}

@Injectable()
export class TaskService {
    private tasks: Task[] = [];
    private idCounter = 1;

    // Create a new task
    createTask(title: string,
        description: string,
        completed: boolean,
        createDate: Date,
        completedDate: Date): Task {
        const newtask: Task = {
            id: this.idCounter++,
            title,
            description,
            completed,
            createDate: new Date(),
            completedDate
        };
        this.tasks.push(newtask);
        return newtask;
    }

    // Get all tasks
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // Get tasks by ID
    getTaskById(id: number): Task {
        return this.tasks.find(task => task.id == id);
    }

    // Update a tasks by ID
    updateTask(id: number,
        title: string,
        description: string,
        completed: boolean,
        createDate: Date,
        completedDate: Date): Task {
        const taskIndex = this.tasks.findIndex(task => task.id == id);
        if (taskIndex === -1) return null;

        const updatedTask = { ...this.tasks[taskIndex], title, description, completed, createDate, completedDate };
        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    // Delete a task by ID
    deleteTask(id: number): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id == id);
        if (taskIndex === -1) return false;

        this.tasks.splice(taskIndex, 1);
        return true;
    }
}
