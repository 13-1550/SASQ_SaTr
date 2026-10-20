import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Card from "../../Components/Common/Card/Card";
import Table from "../../Components/Common/Table/Table";
import { Bell, CircleUserRound } from "lucide-react";



// Numbers shown in the cards
const totalEmployees = 72;
const validCount = 320;
const expiringCount = 47;
const expiredCount = 25;
const pendingCount = 12;

// Number shown on the bell (the bell has no popup window)
const notificationCount = 1;

// Bars of the chart
// width = length of the bar in percent (change these numbers to change the bar length)
// colorClass = the color of the bar (the colors are in the CSS file)
const chartBars = [
    { id: 1, label: "Valid", width: 68, colorClass: "mmain-bar-green" },
    { id: 2, label: "Expiring", width: 28, colorClass: "mmain-bar-yellow" },
    { id: 3, label: "Expired", width: 20, colorClass: "mmain-bar-red" },
    { id: 4, label: "Pending", width: 14, colorClass: "mmain-bar-gray" },
];

// Flagged Employees table: headers and field names (same order)
const headers = ["ID", "Name", "Valid", "Soon to expire", "Expired", "Warnings"];
const fields = ["id", "name", "valid", "soonToExpire", "expired", "warnings"];

// Flagged Employees table data
const data = [
    {
        id: "SA091",
        name: "Ahmed M. AlSalem",
        valid: 5,
        soonToExpire: 9,
        expired: 7,
        warnings: 2,
    },
    {
        id: "SA134",
        name: "Sarah A. Mohammed",
        valid: 7,
        soonToExpire: 4,
        expired: 5,
        warnings: 1,
    },
    {
        id: "SA156",
        name: "Mohammed A. Ali",
        valid: 8,
        soonToExpire: 3,
        expired: 2,
        warnings: 1,
    },
];



/*  The page */

function ManagerMain() {

    // ---------- What is shown on the screen ----------
    return (
        <div className="mmain-page">

            <Sidebar role="manager" />

            <main className="mmain-content">

                {/* ===== Header (notifications + user) ===== */}
                <header className="page-header">

                    <div className="page-header-user">

                        <div className="page-header-notifications">

                            {/* Bell with a number, no popup window */}
                            <button
                                className="notification-btn"
                                aria-label="Notifications"
                            >
                                <Bell size={24} />

                                {notificationCount > 0 && (
                                    <span className="notification-badge">{notificationCount}</span>
                                )}
                            </button>

                        </div>

                        <CircleUserRound className="user-avatar" strokeWidth={1.3} />

                        <div className="user-info">
                            <span className="user-name">Mohammed Abdullah</span>
                            <span className="user-role">Manager</span>
                        </div>

                    </div>
                </header>


                {/* ===== Employees card ===== */}
                <div className="mmain-employees">
                    <Card
                        label="Employees"
                        number={totalEmployees}
                        numberColor="green"
                    />
                </div>


                {/* ===== Certificates Status Overview ===== */}
                <h2 className="mmain-section-title">Certificates Status Overview</h2>

                {/* 4 status cards */}
                <section className="mmain-stats">

                    <Card
                        label="Valid"
                        number={validCount}
                        numberColor="green"
                    />

                    <Card
                        label="Expiring"
                        number={expiringCount}
                        numberColor="orange"
                    />

                    <Card
                        label="Expired"
                        number={expiredCount}
                        numberColor="red"
                    />

                    <Card
                        label="Pending"
                        number={pendingCount}
                        numberColor="gray"
                    />

                </section>

                {/* Bar chart */}
                <section className="mmain-chart">

                    {chartBars.map(function (bar) {
                        return (
                            <div key={bar.id} className="mmain-chart-row">

                                <span className="mmain-bar-label">{bar.label}</span>

                                <div className="mmain-chart-track">
                                    <div
                                        className={"mmain-bar " + bar.colorClass}
                                        style={{ width: bar.width + "%" }}
                                    ></div>
                                </div>

                            </div>
                        );
                    })}

                </section>


                {/* ===== Flagged Employees table ===== */}
                <section className="mmain-flagged">

                    <div className="mmain-table-title">Flagged Employees</div>

                    <Table
                        className="mmain-flagged-table"
                        headers={headers}
                        fields={fields}
                        data={data}
                    />

                </section>

            </main>

        </div>
    );
}

export default ManagerMain;