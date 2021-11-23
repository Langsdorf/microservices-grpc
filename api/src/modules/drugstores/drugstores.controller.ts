import { Body, DELETE, GET, Params, PATCH, POST, Response } from "@decorators";
import express from "express";
import DrugstoresService from "./drugstores.service";

export default class DrugstoresController {
  constructor(
    private readonly drugstoresService: DrugstoresService = new DrugstoresService()
  ) {}

  @GET("/")
  public async getAll(@Response() res: express.Response) {
    res.send(await this.drugstoresService.getAll());
  }

  @GET("/:id")
  public async getOne(
    @Response() res: express.Response,
    @Params() params: { id: string }
  ) {
    res.send(await this.drugstoresService.getOne(parseInt(params.id)));
  }

  @POST()
  public async create(@Response() res: express.Response, @Body() body: any) {
    res.send(await this.drugstoresService.create(body));
  }

  @DELETE("/:id")
  public async delete(
    @Response() res: express.Response,
    @Params() params: any
  ) {
    res.send(await this.drugstoresService.delete(parseInt(params.id)));
  }

  @PATCH("/:id")
  public async update(@Response() res: express.Response, @Body() body: any, @Params() params: any) {
    res.send(await this.drugstoresService.update(parseInt(params.id), body));
  }
}
