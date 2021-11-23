import { Body, DELETE, GET, Params, PATCH, POST, Response } from "@decorators";
import express from "express";
import ProductsService from "./products.service";

export default class ProductsController {
  constructor(
    private readonly productsService: ProductsService = new ProductsService()
  ) {}

  @GET("/")
  public async getAll(@Response() res: express.Response) {
    res.send(await this.productsService.getAll());
  }

  @GET("/:id")
  public async getOne(
    @Response() res: express.Response,
    @Params() params: { id: string }
  ) {
    res.send(await this.productsService.getOne(parseInt(params.id)));
  }

  @POST()
  public async create(@Response() res: express.Response, @Body() body: any) {
    res.send(await this.productsService.create(body));
  }

  @DELETE("/:id")
  public async delete(
    @Response() res: express.Response,
    @Params() params: any
  ) {
    res.send(await this.productsService.delete(parseInt(params.id)));
  }

  @PATCH("/:id")
  public async update(
    @Response() res: express.Response,
    @Body() body: any,
    @Params() params: any
  ) {
    res.send(await this.productsService.update(parseInt(params.id), body));
  }

  @POST("/:id/clone")
  public async clone(@Response() res: express.Response, @Params() params: any) {
    res.send(await this.productsService.clone(parseInt(params.id)));
  }
}
