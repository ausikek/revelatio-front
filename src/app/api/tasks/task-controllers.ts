import { TaskService } from "./task-services";
import { TaskDTO, UpdateTaskDTO } from "./task-dto";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async getAll() {
    return this.taskService.getAll();
  }

  async getById(id: string) {
    return this.taskService.getById(id);
  }

  async create(data: TaskDTO) {
    return this.taskService.create(data);
  }

  async update(id: string, data: UpdateTaskDTO) {
    return this.taskService.update(id, data);
  }

  async delete(id: string) {
    return this.taskService.delete(id);
  }
}
