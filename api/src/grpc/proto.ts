import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const packageDefinition = protoLoader.loadSync(
  [
    path.join(__dirname, "pb", "doris.proto"),
    path.join(__dirname, "pb", "draconis.proto"),
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

export default grpc.loadPackageDefinition(packageDefinition);
