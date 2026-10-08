import { useState } from "react"; 
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import Modal from "../../Components/Common/Modal/Modal";
import Table from "../../Components/Common/Table/Table";
import {List} from "lucide-react";
function ManagerCourses(){

    const [selectedCourse, setSelectedCourse] = useState(null);

        const headers = [
            "Name",
            "Course Code",
            "Trainer",
            
        ];
        const fields =[
            "Course_name",
            "Course_code",
            "Trainer"
        ];
        const dataCT = [
            {
            Course_name: "Cybersecurity Awareness",
            Course_code:"CSA-1012",
            Trainer:"SAUDIA Learning",
            Validity: "Permenant",
            Mandatory:["All Employees"]
            },
            {
            Course_name: "Fire Safety",
            Course_code:"IOSH",
            Trainer:"Civil Defence",
            Validity: "Permenant",
            Mandatory:["All Employees"]
            },
            {
            Course_name: "First Aid and CPR",
            Course_code:"FACC",
            Trainer:"Saudi Red Crescent",
            Validity: 2,
            Mandatory: ["None"]
            },
            {
            Course_name: "Code of Conduct and Ethics",
            Course_code:"CCE-1445",
            Trainer:"HR Department",
            Validity: 3,
            Mandatory:["Human resources Departments"]
            },
            {
            Course_name: "AI Productivity Fundamentals",
            Course_code:"AIC1001",
            Trainer:"Microsoft",
            Validity: "Permanent",
            Mandatory:["IT Departments"]
            },
            {
            Course_name: "Time Management",
            Course_code:"TM0123",
            Trainer:"Coursera",
            Validity: "Permanent",
            Mandatory:["None"]
            },
        ];

    return (
        <div className="ManagerCourses">
            <Sidebar
            role="manager"
            />

            <main className="MCourses-content">
            <h1>Employees Courses</h1>
            <div className="CoursesFilters">
                <select>
                    <option>Mandatory only</option>
                </select>
            <select>
                <option>Least Validity Duration</option>
                <option>Mandatory first</option>
                <option>Most Validity Duration</option>

            </select>
                <Table 
                headers={headers}
    fields={fields}
    data={dataCT}
    actions={(row) => (
        <button
            className="details-button"
            onClick={() => setSelectedCourse(row)}
        >
            <List size={20} />
        </button>
    )}
                />


            </div>

            </main>

            {selectedCourse && (
                <Modal
                    onClose={() => setSelectedCourse(null)}
                >
                    <h2>{selectedCourse.Course_name}</h2>

                    <p>
                        <strong>Course Code:</strong>{" "}
                        {selectedCourse.Course_code}
                    </p>

                    <p>
                        <strong>Trainer:</strong>{" "}
                        {selectedCourse.Trainer}
                    </p>

                    <p>
                        <strong>Validity:</strong>{" "}
                        {selectedCourse.Validity}
                    </p>

                    <p>
                        <strong>Mandatory For:</strong>{" "}
                        {selectedCourse.Mandatory.join(", ")}
                    </p>
                </Modal>
            )}

        </div>


    );


}

export default ManagerCourses;