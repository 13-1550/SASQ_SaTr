import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    CircleUserRound,
    History,
    Users,
    CircleAlert,
    TriangleAlert,
    FileText,
    CircleX,
    CircleCheck,
} from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Card from "../../Components/Common/Card/Card";
import Table from "../../Components/Common/Table/Table";
import Button from "../../Components/Common/Button/Button";
import TrainingCoordinatorHeader from "./TrainingCoordHeader";


// Numbers shown in the cards
const pendingRequests = 18;
const totalEmployees = 43;
const pendingCount = 30;
const completeCount = 13;

const recentUploaded = 12;
const employeesSoon = 8;
const expiredCertificates = 7;
const totalCertificates = 20;

// Quick Actions buttons
// path = the page that opens when you click the button
// leave path empty ("") if the page is not ready yet
const quickActions = [
    { id: 1, label: "Approve Certificate", path: "" },
    { id: 2, label: "Add Employee", path: "/coordinator/employees" },
    { id: 3, label: "Edit Courses", path: "" },
    { id: 4, label: "Download Report", path: "" },
];

// Pending Action list
const pendingActions = [
    { id: 1, action: "Certificate Approval Request for Sama AlHarbi", time: "Today · 9:05 AM" },
    { id: 2, action: "Department Change Request", time: "Today · 8:45 AM" },
    { id: 3, action: "Profile Update Request", time: "Today · 8:40 AM" },
    { id: 4, action: "New User Request", time: "Today · 8:30 AM" },
];

// Notifications (type = warning, danger or success)
const notificationsData = [
    {
        id: 1,
        type: "warning",
        title: "Certificate expiring in 30 days",
        message: "Cloud Security Certificate",
        time: "Today · 9:05 AM",
        read: false,
    },
    {
        id: 2,
        type: "danger",
        title: "Course added to the Network Engineering department",
        message: "Cisco Certified Network Associate",
        time: "Today · 9:05 AM",
        read: false,
    },
    {
        id: 3,
        type: "success",
        title: "Employee data updated successfully",
        message: "Sara Alhazmi's department has been updated from IT Operations to Network Engineering",
        time: "Today · 9:05 AM",
        read: false,
    },
];

// Pending Action table: headers and field names
const pendingHeaders = ["Action", "Time"];
const pendingFields = ["action", "time"];


/* =========================================================
   Small function that chooses the notification icon
   ========================================================= */

function getNotificationIcon(type) {
    if (type === "warning") {
        return <CircleAlert size={20} />;
    }
    if (type === "danger") {
        return <CircleX size={20} />;
    }
    return <CircleCheck size={20} />;
}


/* =========================================================
   The page
   ========================================================= */

function CoordinatorMain() {

    // ---------- Variables (state) ----------
    const [notifications, setNotifications] = useState(notificationsData);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // navigate is used to open another page
    const navigate = useNavigate();


    // ---------- Functions ----------

    // Bell button
    function toggleNotifications() {
        setIsNotificationsOpen(!isNotificationsOpen);
    }

    // Mark all as read button
    function markAllAsRead() {
        const updatedNotifications = notifications.map(function (note) {
            return { ...note, read: true };
        });
        setNotifications(updatedNotifications);
    }

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


    // ---------- Prepare the data for display ----------

    // Number of unread notifications (the number on the bell)
    const unreadCount = notifications.filter(function (note) {
        return note.read === false;
    }).length;


    // ---------- What is shown on the screen ----------
    return (
        <div className="cmain-page">

            <Sidebar role="coordinator" />

            <div className="cmain-content">

                <TrainingCoordinatorHeader />

                {/* ===== Top row: 3 big cards ===== */}
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
                            label="Total Employees"
                            number={totalEmployees}
                            icon={<Users size={22} color="#037c43" />}
                            numberColor="green"
                        />
                    </div>

                    <div className="cmain-card-wrap">
                        <div className="split-card">
                            <div className="split-half split-active">
                                <p className="split-label">Pending</p>
                                <p className="split-number">{pendingCount}</p>
                            </div>

                            <div className="split-half split-inactive">
                                <p className="split-label">Complete</p>
                                <p className="split-number">{completeCount}</p>
                            </div>
                        </div>
                    </div>

                </div>


                {/* ===== Bottom area: Quick Actions (left) + cards and list (right) ===== */}
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
                                label="Recent Uploaded"
                                number={recentUploaded}
                                icon={<History size={22} color="#037c43" />}
                                numberColor="green"
                            />

                            <Card
                                label="Employees Soon"
                                number={employeesSoon}
                                icon={<CircleAlert size={22} color="#e0a83e" />}
                                numberColor="orange"
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

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CoordinatorMain;