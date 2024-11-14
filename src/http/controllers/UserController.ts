import { Request, Response } from "express";
import { getUserService } from "@modules/user/UserServiceFactory";
import { UserService } from "@modules/user/services/UserService";

export class UserController {
  constructor(private readonly userService: UserService = getUserService()) {}

  async create(request: Request, response: Response): Promise<Response> {
    const user = await this.userService.createUser(request.body);
    return response.status(201).json(user);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return response.status(200).json(users);
  }

  async login(request: Request, response: Response): Promise<Response> {
    const token = await this.userService.authenticateUser(request.body);
    return response.status(200).json({ token });
  }
}
