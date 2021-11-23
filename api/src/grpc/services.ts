import grpc from "grpc";
import proto from "./proto";

//@ts-ignore
const drugstoreClient = new proto.DrugstoreService(
  "doris:50051",
  grpc.credentials.createInsecure()
);

//@ts-ignore
const productsClient = new proto.ProductService(
  "draconis:50052",
  grpc.credentials.createInsecure()
);

export { drugstoreClient, productsClient };
