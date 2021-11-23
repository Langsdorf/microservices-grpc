import { Product } from "../interfaces";

import axios from "axios";
import Modal from "./Modal";
import { useState } from "react";

export default function ProductsCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({});

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/products/${product.id}`);

    window.location.reload();
  };

  const handleEdit = async () => {
    setModalOpen(false);

    await axios.patch(`http://localhost:3001/products/${product.id}`, editForm);

    window.location.reload();
  };

  const handleClone = async () => {
    await axios.post(`http://localhost:3001/products/${product.id}/clone`);

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
        <h1>Editar produto</h1>

        <div className="edit">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome"
            defaultValue={product.name}
            onChange={(e) => {
              setEditForm({ ...editForm, name: e.target.value });
            }}
          />
          <label>Preço</label>
          <input
            type="text"
            placeholder="Preço"
            defaultValue={product.price.toFixed(2)}
            onChange={(e) => {
              setEditForm({ ...editForm, price: e.target.value });
            }}
          />
          <label>Volume</label>
          <input
            type="text"
            placeholder="Volume"
            defaultValue={product.volume}
            onChange={(e) => {
              setEditForm({ ...editForm, volume: e.target.value });
            }}
          />
          <label>Disponibilidade</label>
          <input
            type="text"
            placeholder="Disponibilidade"
            defaultValue={product.avaliability}
            onChange={(e) => {
              setEditForm({ ...editForm, avaliability: e.target.value });
            }}
          />
          <label>Ingredientes</label>
          <input
            type="text"
            placeholder="Ingredientes"
            defaultValue={JSON.parse(product.ingredients).join(", ").trim()}
            onChange={(e) => {
              setEditForm({
                ...editForm,
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
            defaultValue={product.thumbnail}
            onChange={(e) => {
              setEditForm({ ...editForm, thumbnail: e.target.value });
            }}
          />

          <button onClick={handleEdit}>Salvar</button>
        </div>
      </Modal>
      <div className="product">
        <img src={product.thumbnail} alt={product.name} />
        <h1>{product.name}</h1>
        <div className="productInfo">
          <p>Preço: {product.price.toFixed(2)}</p>
          <p>Volume: {product.volume}g</p>
          <p>Disponibilidade: {product.avaliability}%</p>
          <p>
            Ingredientes: {JSON.parse(product.ingredients).join(", ").trim()}
          </p>
        </div>

        <div className="productFooter">
          <button onClick={handleDelete}>Apagar</button>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Editar
          </button>
          <button onClick={handleClone}>Clonar</button>
        </div>
      </div>
    </>
  );
}
