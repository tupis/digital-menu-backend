import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@utils/jwt";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: Partial<User>): Promise<User> {
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

  async authenticateUser(data: {
    email: string;
    password: string;
  }): Promise<string> {
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
}
