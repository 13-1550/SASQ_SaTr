import { useState } from "react"; 
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import Modal from "../../Components/Common/Modal/Modal";
import Table from "../../Components/Common/Table/Table";
import {List, FileText, Download} from "lucide-react";
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
        type="button"
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
    isOpen={selectedCourse !== null}
    onClose={() => setSelectedCourse(null)}
    title=""
>
    {selectedCourse && (
        <div className="course-details-modal">

            <div className="course-details-heading">
                <FileText size={36} strokeWidth={1.5} />
                <h2>Course Details</h2>
            </div>

            <div className="course-details-grid">

                <div className="course-detail-field course-name-field">
                    <label>Course Name</label>
                    <input
                        value={selectedCourse.Course_name}
                        readOnly
                    />
                </div>

                <div className="course-detail-field">
                    <label>Course Code</label>
                    <input
                        value={selectedCourse.Course_code}
                        readOnly
                    />
                </div>

                <div className="course-detail-field">
                    <label>Trainer</label>
                    <input
                        value={selectedCourse.Trainer}
                        readOnly
                    />
                </div>

                <div className="course-detail-field">
                    <label>Validity Duration</label>
                    <input
                        value={
                            typeof selectedCourse.Validity === "number"
                                ? `${selectedCourse.Validity} Year${selectedCourse.Validity === 1 ? "" : "s"}`
                                : selectedCourse.Validity
                        }
                        readOnly
                    />
                </div>

                <div className="course-detail-field mandatory-field">
                    <label>Mandatory For</label>
                    <input
                        value={selectedCourse.Mandatory.join(", ")}
                        readOnly
                    />
                </div>

            </div>

            <button
                type="button"
                className="syllabus-button"
                onClick={() => {
                    if (selectedCourse.Syllabus) {
                        window.open(
                            selectedCourse.Syllabus,
                            "_blank",
                            "noopener,noreferrer"
                        );
                    }
                }}
                disabled={!selectedCourse.Syllabus}
            >
                <span>Syllabus</span>
                <Download size={26} />
            </button>

        </div>
    )}
</Modal>
            )}

        </div>


    );


}

export default ManagerCourses;