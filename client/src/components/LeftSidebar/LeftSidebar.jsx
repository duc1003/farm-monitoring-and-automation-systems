import { useState } from "react";
import "./LeftSidebar.module.scss";
import { Grid, BarChart3, Settings, Plus, RefreshCw } from "lucide-react";

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    {
      icon: Grid,
      name: "dashboard",
      title: "Dashboard",
    },
    {
      icon: BarChart3,
      name: "add-widget",
      title: "Add Widget",
    },
    {
      icon: Plus,
      name: "analytics",
      title: "Analytics",
    },
    {
      icon: Settings,
      name: "settings",
      title: "Settings",
    },
  ];

  const bottomItems = [
    {
      icon: RefreshCw,
      name: "help",
      title: "Help",
    },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`sidebar-icon ${
            activeTab === item.name ? 'active' : ""
          }`}
          onClick={() => setActiveTab(item.name)}
          title={item.title}
        >
          <item.icon
            className={`icon ${
              activeTab === item.name ? 'activeIcon' : ""
            }`}
            strokeWidth={activeTab === item.name ? 2 : 1.5}
          />
          {activeTab === item.name && (
            <div className='activeIndicator'></div>
          )}
        </div>
      ))}

      {bottomItems.map((item) => (
        <div key={item.name} className='sidebar-icon sidebar-footer' title={item.title}>
          <item.icon className='icon' strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
