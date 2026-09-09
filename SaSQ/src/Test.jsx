import { useState } from "react";

import Sidebar from "./Components/Common/Sidebar/Sidebar";
import Card from "./Components/Common/Card/Card";
import Input from "./Components/Common/Input/Input";
import Modal from "./Components/Common/Modal/Modal";
import Table from "./Components/Common/Table/Table";
import StatusBadge from "./Components/Common/StatusBadge/StatusBadge";

function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const headers = [
        "Name",
        "Department",
        "Status"
    ];

    const data = [
        {
            name: "Sara Omar",
            department: "Network Engineering",
            status: <StatusBadge status="Completed" />
        },
        {
            name: "Ahmed Ali",
            department: "IT Infrastructure",
            status: <StatusBadge status="Warning" />
        },
        {
            name: "Mohammed Saad",
            department: "Cybersecurity",
            status: <StatusBadge status="Expired" />
        },
        {
            name: "Nora Khalid",
            department: "Human Resources",
            status: <StatusBadge status="Pending" />
        }
    ];

    return (
        <div className="test-page">

            {/* SIDEBAR */}
            <Sidebar
                role="employee"
                activePage="Main page"
            />


            {/* MAIN CONTENT */}
            <main className="test-content">

                <h1>Components Test</h1>


                {/* INPUT */}
                <section>
                    <h2>Input</h2>

                    <Card>
                        <Input
                            label="Course Name"
                            placeholder="Enter course name"
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                        />
                    </Card>
                </section>


                {/* CARD */}
                <section>
                    <h2>Card</h2>

                    <div className="test-card-grid">

                        <Card>
                            <h3>Total Courses</h3>
                            <strong>24</strong>
                            <p>training courses</p>
                        </Card>

                        <Card>
                            <h3>Completed Courses</h3>
                            <strong>5</strong>
                            <p>Successfully completed</p>
                        </Card>

                        <Card>
                            <h3>Pending Requests</h3>
                            <strong>18</strong>
                            <p>Waiting for approval</p>
                        </Card>

                    </div>
                </section>


                {/* STATUS BADGES */}
                <section>
                    <h2>Status Badges</h2>

                    <Card>
                        <div className="badge-test">
                            <StatusBadge status="Completed" />
                            <StatusBadge status="Warning" />
                            <StatusBadge status="Expired" />
                            <StatusBadge status="Pending" />
                        </div>
                    </Card>
                </section>


                {/* TABLE */}
                <section>
                    <h2>Table</h2>

                    <Table
                        headers={headers}
                        data={data}
                    />
                </section>


                {/* MODAL */}
                <section>
                    <h2>Modal</h2>

                    <Card>
                        <button
                            onClick={() => setIsModalOpen(true)}
                        >
                            Open Modal
                        </button>
                    </Card>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Test Modal"
                    >
                        <p>
                            This is a test of the reusable Modal
                            component.
                        </p>

                        <button
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </Modal>
                </section>

            </main>
        </div>
    );
}

export default Test;