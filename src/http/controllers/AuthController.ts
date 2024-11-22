import { Request, Response } from "express";
import { getUserService } from "@modules/user/UserServiceFactory";
import { UserService } from "@modules/user/services/UserService";
import { LoginUserDto } from "@modules/user/dto/login-user.dto";
import { RegisterUserDto } from "@modules/user/dto/register-user.dto";

export class AuthController {
  constructor(private readonly userService: UserService = getUserService()) {}
  async login(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.authenticateUser(
      request.body as LoginUserDto,
    );
    return response.status(statusCode).json(data);
  }

  async register(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.userService.register(
      request.body as RegisterUserDto,
    );
    return response.status(statusCode).json(data);
  }
}
