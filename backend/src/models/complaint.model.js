import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "food-quality",
        "food-hygiene",
        "meal-timing",
        "water-issue",
        "quantity-issue",
        "other",
      ],
      required: true,
    },
        priority: {
        type: String,
        enum: [
            "low",
            "medium",
            "high"
        ],
        default: "medium"
        },

    imageUrl: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "resolved",
        "reopened",
      ],
      default: "pending",
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    supervisorRemark: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;