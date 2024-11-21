import { HttpStatus } from "@statusCode";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ResponseDto } from "@shared/dto/response.dto";
import { Product } from "../entities/Product";
import { whereId } from "@utils/where-id";
import { UpdateProductDto } from "../dto/update-product.dto";

import { ProductOptionalRepository } from "../repositories/ProductOptionalRepository";
import { CreateOptionalDto } from "../dto/create-optional.dto";

export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly productOptionalRepository: ProductOptionalRepository = new ProductOptionalRepository(),
  ) {}

  async create({ optional, ...data }: CreateProductDto) {
    const product = this.productsRepository.create(data);

    if (optional) {
      product.optionals = await this.createOptionals(optional);
    }

    const newProduct = await this.productsRepository.save(product);

    return new ResponseDto<Product>({
      statusCode: HttpStatus.CREATED,
      data: newProduct,
    });
  }

  async getAll() {
    const data = await this.productsRepository.find({
      relations: { optionals: true },
    });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async getOne(id: Id) {
    const data = await this.productsRepository.findOne({ where: whereId(id) });

    if (!data) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Product not found",
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async update(id: Id, { optional, ...data }: UpdateProductDto) {
    const productToUpdate = await this.productsRepository.findOne({
      where: whereId(id),
    });

    if (!productToUpdate) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Product not found",
      });
    }

    if (optional) {
      await this.productOptionalRepository.deleteByIdProduct(id);
      productToUpdate.optionals = await this.createOptionals(optional);
    }

    const product = this.productsRepository.merge(productToUpdate, data);
    await this.productsRepository.save(product);

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: product,
    });
  }

  async delete(id: Id) {
    const product = await this.productsRepository.findOne({
      where: whereId(id),
      relations: { optionals: true },
    });

    if (!product) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Product not found",
      });
    }

    if (product.optionals.length > 0) {
      await this.productOptionalRepository.deleteByIdProduct(id);
    }

    await this.productsRepository.softRemove(product);

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: "Product deleted",
    });
  }

  private async createOptionals(optionals: CreateOptionalDto[]) {
    const promises = await optionals.map(async (optional) => {
      return await this.productOptionalRepository.createAndSave(optional);
    });

    return await Promise.all(promises);
  }
}
