import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should create a task', () => {
    let completed = true;
    const task = taskService.createTask('TASK 1', 'task desc', completed , new Date(),new Date());
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('TASK 1');
    expect(task.description).toBe('task desc');
    expect(task.completed).toBe(true);
    expect(task.completedDate).toBeDefined;
    expect(task.createDate).toBeDefined;
  });

  it('should get all tasks', () => {
    let completed = true;
    taskService.createTask('TASK 1', 'task desc', completed , new Date(),new Date());
    const task = taskService.getAllTasks();
    expect(task.length).toBe(1);
  });

  it('should get task by id', () => {
    let completed = true;
    const createdtask =  taskService.createTask('TASK 1', 'task desc', completed , new Date(),new Date());
    const task = taskService.getTaskById(createdtask.id);
    expect(task).toBeDefined();
    expect(task.title).toBe('TASK 1');
  });


  it('should update a task', () => {
    let completed = true;
    const createdtask =  taskService.createTask('TASK 1', 'task desc', completed , new Date(),new Date());
    const updatedtask = taskService.updateTask(createdtask.id, 'TASK 1 new', 'task desc 1', completed , new Date(),new Date());
    expect(updatedtask.title).toBe('TASK 1 new');
    expect(updatedtask.description).toBe('task desc 1');
  });

  it('should delete a task', () => {
    let completed = true;
    const createdtask =  taskService.createTask('TASK 1', 'task desc', completed , new Date(),new Date());
    const result = taskService.deleteTask(createdtask.id);
    expect(result).toBe(true);
  });

  it('should not delete a non-existing task', () => {
    const result = taskService.deleteTask(999);
    expect(result).toBe(false);
  });

});
