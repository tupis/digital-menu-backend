import { Request, Response } from "express";
import { getPointOfSalesService } from "@modules/pointOfSales/PointOfSalesFactory";
import { PointOfSalesService } from "@modules/pointOfSales/services/PointOfSalesService";
import { CreatePointOfSalesDto } from "@modules/pointOfSales/dto/create-point-of-sales.dto";
import { UpdatePointOfSalesDto } from "@modules/pointOfSales/dto/update-point-of-sales.dto";

export class PointOfSalesController {
  constructor(
    private readonly pointOfSalesService: PointOfSalesService = getPointOfSalesService(),
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { data, statusCode } = await this.pointOfSalesService.create(
      req.body as CreatePointOfSalesDto,
    );
    return res.status(statusCode).json(data);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const type = (req.query.type ? req.query.type : "all") as
      | "all"
      | "pub"
      | "restaurant";

    const { data, statusCode } = await this.pointOfSalesService.getAll(type);
    return res.status(statusCode).json(data);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { data, statusCode } = await this.pointOfSalesService.getOneById(
      req.params.id as Id,
    );
    return res.status(statusCode).json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { data, statusCode } = await this.pointOfSalesService.deleteById(
      req.params.id as Id,
    );
    return res.status(statusCode).json(data);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { data, statusCode } = await this.pointOfSalesService.updateById(
      req.params.id as Id,
      req.body as UpdatePointOfSalesDto,
    );
    return res.status(statusCode).json(data);
  }
}
