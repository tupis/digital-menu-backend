import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@utils/jwt";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      data.email as string,
    );

    if (existingUser) {
      throw new Error("Usuário já existe com este email");
    }

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async authenticateUser(data: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = generateToken({ id: user.id, email: user.email });
    return token;
  }

  async getUserById(id: Id): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async deleteUserById(id: Id) {
    const user = await this.getUserById(id);
    return await this.userRepository.softDelete(user!.id);
  }
}
