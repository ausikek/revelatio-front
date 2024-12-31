import { PrismaClient } from "@prisma/client";
import { TaskDTO, UpdateTaskDTO } from "./task-dto";

export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() {
    return this.prisma.task.findMany();
  }

  async getById(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async getByUserId(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async create(data: TaskDTO) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        user: { connect: { id: data.user.id } },
      },
    });
  }

  async update(id: string, data: UpdateTaskDTO) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        user: { connect: { id: data.user.id } },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
