import { productsClient } from "src/grpc/services";
import { promisify } from "util";

export default class ProductsService {
  async getAll() {
    const response = promisify(productsClient.GetAllProducts).bind(
      productsClient
    );

    return await response({});
  }

  async getOne(id: number) {
    const response = promisify(productsClient.GetProductById).bind(
      productsClient
    );

    return await response({ id: id });
  }

  async create(product: any) {
    const response = promisify(productsClient.CreateProduct).bind(
      productsClient
    );

    return await response({ product });
  }

  async delete(id: number) {
    const response = promisify(productsClient.DeleteProduct).bind(
      productsClient
    );

    return await response({ id: id });
  }

  async update(id: number, product: any) {
    const response = promisify(productsClient.UpdateProduct).bind(
      productsClient
    );

    return await response({ product: { ...product, id: id } });
  }

  async clone(id: number) {
    const response = promisify(productsClient.CloneProduct).bind(
      productsClient
    );

    return await response({ id: id });
  }
}
