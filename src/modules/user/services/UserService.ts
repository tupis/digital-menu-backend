import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { generateToken } from "@utils/jwt";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { RoleRepository } from "../repositories/RoleRepository";
import { Role } from "../entities/Role";
import { CreateUserDto } from "../dto/create-user.dto";
import { ResponseDto } from "@shared/dto/response.dto";
import { HttpStatus } from "@statusCode";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly roleRepository: RoleRepository = new RoleRepository(),
  ) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(
      data.email as string,
    );

    if (existingUser) {
      return new ResponseDto({
        statusCode: HttpStatus.BAD_REQUEST,
        data: "User already exists",
      });
    }

    const user = this.userRepository.create(data);

    if (data.rolesId && data.rolesId.length > 0) {
      const promise = data.rolesId.map(async (id) => {
        return await this.roleRepository.findById(id);
      });

      let roles = await Promise.all(promise);

      if (!roles || roles.length === 0) {
        const defaultRole = await this.roleRepository.findByName("waiter");
        roles = [defaultRole];
      }

      user.roles = roles as unknown as Role[];
    } else {
      const defaultRole = await this.roleRepository.findByName("waiter");
      user.roles = [defaultRole!];
    }

    const newUser = await this.userRepository.save(user);
    return new ResponseDto({
      statusCode: HttpStatus.CREATED,
      data: newUser,
    });
  }

  async register(data: RegisterUserDto) {
    const existingUser = await this.userRepository.findByEmail(
      data.email as string,
    );

    if (existingUser) {
      throw new Error("Usuário já existe com este email");
    }

    const user = this.userRepository.create(data);

    const defaultRole = await this.roleRepository.findByName("waiter");
    user.roles = [defaultRole!];

    const newUser = await this.userRepository.save(user);

    return new ResponseDto({
      statusCode: HttpStatus.CREATED,
      data: newUser,
    });
  }

  async getAllUsers() {
    const users = await this.userRepository.find({
      relations: { roles: true },
    });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: users,
    });
  }

  async authenticateUser(data: LoginUserDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return new ResponseDto({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: "Invalid credentials",
      });
    }

    const accessToken = generateToken({ id: user.id, email: user.email });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: { accessToken },
    });
  }

  async getUserById(id: Id) {
    const user = await this.userRepository.findById(id);
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  async deleteUserById(id: Id) {
    const user = await this.userRepository.findById(id);
    await this.userRepository.softDelete(user!.id);

    return new ResponseDto({
      statusCode: HttpStatus.NO_CONTENT,
      data: "User deleted",
    });
  }
}
