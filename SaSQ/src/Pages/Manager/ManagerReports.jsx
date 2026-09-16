import { useState } from "react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Reports from "../Reports/Reports";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
function ManagerReports() {

    const [reportType, setReportType] = useState("");
    const [employeeSearch, setEmployeeSearch] = useState("");
    const [showEmployees, setShowEmployees] = useState(false);


const employees = [
    "Mohammed Abdullah",
    "Sara Omar",
    "Ahmed Ali",
    "Nora Khalid",
    "Mohammed Saad",
    "Khalid Ahmed",
    "Reem Abdullah",
];

const filteredEmployees = employees.filter((employee) =>
    employee.toLowerCase().includes(employeeSearch.toLowerCase())
);

    const completionData = [
        { department: "ITBM", completed: 14, total: 22 },
        { department: "IT AVBM", completed: 6, total: 30 },
        { department: "ITC", completed: 10, total: 22 },
        { department: "CCITSS", completed: 14, total: 30 },
        { department: "AOITSS", completed: 7, total: 18 },
        { department: "ITPSM", completed: 7, total: 30 },
        { department: "ITSMC", completed: 24, total: 24 },
        { department: "ASD", completed: 14, total: 18 },
        { department: "ADOCM", completed: 17, total: 24 }
    ];

    const certificateData = {
        valid: 256,
        soonToExpire: 107,
        expired: 93,
        pending: 44
    };

    const trainingData = {
        totalCourses: 36,
        completedCourses: 24,
        ongoingCourses: 8,
        pendingCourses: 4
    };
    const reportInfo = {
        completion: {
            title: "Completion by Department",
            data: completionData
        },

        certificate: {
            title: "Certificate Status",
            data: certificateData
        },

        training: {
            title: "Training Summary",
            data: trainingData
        }
    };
    const reportTypes = [
    "completion",
    "certificate",
    "training"
];

 const nextReport = () => {
        const currentIndex = reportTypes.indexOf(reportType);

        const nextIndex =
            (currentIndex + 1) % reportTypes.length;

        setReportType(reportTypes[nextIndex]);
    };

    const previousReport = () => {
        const currentIndex = reportTypes.indexOf(reportType);

        const previousIndex =
            (currentIndex - 1 + reportTypes.length) %
            reportTypes.length;

        setReportType(reportTypes[previousIndex]);
    };

    const currentReport = reportInfo[reportType];

    return (
        <div className="ManagerReports">

            <Sidebar
                role="manager"
                activePage="Reports"
            />

               <main className="ManagerReports-content">

                <h1>Reports</h1>

                {/* FILTERS */}
                <div className="report-filters">

                    <select>
        <option>IT</option>
        <option>HR</option>
        <option>Finance</option>
    </select>

    <select>
        <option>-</option>
    </select>

                    <select>
        <option>1/1/26 - 1/6/26</option>
        <option>12/1/25 - 12/31/25</option>
    </select>

    <div className="employee-select">

    <Input
        placeholder="Search Employee"
        value={employeeSearch}
        onChange={(e) => {
            setEmployeeSearch(e.target.value);
            setShowEmployees(true);
        }}
        onFocus={() => setShowEmployees(true)}
    />

    {showEmployees && (
        <div className="employee-options">

            <div
                onClick={() => {
                    setEmployeeSearch("All Employees");
                    setShowEmployees(false);
                }}
            >
                All Employees
            </div>

            {filteredEmployees.map((employee) => (
                <div
                    key={employee}
                    onClick={() => {
                        setEmployeeSearch(employee);
                        setShowEmployees(false);
                    }}
                >
                    {employee}
                </div>
            ))}

        </div>
    )}

</div>
                {/* REPORT TYPE */}
                    <select
    className="report-type-select"
    value={reportType}
    onChange={(e) => setReportType(e.target.value)}
>
    <option value="" disabled>
        Report Type
    </option>
                        <option value="completion">
                            Completion Rates
                        </option>

                        <option value="certificate">
                            Certificate Status
                        </option>

                        <option value="training">
                            Training Summary
                        </option>
                    </select>

                    <Button type="white">
                        View
                    </Button>

                    <Button type="white">
                        Export
                    </Button>

                    <Button type="green">
                        Generate
                    </Button>

                </div>

                {/* CURRENT REPORT */}
                {reportType && (
    <Reports
        title={currentReport.title}
        data={currentReport.data}
        type={reportType}
        onNext={nextReport}
        onPrevious={previousReport}
    />
)}

            </main>

        </div>
    );
}

export default ManagerReports;