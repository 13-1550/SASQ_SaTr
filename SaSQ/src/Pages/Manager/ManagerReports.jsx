
import { useState } from "react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Reports from "../Reports/Reports";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import ManagerHeader from "./ManagerHeader";

function ManagerReports() {
    const [reportType, setReportType] = useState("");
    const [employeeSearch, setEmployeeSearch] = useState("");
    const [showEmployees, setShowEmployees] = useState(false);

    const [department, setDepartment] = useState("IT");
    const [subDepartment, setSubDepartment] = useState("All");
    const [dateRange, setDateRange] = useState("all");

    const [appliedFilters, setAppliedFilters] = useState({
        department: "IT",
        subDepartment: "All",
        dateRange: "all",
        employee: "All Employees"
    });

    const Employees = [
        {
            name: "Mohammed Abdullah",
            department: "IT",
            subDepartment: "ITBM",
            completed: 14,
            total: 22,
            valid: 8,
            soonToExpire: 3,
            expired: 2,
            pending: 1,
            courses: 6,
            completedCourses: 4,
            ongoingCourses: 1,
            pendingCourses: 1,
            date: "2026-01-05"
        },
        {
            name: "Sara Omar",
            department: "IT",
            subDepartment: "ITC",
            completed: 10,
            total: 22,
            valid: 6,
            soonToExpire: 2,
            expired: 1,
            pending: 2,
            courses: 5,
            completedCourses: 3,
            ongoingCourses: 1,
            pendingCourses: 1,
            date: "2026-02-12"
        },
        {
            name: "Ahmed Ali",
            department: "IT",
            subDepartment: "IT AVBM",
            completed: 6,
            total: 30,
            valid: 5,
            soonToExpire: 4,
            expired: 2,
            pending: 3,
            courses: 8,
            completedCourses: 4,
            ongoingCourses: 2,
            pendingCourses: 2,
            date: "2026-03-18"
        },
        {
            name: "Nora Khalid",
            department: "HR",
            subDepartment: "ADOCM",
            completed: 17,
            total: 24,
            valid: 9,
            soonToExpire: 2,
            expired: 1,
            pending: 1,
            courses: 7,
            completedCourses: 5,
            ongoingCourses: 1,
            pendingCourses: 1,
            date: "2026-01-20"
        },
        {
            name: "Mohammed Saad",
            department: "HR",
            subDepartment: "ASD",
            completed: 14,
            total: 18,
            valid: 7,
            soonToExpire: 3,
            expired: 2,
            pending: 2,
            courses: 6,
            completedCourses: 3,
            ongoingCourses: 2,
            pendingCourses: 1,
            date: "2026-04-10"
        },
        {
            name: "Khalid Ahmed",
            department: "Finance",
            subDepartment: "ITPSM",
            completed: 7,
            total: 30,
            valid: 4,
            soonToExpire: 3,
            expired: 4,
            pending: 2,
            courses: 5,
            completedCourses: 2,
            ongoingCourses: 2,
            pendingCourses: 1,
            date: "2026-05-15"
        },
        {
            name: "Reem Abdullah",
            department: "Finance",
            subDepartment: "ITSMC",
            completed: 24,
            total: 24,
            valid: 10,
            soonToExpire: 1,
            expired: 0,
            pending: 1,
            courses: 8,
            completedCourses: 7,
            ongoingCourses: 1,
            pendingCourses: 0,
            date: "2026-06-01"
        },
        {
            name: "Faisal Saleh",
            department: "IT",
            subDepartment: "CCITSS",
            completed: 14,
            total: 30,
            valid: 6,
            soonToExpire: 4,
            expired: 3,
            pending: 2,
            courses: 7,
            completedCourses: 4,
            ongoingCourses: 2,
            pendingCourses: 1,
            date: "2026-06-10"
        },
        {
            name: "Lama Hassan",
            department: "HR",
            subDepartment: "ADOCM",
            completed: 12,
            total: 20,
            valid: 8,
            soonToExpire: 1,
            expired: 1,
            pending: 2,
            courses: 5,
            completedCourses: 3,
            ongoingCourses: 1,
            pendingCourses: 1,
            date: "2026-02-25"
        }
    ];

    const departments = ["IT", "HR", "Finance"];

    const subDepartments = [
        ...new Set(
            Employees
                .filter((employee) =>
                    department === "All" ||
                    employee.department === department
                )
                .map((employee) => employee.subDepartment)
        )
    ];

    const filteredEmployees = Employees.filter((employee) =>
        employee.name.toLowerCase().includes(employeeSearch.toLowerCase())
    );

    const reportEmployees = Employees.filter((employee) => {
        const matchesDepartment =
            appliedFilters.department === "All" ||
            employee.department === appliedFilters.department;

        const matchesSubDepartment =
            appliedFilters.subDepartment === "All" ||
            employee.subDepartment === appliedFilters.subDepartment;

        const matchesEmployee =
            appliedFilters.employee === "All Employees" ||
            employee.name === appliedFilters.employee;

        const matchesDate =
            appliedFilters.dateRange === "all" ||
            (appliedFilters.dateRange === "jan" &&
                employee.date >= "2026-01-01" &&
                employee.date <= "2026-01-31") ||
            (appliedFilters.dateRange === "firstHalf" &&
                employee.date >= "2026-01-01" &&
                employee.date <= "2026-06-30");

        return (
            matchesDepartment &&
            matchesSubDepartment &&
            matchesEmployee &&
            matchesDate
        );
    });

    const completionData = Object.values(
        reportEmployees.reduce((groups, employee) => {
            const key = employee.subDepartment;

            if (!groups[key]) {
                groups[key] = {
                    department: key,
                    completed: 0,
                    total: 0
                };
            }

            groups[key].completed += employee.completed;
            groups[key].total += employee.total;

            return groups;
        }, {})
    );

    const certificateData = reportEmployees.reduce(
        (result, employee) => {
            result.valid += employee.valid;
            result.soonToExpire += employee.soonToExpire;
            result.expired += employee.expired;
            result.pending += employee.pending;

            return result;
        },
        {
            valid: 0,
            soonToExpire: 0,
            expired: 0,
            pending: 0
        }
    );

    const trainingData = reportEmployees.reduce(
        (result, employee) => {
            result.totalCourses += employee.courses;
            result.completedCourses += employee.completedCourses;
            result.ongoingCourses += employee.ongoingCourses;
            result.pendingCourses += employee.pendingCourses;

            return result;
        },
        {
            totalCourses: 0,
            completedCourses: 0,
            ongoingCourses: 0,
            pendingCourses: 0
        }
    );

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
        const nextIndex = (currentIndex + 1) % reportTypes.length;

        setReportType(reportTypes[nextIndex]);
    };

    const previousReport = () => {
        const currentIndex = reportTypes.indexOf(reportType);
        const previousIndex =
            (currentIndex - 1 + reportTypes.length) % reportTypes.length;

        setReportType(reportTypes[previousIndex]);
    };

    const currentReport = reportInfo[reportType];

    const generateReport = () => {
        setAppliedFilters({
            department,
            subDepartment,
            dateRange,
            employee: employeeSearch.trim() || "All Employees"
        });

        setShowEmployees(false);
    };

    return (
        <div className="ManagerReports">
            <Sidebar role="manager" />

            <main className="ManagerReports-content">
                <ManagerHeader />
                <h1>Reports</h1>

                <div className="report-filters">
                    <select
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                            setSubDepartment("All");
                        }}
                    >
                        <option value="All">All Departments</option>
                        {departments.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={subDepartment}
                        onChange={(e) => setSubDepartment(e.target.value)}
                    >
                        <option value="All">All Sub-departments</option>
                        {subDepartments.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="all">All Dates</option>
                        <option value="jan">January 2026</option>
                        <option value="firstHalf">
                            January - June 2026
                        </option>
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
                                        setEmployeeSearch("");
                                        setAppliedFilters((previous) => ({
                                            ...previous,
                                            employee: "All Employees"
                                        }));
                                        setShowEmployees(false);
                                    }}
                                >
                                    All Employees
                                </div>

                                {filteredEmployees.map((employee) => (
                                    <div
                                        key={employee.name}
                                        onClick={() => {
                                            setEmployeeSearch(employee.name);
                                            setShowEmployees(false);
                                        }}
                                    >
                                        {employee.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <select
                        className="report-type-select"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="" disabled>
                            Report Type
                        </option>
                        <option value="completion">Completion Rates</option>
                        <option value="certificate">Certificate Status</option>
                        <option value="training">Training Summary</option>
                    </select>

                    <Button type="white" onClick={generateReport}>
                        View
                    </Button>

                    <Button type="white" onClick={generateReport}>
                        Export
                    </Button>

                    <Button type="green" onClick={generateReport}>
                        Generate
                    </Button>
                </div>

                {reportType && currentReport && (
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
