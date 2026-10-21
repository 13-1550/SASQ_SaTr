
import { useState } from "react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Reports from "../Reports/Reports";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";

function CoordinatorReports() {
  const [reportType, setReportType] = useState("completion");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [showEmployees, setShowEmployees] = useState(false);
  const [department, setDepartment] = useState("All Departments");
  const [subDepartment, setSubDepartment] = useState("All");
  const [dateRange, setDateRange] = useState("All Dates");
  const [appliedFilters, setAppliedFilters] = useState({
    department: "All Departments",
    subDepartment: "All",
    employee: "All Employees",
    dateRange: "All Dates",
  });

  // Training Coordinator's employee training records
  const Employees = [
    {
      name: "Hanan Mohammed",
      department: "IT",
      subDepartment: "ITBM",
      completed: 12,
      total: 15,
      valid: 5,
      soonToExpire: 2,
      expired: 1,
      pending: 1,
      courses: 6,
      completedCourses: 4,
      ongoingCourses: 1,
      pendingCourses: 1,
      date: "2026-01-15",
    },
    {
      name: "Fahad Abdullah",
      department: "IT",
      subDepartment: "ITC",
      completed: 8,
      total: 14,
      valid: 3,
      soonToExpire: 1,
      expired: 2,
      pending: 2,
      courses: 5,
      completedCourses: 2,
      ongoingCourses: 2,
      pendingCourses: 1,
      date: "2026-02-10",
    },
    {
      name: "Rana Khalid",
      department: "IT",
      subDepartment: "IT AVBM",
      completed: 15,
      total: 18,
      valid: 7,
      soonToExpire: 1,
      expired: 0,
      pending: 1,
      courses: 7,
      completedCourses: 5,
      ongoingCourses: 1,
      pendingCourses: 1,
      date: "2026-03-12",
    },
    {
      name: "Yousef Saleh",
      department: "HR",
      subDepartment: "ADOCM",
      completed: 9,
      total: 16,
      valid: 4,
      soonToExpire: 2,
      expired: 1,
      pending: 2,
      courses: 6,
      completedCourses: 3,
      ongoingCourses: 1,
      pendingCourses: 2,
      date: "2026-01-22",
    },
    {
      name: "Lina Ahmed",
      department: "HR",
      subDepartment: "ASD",
      completed: 14,
      total: 16,
      valid: 6,
      soonToExpire: 1,
      expired: 1,
      pending: 0,
      courses: 5,
      completedCourses: 4,
      ongoingCourses: 1,
      pendingCourses: 0,
      date: "2026-04-08",
    },
    {
      name: "Omar Faisal",
      department: "Finance",
      subDepartment: "ITPSM",
      completed: 6,
      total: 12,
      valid: 2,
      soonToExpire: 2,
      expired: 2,
      pending: 3,
      courses: 4,
      completedCourses: 1,
      ongoingCourses: 1,
      pendingCourses: 2,
      date: "2026-05-17",
    },
    {
      name: "Maha Ibrahim",
      department: "Finance",
      subDepartment: "ITSMC",
      completed: 11,
      total: 13,
      valid: 5,
      soonToExpire: 1,
      expired: 0,
      pending: 1,
      courses: 6,
      completedCourses: 4,
      ongoingCourses: 1,
      pendingCourses: 1,
      date: "2026-06-05",
    },
    {
      name: "Salman Nasser",
      department: "IT",
      subDepartment: "CCITSS",
      completed: 10,
      total: 17,
      valid: 4,
      soonToExpire: 3,
      expired: 1,
      pending: 2,
      courses: 7,
      completedCourses: 3,
      ongoingCourses: 2,
      pendingCourses: 2,
      date: "2026-06-18",
    },
  ];

  const departments = ["IT", "HR", "Finance"];

  const subDepartments = [
    ...new Set(
      Employees.filter(
        (employee) =>
          department === "All Departments" ||
          employee.department === department
      ).map((employee) => employee.subDepartment)
    ),
  ];

  const filteredEmployees = Employees.filter((employee) =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const reportEmployees = Employees.filter((employee) => {
    const matchesDepartment =
      appliedFilters.department === "All Departments" ||
      employee.department === appliedFilters.department;

    const matchesSubDepartment =
      appliedFilters.subDepartment === "All" ||
      employee.subDepartment === appliedFilters.subDepartment;

    const matchesEmployee =
      appliedFilters.employee === "All Employees" ||
      employee.name === appliedFilters.employee;

    const employeeDate = new Date(employee.date);

    const matchesDate =
      appliedFilters.dateRange === "All Dates" ||
      (appliedFilters.dateRange === "January 2026" &&
        employeeDate.getMonth() === 0 &&
        employeeDate.getFullYear() === 2026) ||
      (appliedFilters.dateRange === "January-June 2026" &&
        employeeDate >= new Date("2026-01-01") &&
        employeeDate <= new Date("2026-06-30"));

    return (
      matchesDepartment &&
      matchesSubDepartment &&
      matchesEmployee &&
      matchesDate
    );
  });

  // Completion report grouped by sub-department
  const completionGroups = {};

  reportEmployees.forEach((employee) => {
    if (!completionGroups[employee.subDepartment]) {
      completionGroups[employee.subDepartment] = {
        department: employee.subDepartment,
        completed: 0,
        total: 0,
      };
    }

    completionGroups[employee.subDepartment].completed += employee.completed;
    completionGroups[employee.subDepartment].total += employee.total;
  });

  const completionData = Object.values(completionGroups);

  // Certificate report
  const certificateData = reportEmployees.reduce(
    (totals, employee) => ({
      valid: totals.valid + employee.valid,
      soonToExpire: totals.soonToExpire + employee.soonToExpire,
      expired: totals.expired + employee.expired,
      pending: totals.pending + employee.pending,
    }),
    { valid: 0, soonToExpire: 0, expired: 0, pending: 0 }
  );

  // Training activity report
  const trainingData = reportEmployees.reduce(
    (totals, employee) => ({
      totalCourses: totals.totalCourses + employee.courses,
      completedCourses:
        totals.completedCourses + employee.completedCourses,
      ongoingCourses: totals.ongoingCourses + employee.ongoingCourses,
      pendingCourses: totals.pendingCourses + employee.pendingCourses,
    }),
    {
      totalCourses: 0,
      completedCourses: 0,
      ongoingCourses: 0,
      pendingCourses: 0,
    }
  );

  const reportInfo = {
    completion: {
      title: "Training Completion Report",
      data: completionData,
      type: "completion",
    },
    certificate: {
      title: "Employee Certificate Report",
      data: certificateData,
      type: "certificate",
    },
    training: {
      title: "Training Activity Report",
      data: trainingData,
      type: "training",
    },
  };

  const reportTypes = [
    { value: "completion", label: "Training Completion" },
    { value: "certificate", label: "Employee Certificates" },
    { value: "training", label: "Training Activity" },
  ];

  const currentReport = reportInfo[reportType];

  function generateReport() {
    setAppliedFilters({
      department,
      subDepartment,
      employee: employeeSearch.trim() || "All Employees",
      dateRange,
    });

    setShowEmployees(false);
  }

  function selectEmployee(name) {
    setEmployeeSearch(name === "All Employees" ? "" : name);

    setAppliedFilters((previous) => ({
      ...previous,
      employee: name,
    }));

    setShowEmployees(false);
  }

  return (
    <div className="CoordinatorReports">
      <Sidebar role="coordinator" />

      <main className="CoordinatorReports-content">
        <h1>Training Reports</h1>
        <p>Monitor employee training progress and certificates.</p>

        <div className="reports-filters">
          <div className="report-filter">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(event) => setReportType(event.target.value)}
            >
              {reportTypes.map((report) => (
                <option key={report.value} value={report.value}>
                  {report.label}
                </option>
              ))}
            </select>
          </div>

          <div className="report-filter">
            <label>Department</label>
            <select
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
                setSubDepartment("All");
              }}
            >
              <option value="All Departments">All Departments</option>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="report-filter">
            <label>Sub-department</label>
            <select
              value={subDepartment}
              onChange={(event) => setSubDepartment(event.target.value)}
            >
              <option value="All">All Sub-departments</option>
              {subDepartments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="report-filter employee-filter">
            <label>Employee</label>
            <Input
              placeholder="Search employee..."
              value={employeeSearch}
              onChange={(event) => {
                setEmployeeSearch(event.target.value);
                setShowEmployees(true);
              }}
              onFocus={() => setShowEmployees(true)}
            />

            {showEmployees && (
              <div className="employee-dropdown">
                <button
                  type="button"
                  onClick={() => selectEmployee("All Employees")}
                >
                  All Employees
                </button>

                {filteredEmployees.map((employee) => (
                  <button
                    type="button"
                    key={employee.name}
                    onClick={() => selectEmployee(employee.name)}
                  >
                    {employee.name}
                  </button>
                ))}

                {filteredEmployees.length === 0 && (
                  <p>No employees found.</p>
                )}
              </div>
            )}
          </div>

          <div className="report-filter">
            <label>Date Range</label>
            <select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
            >
              <option value="All Dates">All Dates</option>
              <option value="January 2026">January 2026</option>
              <option value="January-June 2026">January–June 2026</option>
            </select>
          </div>

          <div className="report-filter-buttons">
            <Button type="green" onClick={generateReport}>
              Generate
            </Button>
            <Button type="green" onClick={generateReport}>
              View Report
            </Button>
          </div>
        </div>

        <Reports
          title={currentReport.title}
          data={currentReport.data}
          type={currentReport.type}
        />
      </main>
    </div>
  );
}

export default CoordinatorReports;
