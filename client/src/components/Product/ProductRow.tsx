import { Product } from "@types";


const ProductRow: React.FC<{
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}> = ({ product, onDelete, onEdit }) => (
  <tr>
    <td>{product.name}</td>
    <td>${product.price}</td>
    <td>
      <button
        className="action-button edit-button"
        onClick={() => onEdit(product.id)}
      >
        Edit
      </button>
    </td>
    <td>
      <button
        className="action-button delete-button"
        onClick={() => onDelete(product.id)}
      >
        Delete
      </button>
    </td>
  </tr>
);


export default ProductRow