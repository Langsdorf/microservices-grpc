import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

export default function CreateProduct({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [createForm, setCreateForm] = useState({});

  const handleSave = async () => {
    await axios.post(`http://localhost:3001/products`, createForm);

    window.location.reload();
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <h1>Criar produto</h1>
      <div className="edit">
        <label>Nome</label>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => {
            setCreateForm({ ...createForm, name: e.target.value });
          }}
        />
        <label>Preço</label>
        <input
          type="text"
          placeholder="Preço"
          onChange={(e) => {
            setCreateForm({ ...createForm, price: e.target.value });
          }}
        />
        <label>Volume</label>
        <input
          type="text"
          placeholder="Volume"
          onChange={(e) => {
            setCreateForm({ ...createForm, volume: e.target.value });
          }}
        />
        <label>Disponibilidade</label>
        <input
          type="text"
          placeholder="Disponibilidade"
          onChange={(e) => {
            setCreateForm({ ...createForm, avaliability: e.target.value });
          }}
        />
        <label>Ingredientes</label>
        <input
          type="text"
          placeholder="Ingredientes"
          onChange={(e) => {
            setCreateForm({
              ...createForm,
              ingredients: JSON.stringify(
                e.target.value.split(",").map((i) => i.trim())
              ),
            });
          }}
        />
        <label>Thumbnail</label>
        <input
          type="text"
          placeholder="Thumbnail"
          onChange={(e) => {
            setCreateForm({ ...createForm, thumbnail: e.target.value });
          }}
        />

        <button onClick={handleSave}>Salvar</button>
      </div>
    </Modal>
  );
}
