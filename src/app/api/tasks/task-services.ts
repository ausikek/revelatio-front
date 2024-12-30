import { PrismaClient, Prisma } from "@prisma/client";

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

  async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
