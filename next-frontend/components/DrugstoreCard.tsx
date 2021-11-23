import { Drugstore } from "../interfaces";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

export default function DrugstoreCard({ drugstore }: { drugstore: Drugstore }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({});

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/drugstores/${drugstore.id}`);

    window.location.reload();
  };

  const handleEdit = async () => {
    setModalOpen(false);

    await axios.patch(
      `http://localhost:3001/drugstores/${drugstore.id}`,
      editForm
    );

    window.location.reload();
  };

  return (
    <>
      <Modal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
      >
        <h1>Editar farmácia</h1>

        <div className="edit">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            defaultValue={drugstore.name}
            onChange={(e) => {
              setEditForm({ ...editForm, name: e.target.value });
            }}
          />

          <label>Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            defaultValue={drugstore.address}
            onChange={(e) => {
              setEditForm({ ...editForm, address: e.target.value });
            }}
          />

          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            defaultValue={drugstore.phone}
            onChange={(e) => {
              setEditForm({ ...editForm, phone: e.target.value });
            }}
          />

          <label>CNPJ</label>
          <input
            type="text"
            placeholder="CNPJ"
            defaultValue={drugstore.cnpj}
            onChange={(e) => {
              setEditForm({ ...editForm, cnpj: e.target.value });
            }}
          />

          <label>Responsável</label>
          <input
            type="text"
            placeholder="Responsável"
            defaultValue={drugstore.in_charge}
            onChange={(e) => {
              setEditForm({ ...editForm, in_charge: e.target.value });
            }}
          />

          <label>Hora de abertura</label>
          <input
            type="text"
            placeholder="Hora de abertura"
            defaultValue={drugstore.time_open}
            onChange={(e) => {
              setEditForm({ ...editForm, time_open: e.target.value });
            }}
          />

          <label>Hora de fechamento</label>
          <input
            type="text"
            placeholder="Hora de fechamento"
            defaultValue={drugstore.time_close}
            onChange={(e) => {
              setEditForm({ ...editForm, time_close: e.target.value });
            }}
          />

          <label>Logo</label>
          <input
            type="text"
            placeholder="Logo"
            defaultValue={drugstore.logo}
            onChange={(e) => {
              setEditForm({ ...editForm, logo: e.target.value });
            }}
          />

          <button onClick={handleEdit}>Salvar</button>
        </div>
      </Modal>
      <div className="drugstore">
        <img src={drugstore.logo} alt={drugstore.name} />
        <h1>{drugstore.name}</h1>
        <div className="drugstoreInfo">
          <p>Endereço: {drugstore.address}</p>
          <p>Número: {drugstore.phone}</p>
          <p>CNPJ: {drugstore.cnpj}</p>
          <p>Responsável: {drugstore.in_charge}</p>
          <p>
            Horário de funcionamento: {drugstore.time_open} -{" "}
            {drugstore.time_close}
          </p>
        </div>

        <div className="drugstoreFooter">
          <button onClick={handleDelete}>Apagar</button>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </>
  );
}
