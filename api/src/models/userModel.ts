import { Document, Schema, model, Model } from "mongoose";

// interface IUser that extends the Document type from Mongoose.
// The IUser interface defines the shape of
// a user document. The userSchema is also updated to be of type Schema<IUser>.
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  is_admin: number;
  createdAt: Date;
  isBanned: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, "name is required"],
    minlength: [2, "minimum length for name is 2 character"],
    maxlength: [100, "maximum length for name is 100 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: " Please enter a valid email!",
    },
  },
  password: {
    type: String,
    required: [true, "user password is required"],
    min: 6,
  },
  image: {
    type: String,
    default: "../../public/images/users/Jordan.jpg",
  },
  phone: {
    type: String,
    required: [true, "user phone is required"],
  },
  is_admin: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBanned: {
    type: Number,
    default: 0,
  },
});

const User: Model<IUser> = model<IUser>("Users", userSchema);
export default User;
