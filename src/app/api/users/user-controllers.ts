import { UserService } from "./user-services";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll() {
    return this.userService.getAll();
  }

  async getById(id: string) {
    return this.userService.getById(id);
  }

  async getByUsername(username: string) {
    return this.userService.getByUsername(username);
  }
}

const userController = new UserController();

export { userController };
