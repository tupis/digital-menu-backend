import { CreateCategoryDto } from "@modules/products/dto/create-category.dto";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { ResponseDto } from "@shared/dto/response.dto";
import { HttpStatus } from "@statusCode";
import { whereId } from "@utils/where-id";
import { AssociateProductsDto } from "../dto/associate-products.dto";
import { ProductsRepository } from "@modules/products/repositories/ProductsRepository";
import { PointOfSalesRepository } from "@modules/pointOfSales/repositories/PointOfSalesRepository";

export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductsRepository,
    private readonly pointOfSalesRepository: PointOfSalesRepository,
  ) {}

  async create({ pointOfSalesId, ...data }: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);

    const pdv = await this.pointOfSalesRepository.findOne({
      where: whereId(pointOfSalesId),
    });

    if (!pdv) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "PDV not found",
      });
    }

    category.pointOfSales = pdv;

    const newCategory = await this.categoryRepository.save(category);

    return new ResponseDto({
      data: newCategory,
      statusCode: HttpStatus.OK,
    });
  }

  async update(id: Id, data: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: whereId(id),
    });
    if (!category) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Category not found",
      });
    }

    const newCategory = this.categoryRepository.merge(category, data);
    const updatedCategory = await this.categoryRepository.save(newCategory);

    return new ResponseDto({
      data: updatedCategory,
      statusCode: HttpStatus.OK,
    });
  }

  async getOne(id: Id) {
    const category = await this.categoryRepository.findOne({
      where: whereId(id),
      relations: { products: true },
    });

    if (!category) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Category not found",
      });
    }

    return new ResponseDto({
      data: category,
      statusCode: HttpStatus.OK,
    });
  }

  async getAll() {
    const data = await this.categoryRepository.find();
    return new ResponseDto({
      data,
      statusCode: HttpStatus.OK,
    });
  }

  async delete(id: Id) {
    const category = await this.categoryRepository.findOne({
      where: whereId(id),
    });
    if (!category) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Category not found",
      });
    }
    await this.categoryRepository.softRemove(category);
    return new ResponseDto({
      data: "Category deleted",
      statusCode: HttpStatus.OK,
    });
  }

  async associateProducts(id: Id, data: AssociateProductsDto) {
    const products = await this.productRepository.findManyProductsById(
      data.products,
    );

    const category = await this.categoryRepository.findOne({
      where: whereId(id),
      relations: { products: true },
    });

    if (!category) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Category not found",
      });
    }

    const associate = await this.categoryRepository.associateProducts(
      category,
      products,
    );

    const updatedCategory = await this.getOne(associate.id);

    return new ResponseDto({
      data: updatedCategory.data,
      statusCode: updatedCategory.statusCode,
    });
  }
}
