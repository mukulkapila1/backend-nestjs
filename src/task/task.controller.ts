import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createDate: Date;
    completedDate: Date;
}
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // Create a new task
    @Post()
    createTask(@Body() body: {
        title: string,
        description: string,
        completed: boolean,
        createDate: Date,
        completedDate: Date
    }): Task {
        const { title, description, completed, createDate, completedDate } = body;
        return this.taskService.createTask(title, description, completed, createDate, completedDate);
    }

    // Get all task
    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    // Get a task by ID
    @Get(':id')
    getTaskById(@Param('id') id: number): Task {
        return this.taskService.getTaskById(id);
    }

    // Update a task by ID
    @Put(':id')
    updateTask(
        @Param('id') id: number,
        @Body() body: {
            title: string,
            description: string,
            completed: boolean,
            createDate: Date,
            completedDate: Date
        },
    ): Task {
        const { title, description, completed, createDate, completedDate } = body;
        return this.taskService.updateTask(id, title, description, completed, createDate, completedDate);
    }

    // Delete a task by ID
    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    }
}
