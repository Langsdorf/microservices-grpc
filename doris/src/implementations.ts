import { sendUnaryData, ServerUnaryCall } from "grpc";
import { Drugstore } from "./entity/Drugstore";
import { getRepository } from "typeorm";

export default {
  async GetDrugstoreById(
    call: ServerUnaryCall<Partial<Drugstore>>,
    callback: sendUnaryData<any>
  ) {
    const { id } = call.request;

    const drugstore = await getRepository(Drugstore).findOne(id);

    return callback(null, { drugstore });
  },
  async GetAllDrugstores(
    call: ServerUnaryCall<any>,
    callback: sendUnaryData<any>
  ) {
    const drugstores = await getRepository(Drugstore).find();

    callback(null, { drugstores });
  },
  async CreateDrugstore(
    call: ServerUnaryCall<{ drugstore: Partial<Drugstore> }>,
    callback: sendUnaryData<any>
  ) {
    const { drugstore } = call.request;

    const newDrugstore = await getRepository(Drugstore).save(drugstore);

    callback(null, { drugstore: newDrugstore });
  },
  async DeleteDrugstore(
    call: ServerUnaryCall<{ id: number }>,
    callback: sendUnaryData<any>
  ) {
    const { id } = call.request;
    
    await getRepository(Drugstore).delete(id);

    callback(null, {});
  },
  async UpdateDrugstore(
    call: ServerUnaryCall<{ drugstore: Partial<Drugstore> }>,
    callback: sendUnaryData<any>
  ) {
    const { drugstore } = call.request;

    Object.keys(drugstore).forEach((key) => {
      //@ts-ignore
      if (!drugstore[key]) delete drugstore[key];
    });

    await getRepository(Drugstore).update(
      { id: drugstore.id },
      { ...drugstore }
    );

    callback(null, {});
  },
};
