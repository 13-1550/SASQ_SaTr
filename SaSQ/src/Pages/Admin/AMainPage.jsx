import { useNavigate } from "react-router-dom";
import {
    Bell,
    CircleUserRound,
    History,
    Users,
    TriangleAlert,
    FileText,
    FileUp,
} from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Card from "../../Components/Common/Card/Card";
import Table from "../../Components/Common/Table/Table";
import Button from "../../Components/Common/Button/Button";
import AdminHeader from "./AdminHeader";


// Numbers shown in the cards
const pendingRequests = 56;
const totalUsers = 156;
const ActiveCount = 130;
const InactiveCount = 16;

const recentActions = 18;
const UploadFiles = 12;
const expiredCertificates = 27;
const totalCertificates = 220;

// Number shown on the bell (the bell has no popup window)
const notificationCount = 1;

// Quick Actions buttons
const quickActions = [
    { id: 1, label: "Approve Certificate", path: "" },
    { id: 2, label: "Add Employee", path: "/coordinator/employees" },
    { id: 3, label: "Edit Courses", path: "" },
    { id: 4, label: "Download Report", path: "" },
];

// Pending Action list
const pendingActions = [
    { id: 1, action: "Account Deactive Request", time: "Today · 9:05 AM" },
    { id: 2, action: "Department Change Request", time: "Today · 8:45 AM" },
    { id: 3, action: "Profile Update Request", time: "Today · 8:40 AM" },
    { id: 4, action: "New User Request", time: "Today · 8:30 AM" },
];


// Pending Action table: headers and field names
const pendingHeaders = ["Action", "Time"];
const pendingFields = ["action", "time"];

// Recent Activity list
const recentActivity = [
    { id: 1, action: "Monthly action log report generated", time: "Today · 9:05 AM" },
    { id: 2, action: "New user account created", time: "Today · 8:45 AM" },
    { id: 3, action: "Employee certificate Uploaded", time: "Today · 8:40 AM" },
    { id: 4, action: "Edit Employee Secusses", time: "Today · 8:30 AM" },
];

// Recent Activity table: headers and field names (fields must match the keys in recentActivity)
const recentHeaders = ["Activity", "Time"];
const recentFields = ["action", "time"];



/*  The page */

function AdminMain() {

    // navigate is used to open another page
    const navigate = useNavigate();


    // ---------- Functions ----------

    // Click on one of the Quick Actions buttons
    function handleQuickAction(action) {
        if (action.path === "") {
            return;
        }

        // Add Employee opens the Employees page with the Add window already open
        if (action.label === "Add Employee") {
            navigate(action.path, { state: { openAdd: true } });
            return;
        }

        navigate(action.path);
    }




    // ---------- What is shown on the screen ----------
    return (
        <div className="cmain-page">

            <Sidebar role="admin" />

            <div className="cmain-content">

                {/* ===== Header (title + notifications + user) ===== */}
               <AdminHeader />

                {/* Top row: 3 big cards */}
                <div className="cmain-top-row">

                    <div className="cmain-card-wrap">
                        <Card
                            label="Pending Requests"
                            number={pendingRequests}
                            icon={<History size={22} color="#037c43" />}
                            numberColor="green"
                        />
                    </div>

                    <div className="cmain-card-wrap">
                        <Card
                            label="Total Users"
                            number={totalUsers}
                            icon={<Users size={22} color="#037c43" />}
                            numberColor="green"
                        />
                    </div>

                    <div className="cmain-card-wrap">
                        <div className="split-card">
                            <div className="split-half split-active">
                                <p className="split-label">Active</p>
                                <p className="split-number">{ActiveCount}</p>
                            </div>

                            <div className="split-half split-inactive">
                                <p className="split-label">Inactive</p>
                                <p className="split-number">{InactiveCount}</p>
                            </div>
                        </div>
                    </div>

                </div>


                {/* Bottom area: Quick Actions (left) + cards and lists (right) */}
                <div className="cmain-bottom">

                    {/* Quick Actions */}
                    <div className="panel cmain-quick-actions">
                        <h3 className="panel-title">Quick Actions</h3>

                        {quickActions.map(function (action) {
                            return (
                                <div key={action.id} className="cmain-action">
                                    <Button type="white" onClick={() => handleQuickAction(action)}>
                                        {action.label}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cmain-right">

                        {/* 4 small cards */}
                        <div className="cmain-small-cards">

                            <Card
                                label="Recent Actions"
                                number={recentActions}
                                icon={<History size={22} color="#037c43" />}
                                numberColor="green"
                            />

                            <Card
                                label="Upload Files"
                                number={UploadFiles}
                                icon={<FileUp size={22} color="#037c43" />}
                                numberColor="green"
                            />

                            <Card
                                label="Expired Certificates"
                                number={expiredCertificates}
                                icon={<TriangleAlert size={22} color="#d9483d" />}
                                numberColor="red"
                            />

                            <Card
                                label="Total Certificates"
                                number={totalCertificates}
                                icon={<FileText size={22} color="#037c43" />}
                                numberColor="green"
                            />

                        </div>

                        {/* Two lists side by side */}
                        <div className="cmain-lists">

                            {/* Pending Action list */}
                            <div className="panel">
                                <h3 className="panel-title">Pending Action</h3>

                                <Table
                                    className="cmain-pending-table"
                                    headers={pendingHeaders}
                                    fields={pendingFields}
                                    data={pendingActions}
                                />
                            </div>

                            {/* Recent Activity list */}
                            <div className="panel">
                                <h3 className="panel-title">Recent Activity</h3>

                                <Table
                                    className="cmain-pending-table"
                                    headers={recentHeaders}
                                    fields={recentFields}
                                    data={recentActivity}
                                />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminMain;