import { whereId } from "@utils/where-id";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { ProductOptional } from "../entities/ProductOptional";
import { ProductOptionalRepository } from "../repositories/ProductOptionalRepository";
import { ResponseDto } from "@shared/dto/response.dto";
import { HttpStatus } from "@statusCode";

export class ProductOptionalService {
  constructor(private productoptionalRepository: ProductOptionalRepository) {}

  create(data: CreateCategoryDto) {
    return this.productoptionalRepository.create(data);
  }

  async save(data: ProductOptional) {
    return await this.productoptionalRepository.save(data);
  }

  async deleteByIdProduct(id: Id) {
    const optional = await this.productoptionalRepository.findOne({
      where: {
        product: whereId(id),
      },
    });

    if (!optional) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Optional not found",
      });
    }

    return await this.productoptionalRepository.softRemove(optional);
  }
}
