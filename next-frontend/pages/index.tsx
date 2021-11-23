import { useState } from "react";
import CreateDrugstore from "../components/CreateDrugstore";
import CreateProduct from "../components/CreateProduct";
import DrugstoreCard from "../components/DrugstoreCard";
import ProductsCard from "../components/ProductsCard";
import { Drugstore, Product } from "../interfaces";

export const getServerSideProps = async () => {
  const awaitFetch = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  const { drugstores } = await awaitFetch("http://api:3001/drugstores");
  const { products } = await awaitFetch("http://api:3001/products");

  return { props: { drugstores, products } };
};

interface IndexProps {
  drugstores: Drugstore[];
  products: Product[];
}

export default function Index({ drugstores, products }: IndexProps) {
  const [isOpen, setIsOpen] = useState({ drugstore: false, product: false });
  return (
    <>
      <CreateDrugstore
        open={isOpen.drugstore}
        handleClose={() => {
          setIsOpen({ ...isOpen, drugstore: false });
        }}
      />
      <CreateProduct
        open={isOpen.product}
        handleClose={() => {
          setIsOpen({ ...isOpen, product: false });
        }}
      />
      <div className="wrap">
        <div className="title-container">
          <h1>Farmácias</h1>
          <button
            onClick={() => {
              setIsOpen({ ...isOpen, drugstore: true });
            }}
          >
            Criar
          </button>
        </div>
        <div className="drugstores">
          {drugstores.map((drugstore, i) => (
            <DrugstoreCard key={i} drugstore={drugstore} />
          ))}
        </div>

        <div className="title-container">
          <h1>Produtos</h1>
          <button
            onClick={() => {
              setIsOpen({ ...isOpen, product: true });
            }}
          >
            Criar
          </button>
        </div>
        <div className="products">
          {products.map((product, i) => (
            <ProductsCard key={i} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
