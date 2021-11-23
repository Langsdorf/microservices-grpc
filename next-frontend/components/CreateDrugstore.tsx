import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

export default function CreateDrugstore({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [createForm, setCreateForm] = useState({});

  const handleSave = async () => {
    await axios.post(`http://localhost:3001/drugstores`, createForm);

    window.location.reload();
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <h1>Criar farmácia</h1>
      <div className="edit">
        <label>Nome</label>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => {
            setCreateForm({ ...createForm, name: e.target.value });
          }}
        />

        <label>Endereço</label>
        <input
          type="text"
          placeholder="Endereço"
          onChange={(e) => {
            setCreateForm({ ...createForm, address: e.target.value });
          }}
        />

        <label>Telefone</label>
        <input
          type="text"
          placeholder="Telefone"
          onChange={(e) => {
            setCreateForm({ ...createForm, phone: e.target.value });
          }}
        />

        <label>CNPJ</label>
        <input
          type="text"
          placeholder="CNPJ"
          onChange={(e) => {
            setCreateForm({ ...createForm, cnpj: e.target.value });
          }}
        />

        <label>Responsável</label>
        <input
          type="text"
          placeholder="Responsável"
          onChange={(e) => {
            setCreateForm({ ...createForm, in_charge: e.target.value });
          }}
        />

        <label>Hora de abertura</label>
        <input
          type="text"
          placeholder="Hora de abertura"
          onChange={(e) => {
            setCreateForm({ ...createForm, time_open: e.target.value });
          }}
        />

        <label>Hora de fechamento</label>
        <input
          type="text"
          placeholder="Hora de fechamento"
          onChange={(e) => {
            setCreateForm({ ...createForm, time_close: e.target.value });
          }}
        />

        <label>Logo</label>
        <input
          type="text"
          placeholder="Logo"
          onChange={(e) => {
            setCreateForm({ ...createForm, logo: e.target.value });
          }}
        />

        <button onClick={handleSave}>Salvar</button>
      </div>
    </Modal>
  );
}
