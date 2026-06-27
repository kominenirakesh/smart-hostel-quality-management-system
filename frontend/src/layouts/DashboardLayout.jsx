import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">

      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <main
          className="flex-grow-1"
          style={{
            minHeight: "calc(100vh - 76px)",
            padding: "32px",
            overflowX: "hidden",
            background: "#f8fafc",
          }}
        >
          <div
            className="bg-white rounded-4 shadow-sm"
            style={{
              minHeight: "100%",
              padding: "30px",
              border: "1px solid #e5e7eb",
            }}
          >
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
