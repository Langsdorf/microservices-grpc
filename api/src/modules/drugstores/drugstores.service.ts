import { drugstoreClient } from "src/grpc/services";
import { promisify } from "util";

export default class DrugstoresService {
  async getAll() {
    const response = promisify(drugstoreClient.GetAllDrugstores).bind(
      drugstoreClient
    );

    return await response({});
  }

  async getOne(id: number) {
    const response = promisify(drugstoreClient.GetDrugstoreById).bind(
      drugstoreClient
    );

    return await response({ id: id });
  }

  async create(drugstore: any) {
    const response = promisify(drugstoreClient.CreateDrugstore).bind(
      drugstoreClient
    );

    return await response({ drugstore });
  }

  async delete(id: number) {
    const response = promisify(drugstoreClient.DeleteDrugstore).bind(
      drugstoreClient
    );

    return await response({ id: id });
  }

  async update(id: number, drugstore: any) {
    const response = promisify(drugstoreClient.UpdateDrugstore).bind(
      drugstoreClient
    );

    return await response({ drugstore: { ...drugstore, id: id } });
  }
}
