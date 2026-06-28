import Hostel from "../models/hostel.model.js";
import User from "../models/user.model.js";
import Complaint from "../models/complaint.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import generateOwnerDashboardInsights from "../services/ownerDashboardAI.service.js";

const getOwnerDashboard = async (req, res, next) => {
  try {

    // ==========================
    // Fetch Owner Hostels
    // ==========================

    const hostels = await Hostel.find({
      ownerId: req.user.id,
    }).populate("supervisorId", "name email");

    if (!hostels.length) {
      return next(
        new ApiError(404, "No hostels found for this owner")
      );
    }

    const hostelIds = hostels.map((hostel) => hostel._id);

    // ==========================
    // Overall Statistics
    // ==========================

    const totalStudents = await User.countDocuments({
      role: "student",
      hostelId: { $in: hostelIds },
    });

    const totalComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
    });

    const pendingComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      status: "pending",
    });

    const resolvedComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      status: "resolved",
    });

    const highPriorityComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      priority: "high",
    });

    const highSeverityComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      "aiAnalysis.severity": "high",
    });

    const mediumSeverityComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      "aiAnalysis.severity": "medium",
    });

    const lowSeverityComplaints = await Complaint.countDocuments({
      hostelId: { $in: hostelIds },
      "aiAnalysis.severity": "low",
    });

    // ==========================
    // Prepare Overall Stats
    // ==========================

    const overallStats = {
      totalHostels: hostels.length,
      totalStudents,
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      highPriorityComplaints,

      aiSeverity: {
        high: highSeverityComplaints,
        medium: mediumSeverityComplaints,
        low: lowSeverityComplaints,
      },
    };

    // ==========================
    // Hostel Analytics
    // ==========================

    const hostelAnalytics = [];

    for (const hostel of hostels) {

      const students = await User.countDocuments({
        role: "student",
        hostelId: hostel._id,
      });

      const complaints = await Complaint.countDocuments({
        hostelId: hostel._id,
      });

      const pending = await Complaint.countDocuments({
        hostelId: hostel._id,
        status: "pending",
      });

      const resolved = await Complaint.countDocuments({
        hostelId: hostel._id,
        status: "resolved",
      });

      const highPriority = await Complaint.countDocuments({
        hostelId: hostel._id,
        priority: "high",
      });

      const resolutionRate =
        complaints === 0
          ? "0%"
          : `${((resolved / complaints) * 100).toFixed(2)}%`;

   hostelAnalytics.push({
  hostelId: hostel._id,

  hostelName: hostel.hostelName,

  address: hostel.address,

  city: hostel.city,

  joinCode: hostel.joinCode,

  isActive: hostel.isActive,

  averageRating: hostel.averageRating,

  supervisor: hostel.supervisorId
    ? {
        id: hostel.supervisorId._id,
        name: hostel.supervisorId.name,
        email: hostel.supervisorId.email,
      }
    : null,

  totalStudents: students,
  totalComplaints: complaints,
  pendingComplaints: pending,
  resolvedComplaints: resolved,
  highPriorityComplaints: highPriority,
  resolutionRate,
});
    }

    // ==========================
    // AI Insights
    // ==========================

    const aiInsights =
      await generateOwnerDashboardInsights({
        overallStats,
        hostelAnalytics,
      });

    // ==========================
    // Response
    // ==========================

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          overallStats,
          hostelAnalytics,
          aiInsights,
        },
        "Dashboard fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};
const getStudentDashboard = async (req, res, next) => {
  try {

    // ==========================
    // Fetch Logged-in Student
    // ==========================

    const student = await User.findById(req.user.id);

    if (!student) {
      return next(
        new ApiError(404, "Student not found")
      );
    }

    if (!student.hostelId) {
      return next(
        new ApiError(
          400,
          "Student has not joined any hostel yet"
        )
      );
    }

    // ==========================
    // Fetch Hostel
    // ==========================

    const hostel = await Hostel.findById(student.hostelId);

    if (!hostel) {
      return next(
        new ApiError(404, "Hostel not found")
      );
    }

    // ==========================
    // Complaint Statistics
    // ==========================

    const pending = await Complaint.countDocuments({
      studentId: student._id,
      status: "pending",
    });

    const review = await Complaint.countDocuments({
      studentId: student._id,
      status: "in-progress",
    });

    const resolved = await Complaint.countDocuments({
      studentId: student._id,
      status: "resolved",
    });

    const total = await Complaint.countDocuments({
      studentId: student._id,
    });

    // ==========================
    // Recent Complaints
    // ==========================

    const recentComplaints = await Complaint.find({
      studentId: student._id,
    })
      .select(
        "title category status createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==========================
    // Response
    // ==========================

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          student: {
            id: student._id,
            name: student.name,
            email: student.email,
          },

          hostel: {
            hostelName: hostel.hostelName,
            joinCode: hostel.joinCode,
            address: hostel.address,
            city: hostel.city,
            status: hostel.isActive
              ? "Active"
              : "Inactive",
          },

          stats: {
            pending,
            review,
            resolved,
            total,
          },

          recentComplaints,
        },
        "Student dashboard fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

export {
  getOwnerDashboard,getStudentDashboard
};