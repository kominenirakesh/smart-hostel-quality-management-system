import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";
import Hostel from "../models/hostel.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
// FIX: Removed unused `import { v2 as cloudinary } from "cloudinary"` and
// `import path from "path"`. Both were leftover dead imports. Cloudinary is
// accessed only through uploadOnCloudinary, which uses cloudinary.config.js.
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createComplaint = async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const category = req.body.category?.trim();
    const priority = req.body.priority?.trim();

    let imageUrl = null;

    if (req.file) {

      try {

        const uploadedImage =
          await uploadOnCloudinary(req.file.path);

        imageUrl = uploadedImage.secure_url;

        console.log("Cloudinary Upload Success");
        console.log(imageUrl);

      } catch (error) {

        console.error("Cloudinary Upload Failed");
        console.error(error);

        return next(
          new ApiError(
            500,
            "Failed to upload image"
          )
        );

      }

    }

    if (
      !title ||
      !description ||
      !category
    ) {
      return next(
        new ApiError(
          400,
          "All fields are required"
        )
      );
    }

    const student =
      await User.findById(req.user.id);

    if (!student.hostelId) {
      return next(
        new ApiError(
          400,
          "Join a hostel before creating complaints"
        )
      );
    }

    const hostel =
      await Hostel.findById(
        student.hostelId
      );

    if (!hostel) {
      return next(
        new ApiError(
          404,
          "Hostel not found"
        )
      );
    }

    if (!hostel.supervisorId) {
      return next(
        new ApiError(
          400,
          "No supervisor assigned to this hostel"
        )
      );
    }

    const complaint =
      await Complaint.create({
        title,
        description,
        category,
        priority,
        imageUrl,
        studentId:
          student._id,

        hostelId:
          hostel._id,

        supervisorId:
          hostel.supervisorId
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        complaint,
        "Complaint created successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

const getSupervisorComplaints = async (req, res, next) => {
  try {
    // ==========================
    // Pagination
    // ==========================
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 5, 1),
      20
    );

    const skip = (page - 1) * limit;

    // ==========================
    // Search
    // ==========================
    const search = req.query.search?.trim() || "";

    // ==========================
    // Dynamic Query
    // ==========================
    const query = {
      supervisorId: req.user.id,
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================
    // Total Count
    // ==========================
    const totalComplaints =
      await Complaint.countDocuments(query);

    // ==========================
    // Fetch Complaints
    // ==========================
    const complaints = await Complaint.find(query)
      .populate("studentId", "name email")
      .populate("hostelId", "hostelName city")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          complaints,

          pagination: {
            totalComplaints,
            currentPage: page,
            totalPages: Math.ceil(totalComplaints / limit),
            limit,
            hasNextPage:
              page < Math.ceil(totalComplaints / limit),
            hasPreviousPage: page > 1,
          },
        },
        "Complaints fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

const updateComplaint = async (req, res, next) => {
  try {
    const { complaintId } = req.params;

    const {
      status,
      supervisorRemark
    } = req.body;

    const complaint =
      await Complaint.findById(
        complaintId
      );

    if (!complaint) {
      return next(
        new ApiError(
          404,
          "Complaint not found"
        )
      );
    }

    // Security Check
    if (
      complaint.supervisorId.toString() !==
      req.user.id
    ) {
      return next(
        new ApiError(
          403,
          "Not authorized"
        )
      );
    }

    complaint.status =
      status || complaint.status;

    complaint.supervisorRemark =
      supervisorRemark ||
      complaint.supervisorRemark;

    // Auto Resolution Date
    if (status === "resolved") {
      complaint.resolvedAt = new Date();
    }

    if (status === "reopened") {
      complaint.resolvedAt = null;
    }

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint updated successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

const getMyComplaints = async (req, res, next) => {
  try {

    const complaints = await Complaint.find({
      studentId: req.user.id
    })
      .populate(
        "hostelId",
        "hostelName city"
      )
      .sort({
        createdAt: -1
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaints,
        "Complaints fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

const reopenComplaint = async (req, res, next) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return next(
        new ApiError(404, "Complaint not found")
      );
    }

    // Only the student who created the complaint can reopen it
    if (complaint.studentId.toString() !== req.user.id) {
      return next(
        new ApiError(
          403,
          "You are not authorized to reopen this complaint"
        )
      );
    }

    // Only resolved complaints can be reopened
    if (complaint.status !== "resolved") {
      return next(
        new ApiError(
          400,
          "Only resolved complaints can be reopened"
        )
      );
    }

    // Update complaint
    complaint.status = "reopened";
    complaint.resolvedAt = null;

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Complaint reopened successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

export { createComplaint, getSupervisorComplaints, updateComplaint, getMyComplaints, reopenComplaint };