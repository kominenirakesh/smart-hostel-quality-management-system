import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";
import Hostel from "../models/hostel.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createComplaint = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      priority
    } = req.body;

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

    const complaints =
      await Complaint.find({
        supervisorId: req.user.id
      })
      .populate(
        "studentId",
        "name email"
      )
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

    if (
      status === "resolved"
    ) {
      complaint.resolvedAt =
        new Date();
    }

    if (
      status === "reopened"
    ) {
      complaint.resolvedAt =
        null;
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
export  {createComplaint,getSupervisorComplaints,updateComplaint,getMyComplaints};