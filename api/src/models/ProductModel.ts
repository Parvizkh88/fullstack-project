import { Document, Schema, model, Model } from "mongoose";

// interface IUser that extends the Document type from Mongoose.
// The IUser interface defines the shape of
// a user document. The userSchema is also updated to be of type Schema<IUser>.
interface Product extends Document {
  title: string;
  price: number;
  description: string;
  stock: number;
}

const ProductSchema = new Schema<Product>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
      minlength: [2, "minimum length for title is 2 character"],
      maxlength: [100, "maximum length for title is 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
    
    },
    // image: {
    //   type: String,
    //   default: "../../public/images/users/Jordan.jpg",
    // },

    price: {
      type: Number,
      required: [true, "price is required"],
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product: Model<Product> = model<Product>("Product", ProductSchema);
export default Product;
