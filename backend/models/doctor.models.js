import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feePerConsultation: {
      type: Number,
      required: [true, "fee is required"],
    },

    status: {
      type: String,
      default: "pending",
    },
    timings: {
      from: {
        type: String,
        required: [true, "Start time is required"],
      },
      to: {
        type: String,
        required: [true, "End time is required"],
      },
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);
export { doctorModel };
