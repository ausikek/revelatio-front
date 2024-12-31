import { PrismaClient } from "@prisma/client";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
