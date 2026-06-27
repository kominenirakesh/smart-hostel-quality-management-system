import Hostel from "../models/hostel.model.js";
import User from "../models/user.model.js";
import Complaint from "../models/complaint.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getOwnerDashboard = async (req, res, next) => {
  try {
    // Find all hostels owned by the logged-in owner
    const hostels = await Hostel.find({
      ownerId: req.user.id,
    }).populate("supervisorId", "name email");

    if (!hostels.length) {
      return next(new ApiError(404, "No hostels found for this owner"));
    }

    // Extract hostel IDs
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
    // Hostel Wise Analytics
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

      const resolved = await Complaint.countDocuments({
        hostelId: hostel._id,
        status: "resolved",
      });

      const pending = await Complaint.countDocuments({
        hostelId: hostel._id,
        status: "pending",
      });

      const highPriority = await Complaint.countDocuments({
        hostelId: hostel._id,
        priority: "high",
      });

      const resolutionRate =
        complaints === 0
          ? 0
          : ((resolved / complaints) * 100).toFixed(2);

      hostelAnalytics.push({
        hostelId: hostel._id,
        hostelName: hostel.hostelName,
        city: hostel.city,

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
        resolutionRate: `${resolutionRate}%`,
      });
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          overallStats: {
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
            },
          hostelAnalytics,
        },
        "Dashboard fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export { getOwnerDashboard };