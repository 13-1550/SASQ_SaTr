
import { useState } from "react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Input from "../../Components/Common/Input/Input";
import Table from "../../Components/Common/Table/Table";
import { Eye, ArrowLeft, Bell, Check, X, FileText, MessageSquare } from "lucide-react";
import ManagerHeader from "./ManagerHeader";
function ManagerEmployees() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    const employees = [
        {
            id: 1,
            Name: "Ahmed Ali",
            CORPID: "30002145",
            Position: "IT Support",
            Department: "IT Support",
            Status: "Active",
            firstName: "Ahmed",
            middleName: "M.",
            lastName: "Ali",
            email: "Ahmed.Ali@Saudia.com",
            payroll: "30002145",
            seniority: "12-Sep-2020",
            subDepartment: "IT Operations",
            completion: 85,
            requiredCourses: [
                {
                    course: "Cybersecurity Awareness",
                    completed: true,
                    result: "Pass",
                    expiry: "01-Jan-2027",
                    status: "Active"
                },
                {
                    course: "Fire Safety",
                    completed: true,
                    result: "Pass",
                    expiry: "10-Jan-2027",
                    status: "Active"
                }
            ],
            optionalCourses: [
                {
                    course: "Data Center Networking",
                    completed: true,
                    result: "Pass",
                    expiry: "01-Jan-2027",
                    status: "Active"
                },
                {
                    course: "First Aid and CPR",
                    completed: false,
                    result: "Pending",
                    expiry: "—",
                    status: "Pending"
                }
            ]
        },
        {
            id: 2,
            Name: "Sara Omar",
            CORPID: "30002168",
            Position: "Network Eng",
            Department: "IT Infrastructure",
            Status: "Warning",
            firstName: "Sara",
            middleName: "Omar",
            lastName: "AlHazmi",
            email: "Sara@Saudia.com",
            payroll: "30002168",
            seniority: "12-Sep-2016",
            subDepartment: "Network",
            completion: 70,
            requiredCourses: [
                {
                    course: "Network Security Fundamentals",
                    completed: true,
                    result: "Pass",
                    expiry: "01-Jan-2027",
                    status: "Active"
                },
                {
                    course: "Cisco Certified Network Professional",
                    completed: true,
                    result: "Pass",
                    expiry: "10-Jan-2027",
                    status: "Expired"
                }
            ],
            optionalCourses: [
                {
                    course: "Data Center Networking",
                    completed: true,
                    result: "Pass",
                    expiry: "01-Jan-2027",
                    status: "Active"
                },
                {
                    course: "Fire Safety Awareness",
                    completed: false,
                    result: "Fail",
                    expiry: "29-May-2027",
                    status: "Expired"
                }
            ]
        },
        {
            id: 3,
            Name: "Faisal Saleh",
            CORPID: "30002210",
            Position: "Security Spec",
            Department: "Security",
            Status: "Active",
            firstName: "Faisal",
            middleName: "A.",
            lastName: "Saleh",
            email: "Faisal@Saudia.com",
            payroll: "30002210",
            seniority: "15-Feb-2021",
            subDepartment: "Security Operations",
            completion: 90,
            requiredCourses: [],
            optionalCourses: []
        },
        {
            id: 4,
            Name: "Reem Abdullah",
            CORPID: "30002245",
            Position: "HR Specialist",
            Department: "Human Resources",
            Status: "Expired",
            firstName: "Reem",
            middleName: "A.",
            lastName: "Abdullah",
            email: "Reem@Saudia.com",
            payroll: "30002245",
            seniority: "20-Mar-2019",
            subDepartment: "HR Operations",
            completion: 45,
            requiredCourses: [],
            optionalCourses: []
        }
    ];

    const filteredEmployees = employees
        .filter((employee) =>
            Object.values(employee)
                .filter((value) => typeof value === "string" || typeof value === "number")
                .some((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase())
                )
        )
        .sort((a, b) => {
            if (sortBy === "name") {
                return a.Name.localeCompare(b.Name);
            }
            if (sortBy === "department") {
                return a.Department.localeCompare(b.Department);
            }
            if (sortBy === "status") {
                return a.Status.localeCompare(b.Status);
            }
            return a.id - b.id;
        });

    const headers = [
        "#",
        "Name",
        "CORPID",
        "Position",
        "Department",
        "Status",
        "Details"
    ];

    const tableData = filteredEmployees.map((employee) => ({
        id: employee.id,
        Name: employee.Name,
        CORPID: employee.CORPID,
        Position: employee.Position,
        Department: employee.Department,
        Status: (
            <span className={`employee-status status-${employee.Status.toLowerCase()}`}>
                {employee.Status}
            </span>
        )
    }));

    const renderCourseTable = (courses) => (
        <div className="employee-detail-table-wrapper">
            <table className="employee-detail-table">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Completed?</th>
                        <th>Result</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Certificate Doc</th>
                        <th>Feedback</th>
                    </tr>
                </thead>

                <tbody>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <tr key={course.course}>
                                <td>{course.course}</td>
                                <td>
                                    <span className={`completion-mark ${course.completed ? "mark-yes" : "mark-no"}`}>
                                        {course.completed ? <Check size={15} /> : <X size={15} />}
                                    </span>
                                </td>
                                <td>{course.result}</td>
                                <td>{course.expiry}</td>
                                <td>
                                    <span className={`employee-status status-${course.status.toLowerCase()}`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="document-button"
                                        title="Certificate document (demo)"
                                        onClick={() => alert("Certificate document demo")}
                                    >
                                        <FileText size={19} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="feedback-button"
                                        title="Feedback (demo)"
                                        onClick={() => alert("Feedback demo")}
                                    >
                                        <MessageSquare size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="employee-no-courses">
                                No courses available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="manager-employees-page">
            <Sidebar role="manager" />
    
            <main className="manager-employees-content">
                <ManagerHeader />
                {selectedEmployee ? (
                    <>
                        <header className="employee-details-topbar">
                            <h1>Employees Details</h1>

                            <div className="employee-manager-info">
                                <Bell size={21} color="#037c43" />
                                <div className="manager-avatar">M</div>
                                <div>
                                    <strong>Mohammed Abdullah</strong>
                                    <p>Manager</p>
                                </div>
                            </div>
                        </header>

                        <button
                            type="button"
                            className="employee-back-button"
                            onClick={() => setSelectedEmployee(null)}
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <div className="employee-details-grid">
                            <section className="employee-profile-card">
                                <div className="employee-profile-heading">
                                    <div className="employee-avatar">👤</div>

                                    <div className="employee-profile-name">
                                        <h2>
                                            {selectedEmployee.firstName}{" "}
                                            {selectedEmployee.middleName}{" "}
                                            {selectedEmployee.lastName}
                                        </h2>
                                        <p>
                                            {selectedEmployee.Position},{" "}
                                            {selectedEmployee.Department} Department
                                        </p>
                                    </div>

                                    <span className={`employee-status status-${selectedEmployee.Status.toLowerCase()}`}>
                                        {selectedEmployee.Status}
                                    </span>
                                </div>

                                <div className="employee-personal-grid">
                                    <div>
                                        <label>First Name</label>
                                        <p>{selectedEmployee.firstName}</p>
                                    </div>
                                    <div>
                                        <label>Middle Name</label>
                                        <p>{selectedEmployee.middleName}</p>
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <p>{selectedEmployee.lastName}</p>
                                    </div>
                                    <div>
                                        <label>Email Address</label>
                                        <p>{selectedEmployee.email}</p>
                                    </div>
                                    <div>
                                        <label>Payroll Number</label>
                                        <p>{selectedEmployee.payroll}</p>
                                    </div>
                                    <div>
                                        <label>Position</label>
                                        <p>{selectedEmployee.Position}</p>
                                    </div>
                                    <div>
                                        <label>Department</label>
                                        <p>{selectedEmployee.Department}</p>
                                    </div>
                                    <div>
                                        <label>Sub - Department</label>
                                        <p>{selectedEmployee.subDepartment}</p>
                                    </div>
                                    <div>
                                        <label>Seniority Date</label>
                                        <p>{selectedEmployee.seniority}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="employee-completion-card">
                                <p>Overall Course Completion Rate</p>
                                <div
                                    className="employee-completion-circle"
                                    style={{
                                        "--completion": `${selectedEmployee.completion}%`
                                    }}
                                >
                                    <strong>{selectedEmployee.completion}%</strong>
                                </div>
                            </section>
                        </div>

                        <section className="employee-courses-section">
                            <h2>Required Courses and Certificates</h2>
                            {renderCourseTable(selectedEmployee.requiredCourses)}
                        </section>

                        <section className="employee-courses-section">
                            <h2>Optional Courses and Certificates</h2>
                            {renderCourseTable(selectedEmployee.optionalCourses)}
                        </section>
                    </>
                ) : (
                    <>
                        <h1>Employees Records</h1>

                        <div className="employee-record-filters">
                            <Input
                                placeholder="Search by any field..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />

                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="name">Name</option>
                                <option value="department">Department</option>
                                <option value="status">Status</option>
                            </select>
                        </div>

                        <div className="employee-record-table">
                            <table>
                                <thead>
                                    <tr>
                                        {headers.map((header) => (
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredEmployees.length > 0 ? (
                                        filteredEmployees.map((employee, index) => (
                                            <tr key={employee.id}>
                                                <td>{index + 1}</td>
                                                <td>{employee.Name}</td>
                                                <td>{employee.CORPID}</td>
                                                <td>{employee.Position}</td>
                                                <td>{employee.Department}</td>
                                                <td>
                                                    <span className={`employee-status status-${employee.Status.toLowerCase()}`}>
                                                        {employee.Status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="employee-eye-button"
                                                        aria-label={`View ${employee.Name}`}
                                                        onClick={() => setSelectedEmployee(employee)}
                                                    >
                                                        <Eye size={22} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="employee-no-courses">
                                                No employees found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default ManagerEmployees;
