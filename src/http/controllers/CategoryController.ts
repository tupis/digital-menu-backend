import { Request, Response } from "express";
import { getCategoryService } from "@modules/category/CategoryFactory";
import { CategoryService } from "@modules/category/services/CategoryService";
import { CreateCategoryDto } from "@modules/products/dto/create-category.dto";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = getCategoryService(),
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.categoryService.create(
      request.body as CreateCategoryDto,
    );
    return response.status(statusCode).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.categoryService.update(
      request.params.id as Id,
      request.body as CreateCategoryDto,
    );
    return response.status(statusCode).json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.categoryService.delete(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.categoryService.getAll();
    return response.status(statusCode).json(data);
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.categoryService.getOne(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }
}