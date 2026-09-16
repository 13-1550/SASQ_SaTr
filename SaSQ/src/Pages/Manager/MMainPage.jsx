import { useState } from "react";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Card from "../../Components/Common/Card/Card";
import Table from "../../Components/Common/Table/Table";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";

import {
    Users,
    CheckCircle,
    Clock3,
    XCircle,
    AlertTriangle
} from "lucide-react";


function ManagerMain() {

    // Table Headers
    const headers = [
        "ID",
        "Name",
        "Valid",
        "Soon to Expire",
        "Expired",
        "Warnings"
    ];


    // Table Data
    const data = [
        {
            id: "SA091",
            name: "Ahmed M. AlSalem",
            valid: 5,
            soonToExpire: 9,
            expired: 7,
            warnings: 2
        },
        {
            id: "SA134",
            name: "Sarah A. Mohammed",
            valid: 7,
            soonToExpire: 4,
            expired: 5,
            warnings: 1
        },
        {
            id: "SA156",
            name: "Mohammed A. Ali",
            valid: 8,
            soonToExpire: 3,
            expired: 2,
            warnings: 1
        }
    ];


    return (

        <div className="dashboard-page">

            {/* Sidebar */}

            <Sidebar
                role="manager"
                activePage="Main page"
            />


            {/* Main Content */}

            <main className="dashboard-content">

                {/* Employees Summary */}

                <section className="employees-section">

                    <div className="employees-title">

                        <div className="employees-title-icon">
                            <Users size={20} />
                        </div>

                        <div>
                            <h2>Employees</h2>

                        </div>

                    </div>


                    <div className="employee-total">

                        <Card
                        label="Employees"
                        number="72"
                        icon={<Users size={28} />}
                        numberColor="green"
                    />

                    </div>

                </section>



                {/* Certificate Summary Cards */}

                <section className="dashboard-cards">

                    <Card
                        label="Valid"
                        number="320"
                        icon={<CheckCircle size={28} />}
                        numberColor="green"
                    />


                    <Card
                        label="Soon to Expire"
                        number="47"
                        icon={<Clock3 size={28} />}
                        numberColor="orange"
                    />


                    <Card
                        label="Expired"
                        number="25"
                        icon={<XCircle size={28} />}
                        numberColor="red"
                    />


                    <Card
                        label="Warnings"
                        number="12"
                        icon={<AlertTriangle size={28} />}
                        numberColor="orange"
                    />

                </section>



                {/* Certificate Status */}

                <section className="status-section">

                    <div className="section-header">

                        <div>
                            <h2>Certificate Status Overview </h2>
                        </div>

                    </div>


                    <div className="status-boxes">

                        <div className="status-box status-box-green">

                            <span>Valid</span>

                            <strong>320</strong>

                        </div>


                        <div className="status-box status-box-orange">

                            <span>Soon to Expire</span>

                            <strong>47</strong>

                        </div>


                        <div className="status-box status-box-red">

                            <span>Expired</span>

                            <strong>25</strong>

                        </div>


                        <div className="status-box status-box-gray">

                            <span>Pending</span>

                            <strong>12</strong>

                        </div>

                    </div>

                </section>



                {/* Flagged Employees Table */}

                <section className="flagged-section">

                    <div className="table-title">
                        Flagged Employees
                    </div>


                    <Table
                        className="table"
                        headers={headers}
                        data={data}
                    />

                </section>



                {/* Example Status Badges */}

                <section className="badge-section">

                    <h2>Status Examples</h2>

                    <div className="badge-test">

                        <StatusBadge status="Completed" />

                        <StatusBadge status="Warning" />

                        <StatusBadge status="Expired" />

                        <StatusBadge status="Pending" />

                    </div>

                </section>


            </main>

        </div>
    );
}


export default ManagerMain;

               