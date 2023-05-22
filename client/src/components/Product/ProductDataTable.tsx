import { Product } from "@types";
import React, { useState } from "react";
import ProductRow from "./ProductRow";
import "./DataTable.css"


const ProductDataTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Mobile",
      price: 100,
    },
    {
      id: 2,
      name: "Laptop",
      price: 500,
    },
    {
      id: 3,
      name: "Headphones",
      price: 50,
    },
  ]);

  const handleDelete = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleEdit = (id: number) => {
    // Handle edit logic here
    console.log("Editing product with ID:", id);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Product List
        </h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductDataTable;