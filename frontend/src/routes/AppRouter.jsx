import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx"
import Register from "../pages/auth/Register.jsx"
import ProtectedRoute from "./ProtectedRoute";
import StudentJoinHostel from "../pages/auth/StudentJoinHostel.jsx"
import StudentDashboard from "../../src/pages/student/StudentDashboard.jsx";
import CreateComplaint from "../pages/student/CreateComplaint.jsx";
import MyComplaints from "../pages/student/MyComplaints.jsx";
import ComplaintDetails from "../pages/student/ComplaintDetails.jsx";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard.jsx";
import SupervisorComplaints from "../pages/supervisor/SupervisorComplaints.jsx";
import SupervisorComplaintDetails from "../pages/supervisor/SupervisorComplaintDetails.jsx";
import OwnerManagement from "../pages/owner/OwnerManagement.jsx"
import OwnerDashboard from "../pages/owner/OwnerDashboard.jsx";
import LandingPage from "../pages/landing/LandingPage.jsx";

const NotFound = () => <h2>404 - Page Not Found</h2>;

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />

               {/* Student */}
                    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                            {/* Student - sub roites */}

                            <Route
                                path="/student/dashboard"
                                element={<StudentDashboard />}
                            />

                            <Route
                                path="/student/create-complaint"
                                element={<CreateComplaint />}
                            />

                           <Route
                                path="student/my-complaints"
                                element={<MyComplaints/>}
                            />
                            <Route
                                path="/student/complaints/:complaintId"
                                element={<ComplaintDetails />}
                            />
                            <Route
                                path="/student/join-hostel"
                                element={<StudentJoinHostel />}
                                />
                            {/* 
                            <Route
                                path="/student/profile"
                                element={<Profile />}
                            />

                            <Route
                                path="/student/join-hostel"
                                element={<JoinHostel />}
                            /> */}
                    </Route>

                    {/* Supervisor */}
                    <Route element={<ProtectedRoute allowedRoles={["supervisor"]} />}>
                        <Route
                            path="/supervisor/dashboard"
                            element={<SupervisorDashboard />}
                        />
                   


                       <Route
                            path="/supervisor/complaints"
                            element={<SupervisorComplaints />}
                        />
                    <Route
                        path="/supervisor/complaints/:complaintId"
                        element={<SupervisorComplaintDetails />}
                    />
                         </Route>

                    {/* Owner */}
                    <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                        <Route path="/owner/dashboard" element={<OwnerDashboard />} />

                    <Route path="/owner/management" element={<OwnerManagement />} />

                    {/* <Route path="/owner/profile" element={<OwnerProfile />} /> */}
                    </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;