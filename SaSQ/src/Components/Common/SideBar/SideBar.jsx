import React from "react";
import {
    House,
    Upload,
    BriefcaseBusiness,
    LibraryBig,
    Users,
    ChartNoAxesColumn,
    UserCog,
    Logs
} from "lucide-react";
import logo from "../../../assets/Logo_of_Saudia.svg.webp";

const Sidebar = ({ role, activePage }) => {

    const menus = {
        employee: [
            { label: "Main page", icon: House },
            { label: "Upload Certificate", icon: Upload },
            { label: "Courses", icon: BriefcaseBusiness },
            { label: "Certificates", icon: LibraryBig },
        ],

        coordinator: [
            { label: "Main page", icon: House },
            { label: "Courses", icon: BriefcaseBusiness },
            { label: "Employees", icon: Users },
            { label: "Reports", icon: ChartNoAxesColumn },
        ],

        manager: [
            { label: "Main page", icon: House },
            { label: "Employees", icon: Users },
            { label: "Courses", icon: BriefcaseBusiness },
            { label: "Reports", icon: ChartNoAxesColumn },
        ],

        admin: [
            { label: "Main page", icon: House },
            { label: "Users", icon: Users },
            { label: "User Management", icon: UserCog },
            { label: "Courses", icon: BriefcaseBusiness },
            { label: "Reports", icon: ChartNoAxesColumn },
            { label: "Audit Log", icon: Logs },
        ],
    };

    const menuItems = menus[role] || menus.employee;

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <img src={logo} alt="Saudia" />
            </div>

            <nav className="sidebar-menu">

                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        className={`sidebar-item ${
                            activePage === item.label ? "active" : ""
                        }`}
                    >
                        <span className="sidebar-icon">
                              <item.icon size={22} />
                            </span>

                        <span className="sidebar-label">
                            {item.label}
                        </span>
                    </div>
                ))}

            </nav>

        </aside>
    );
};

export default Sidebar;