import { Request, Response } from "express";
import { getProductsService } from "@modules/products/ProductsFactory";
import { ProductsService } from "@modules/products/services/ProductsService";
import { CreateProductDto } from "@modules/products/dto/create-product.dto";
import { UpdateProductDto } from "@modules/products/dto/update-product.dto";

export class ProductsController {
  constructor(
    private readonly productsService: ProductsService = getProductsService(),
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.productsService.create(
      request.body as CreateProductDto,
    );
    return response.status(statusCode).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.productsService.update(
      request.params.id as Id,
      request.body as UpdateProductDto,
    );
    return response.status(statusCode).json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.productsService.delete(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.productsService.getAll();
    return response.status(statusCode).json(data);
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const { data, statusCode } = await this.productsService.getOne(
      request.params.id as Id,
    );
    return response.status(statusCode).json(data);
  }
}
