import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    phoneNumber: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
  { timestamps: true },
);

export default mongoose.model("Address",AddressSchema)