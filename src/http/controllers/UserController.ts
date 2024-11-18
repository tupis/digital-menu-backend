import { Request, Response } from "express";
import { getUserService } from "@modules/user/UserServiceFactory";
import { UserService } from "@modules/user/services/UserService";

export class UserController {
  constructor(private readonly userService: UserService = getUserService()) {}
  async getAll(request: Request, response: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return response.status(200).json(users);
  }
  async getById(request: Request, response: Response): Promise<Response> {
    const user = await this.userService.getUserById(request.params.id as Id);
    return response.status(200).json(user);
  }

  async getByEmail(request: Request, response: Response): Promise<Response> {
    const user = await this.userService.getUserByEmail(request.params.email);
    return response.status(200).json(user);
  }

  async deleteById(request: Request, response: Response): Promise<Response> {
    await this.userService.deleteUserById(request.params.id as Id);
    return response.status(204).send();
  }
}
