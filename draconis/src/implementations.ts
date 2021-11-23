import { sendUnaryData, ServerUnaryCall } from "grpc";
import { getRepository } from "typeorm";
import { Product } from "./entity/Product";

export default {
  async GetProductById(
    call: ServerUnaryCall<Partial<Product>>,
    callback: sendUnaryData<any>
  ) {
    const { id } = call.request;
    const product = await getRepository(Product).findOne(id);
    callback(null, { product });
  },
  async GetAllProducts(
    call: ServerUnaryCall<Partial<Product>>,
    callback: sendUnaryData<any>
  ) {
    const products = await getRepository(Product).find();
    callback(null, { products });
  },
  async CreateProduct(
    call: ServerUnaryCall<{ product: Partial<Product> }>,
    callback: sendUnaryData<any>
  ) {
    const { product } = call.request;
    const newProduct = await getRepository(Product).save(product);
    callback(null, { product: newProduct });
  },
  async DeleteProduct(
    call: ServerUnaryCall<{ id: number }>,
    callback: sendUnaryData<any>
  ) {
    const { id } = call.request;
    
    await getRepository(Product).delete(id);

    callback(null, {});
  },
  async UpdateProduct(
    call: ServerUnaryCall<{ product: Partial<Product> }>,
    callback: sendUnaryData<any>
  ) {
    const { product } = call.request;

    Object.keys(product).forEach((key) => {
      //@ts-ignore
      if (!product[key]) delete product[key];
    });

    await getRepository(Product).update(
      { id: product.id },
      { ...product }
    );

    callback(null, {});
  },
  async CloneProduct(
    call: ServerUnaryCall<Partial<Product>>,
    callback: sendUnaryData<any>
  ) {
    const { id } = call.request;
    const product = await getRepository(Product).findOne(id);

    const newProduct = await getRepository(Product).save({
      ...product,
      id: undefined,
    });

    callback(null, { product: newProduct });
  },
};
