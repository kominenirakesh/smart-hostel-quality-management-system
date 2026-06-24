import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    joinCode: {
      type: String,
      required: true,
      unique: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;