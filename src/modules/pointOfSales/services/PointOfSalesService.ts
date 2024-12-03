import { PointOfSalesRepository } from "../repositories/PointOfSalesRepository";
import { ResponseDto } from "@shared/dto/response.dto";
import { HttpStatus } from "@statusCode";
import { whereId } from "@utils/where-id";
import { CreatePointOfSalesDto } from "../dto/create-point-of-sales.dto";
import { UpdatePointOfSalesDto } from "../dto/update-point-of-sales.dto";

export class PointOfSalesService {
  constructor(private pointofsalesRepository: PointOfSalesRepository) {}

  async create(data: CreatePointOfSalesDto) {
    const pointOfSales = this.pointofsalesRepository.create(data);
    const newPointOfSales =
      await this.pointofsalesRepository.save(pointOfSales);

    return new ResponseDto({
      data: newPointOfSales,
      statusCode: HttpStatus.OK,
    });
  }

  async getAll(type: "all" | "pub" | "restaurant") {
    const whereClause = type === "all" ? {} : { isPub: type === "pub" };

    const data = await this.pointofsalesRepository.find({
      where: whereClause,
    });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async listAllRestaurant() {
    const data = await this.pointofsalesRepository.find({
      where: { isPub: false },
    });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async listAllPub() {
    const data = await this.pointofsalesRepository.find({
      where: { isPub: true },
    });

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async updateById(id: Id, data: UpdatePointOfSalesDto) {
    const pointOfSales = await this.pointofsalesRepository.findOne({
      where: whereId(id),
    });

    if (!pointOfSales) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Point of sales not found",
      });
    }

    const newPointOfSales = this.pointofsalesRepository.merge(
      pointOfSales,
      data,
    );

    const updatedPointOfSales =
      await this.pointofsalesRepository.save(newPointOfSales);

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: updatedPointOfSales,
    });
  }

  async getOneById(id: Id) {
    const data = await this.pointofsalesRepository.findOne({
      where: whereId(id),
      relations: { category: true },
    });

    if (!data) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Point of sales not found",
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  async deleteById(id: Id) {
    const data = await this.pointofsalesRepository.findOne({
      where: whereId(id),
    });

    if (!data) {
      return new ResponseDto({
        statusCode: HttpStatus.NOT_FOUND,
        data: "Point of sales not found",
      });
    }

    await this.pointofsalesRepository.softDelete(id);

    return new ResponseDto({
      statusCode: HttpStatus.NO_CONTENT,
      data: "Point of sales deleted",
    });
  }
}
