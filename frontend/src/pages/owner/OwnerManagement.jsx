import React, { useState } from "react";
import OwnerNavbar from "../../components/owner/OwnerNavbar.jsx";
import OwnerSidebar from "../../components/owner/OwnerSidebar.jsx";

import CreateHostelWorkspace from "../../components/owner/CreateHostelWorkspace.jsx";
import AssignSupervisor from "../../components/owner/AssignSupervisor.jsx";
import HostelJoinCodesWorkspace from "../../components/owner/HostelJoinCodesWorkspace.jsx";

import "../../styles/owner-management.css";

const OwnerManagement = () => {

  const [activeTab, setActiveTab] = useState("create-hostel");

  const renderContent = () => {

    switch (activeTab) {

      case "create-hostel":
        return <CreateHostelWorkspace />;

      case "assign-supervisor":
        return <AssignSupervisor />;

      case "hostel-join-codes":
        return <HostelJoinCodesWorkspace />;

      default:
        return <CreateHostelWorkspace />;

    }

  };

  return (
    <>
      <OwnerNavbar />

      <div className="owner-management-page">

        <div className="management-layout">

          <OwnerSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <main className="owner-management-content">

            {renderContent()}

          </main>

        </div>

      </div>
    </>
  );

};

export default OwnerManagement;