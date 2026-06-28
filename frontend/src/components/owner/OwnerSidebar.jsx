import React from "react";
import {
  Building2,
  UserCog,
  KeyRound
} from "lucide-react";

const OwnerSidebar = ({ activeTab, setActiveTab }) => {

  const menus = [
    {
      id: "create-hostel",
      label: "Create Hostel",
      icon: <Building2 size={20} />,
    },
    {
      id: "assign-supervisor",
      label: "Assign Supervisor",
      icon: <UserCog size={20} />,
    },
    {
      id: "hostel-join-codes",
      label: "Hostel Join Codes",
      icon: <KeyRound size={20} />,
    },
  ];

  return (
    <aside className="owner-sidebar">

      <div className="sidebar-header">
        <h2>Management</h2>
        <p>Owner Operations</p>
      </div>

      <nav className="sidebar-menu">

        {menus.map((menu) => (
          <button
            key={menu.id}
            className={
              activeTab === menu.id
                ? "sidebar-btn active"
                : "sidebar-btn"
            }
            onClick={() => setActiveTab(menu.id)}
          >
            {menu.icon}
            <span>{menu.label}</span>
          </button>
        ))}

      </nav>

    </aside>
  );
};

export default OwnerSidebar;