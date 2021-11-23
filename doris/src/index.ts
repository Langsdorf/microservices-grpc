import "reflect-metadata";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { Drugstore } from "./entity/Drugstore";
import { createConnection } from "typeorm";
import implementations from "./implementations";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "pb", "doris.proto"),
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
  entities: [Drugstore],
  synchronize: true,
  logging: false,
})
  .then(() => {
    console.log("Connected to database");

    const server = new grpc.Server();

    // @ts-ignore
    server.addService(proto.DrugstoreService.service, implementations);

    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

    server.start();
  })
  .catch((error) => console.log(error));
