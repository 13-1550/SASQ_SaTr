import { useState } from "react";

import Sidebar from "./Components/Common/Sidebar/Sidebar";
import Card from "./Components/Common/Card/Card";
import Input from "./Components/Common/Input/Input";
import Modal from "./Components/Common/Modal/Modal";
import Table from "./Components/Common/Table/Table";
import StatusBadge from "./Components/Common/StatusBadge/StatusBadge";
import Button from "./Components/Common/Button/Button";

import{
    LibraryBig,
    Check,
    Hourglass,
}from "lucide-react";

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

                    <div className="box">
                        <Input
                            label="Course Name"
                            placeholder="Enter course name"
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                        />
                    </div>
                </section>


                {/* CARD */}
                    <section>
                        <h2>Card</h2>

                        <div className="test-card-grid">

                            <Card
                                 label="Total Courses"
                                number="24"
                                icon={<LibraryBig size={28} color="var(--primary-green)" />}
                                numberColor="green"
                            />

                            <Card
                               label="Completed Courses"
                                number="5"
                                icon={<Check size={28} color="var(--primary-green)" />}
                                numberColor="green"
                                />

                            <Card
                                label="Pending Requests"
                                number="18"
                                icon={<Hourglass size={28} color="#f1b40b" />}
                                numberColor="orange"
                            />
                                                        

                        </div>
                    </section>


                {/* STATUS BADGES */}
                <section>
                    <h2>Status Badges</h2>

                    <card>
                        <div className="badge-test">
                            <StatusBadge status="Completed" />
                            <StatusBadge status="Warning" />
                            <StatusBadge status="Expired" />
                            <StatusBadge status="Pending" />
                        </div>
                    </card>
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

                    <card>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                        >
                            Open Modal
                        </Button>
                    </card>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Test Modal"
                    >
                        <p>
                            This is a test of the reusable Modal
                            component.
                        </p>

                        <Button type="white"
                        onClick={() => setIsModalOpen(false)}>
                        Cancel
                        </Button>
                    </Modal>
                </section>

            </main>
        </div>
    );
}

export default Test;