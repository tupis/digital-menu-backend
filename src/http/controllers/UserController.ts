import { Request, Response } from "express";
import { getUserService } from "@modules/user/UserServiceFactory";
import { UserService } from "@modules/user/services/UserService";
import { CreateUserDto } from "@modules/user/dto/create-user.dto";

export class UserController {
  constructor(private readonly userService: UserService = getUserService()) {}
  async getAll(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.getAllUsers();
    return response.status(statusCode).json(data);
  }
  async getById(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.getUserById(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.createUser(
      request.body as CreateUserDto,
    );
    return response.status(statusCode).json(data);
  }

  async getByEmail(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.getUserByEmail(
      request.params.email,
    );
    return response.status(statusCode).json(data);
  }

  async deleteById(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.deleteUserById(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }
}
