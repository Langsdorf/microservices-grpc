import "reflect-metadata";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { Product } from "./entity/Product";
import { createConnection } from "typeorm";
import implementations from "./implementations";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "pb", "draconis.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDefinition);

createConnection({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "root",
  database: "dbdev",
  entities: [Product],
  synchronize: true,
  logging: false,
})
  .then(() => {
    console.log("Connected to database");

    const server = new grpc.Server();

    // @ts-ignore
    server.addService(proto.ProductService.service, implementations);

    server.bind("0.0.0.0:50052", grpc.ServerCredentials.createInsecure());

    server.start();
  })
  .catch((error) => console.log(error));
