import React from "react";
import { NavLink, useLocation } from "react-router-dom";

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

const Sidebar = ({ role }) => {

    const menus = {
        employee: [
            { label: "Main page", icon: House, path: "/employee/main"},
            { label: "Upload Certificate", icon: Upload, path: "/employee/upload" },
            { label: "Courses", icon: BriefcaseBusiness, path: "/employee/courses" },
            { label: "Certificates", icon: LibraryBig, path: "/employee/certificates" },
        ],

        coordinator: [
            { label: "Main page", icon: House, path: "/coordinator/main"},
            { label: "Courses", icon: BriefcaseBusiness, path: "/coordinator/courses" },
            { label: "Employees", icon: Users, path: "/coordinator/employees" },
            { label: "Reports", icon: ChartNoAxesColumn, path: "/coordinator/reports" },
        ],

        manager: [
            { label: "Main page", icon: House, path: "/manager/main", end: true },
            { label: "Employees", icon: Users, path: "/manager/employees" },
            { label: "Courses", icon: BriefcaseBusiness, path: "/manager/courses" },
            { label: "Reports", icon: ChartNoAxesColumn, path: "/manager/reports" },
        ],

        admin: [
            { label: "Main page", icon: House, path: "/admin/main"},
            { label: "Courses", icon: BriefcaseBusiness, path: "/admin/courses" },
            { label: "Employees", icon: Users, path: "/admin/users" },
            { label: "User Management", icon: UserCog, path: "/admin/user-management" },
            { label: "Reports", icon: ChartNoAxesColumn, path: "/admin/reports" },
            { label: "Audit Log", icon: Logs, path: "/admin/audit-log" },
        ],
    };

    const menuItems = menus[role] || menus.employee;

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <img src={logo} alt="Saudia" />
            </div>

            <nav className="sidebar-menu">

                {menuItems.map((item) => {

                    const Icon = item.icon;
                    const isActive = item.end
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}  
                            end={item.end==true}
                            className={`sidebar-item ${
                                isActive ? "active" : ""
                            }`}
                        >
                            <span className="sidebar-icon">
                                <Icon size={22} />
                            </span>

                            <span className="sidebar-label">
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}

            </nav>

        </aside>
    );
};

export default Sidebar;