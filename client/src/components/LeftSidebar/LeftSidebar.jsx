import { useState } from "react";
import "./LeftSidebar.module.scss";
import { Grid, BarChart3, Settings, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Grid,
      name: "dashboard",
      title: "Dashboard",
      url: "/home/dashboard",
    },
    {
      icon: BarChart3,
      name: "add-widget",
      title: "Add Widget",
      url: "/home/chart",
    },
    {
      icon: Plus,
      name: "analytics",
      title: "Analytics",
      url: "/home/AI",
    },
    // {
    //   icon: Settings,
    //   name: "settings",
    //   title: "Settings",
    //   url: "/home/settings",
    // },
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
          onClick={() => {
            setActiveTab(item.name)
            navigate(item.url);
          }}
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
