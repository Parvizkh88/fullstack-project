import React from "react";

const UserDataTable: React.FC = () => {
 
  return (
    <>
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Product List
        </h2>
        <ul>
          {/* {products.map((product) => (
            <li key={product.id} className="mb-2">
              <span className="font-medium text-gray-700">{product.name}</span>:
              ${product.price}
            </li>
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default UserDataTable;
