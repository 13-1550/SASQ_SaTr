import { useMemo, useState } from "react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Input from "../../Components/Common/Input/Input";
import Table from "../../Components/Common/Table/Table";
import { Eye, Bell } from "lucide-react";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";


function ManagerEmployees() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    const headers = [
        "#",
        "Name",
        "CORPID",
        "Position",
        "Department",
        "Status",
    ];

    const fields = [
        "number",
        "Name",
        "CORPID",
        "Position",
        "Department",
        "Status",
    ];

    const employeesData = [
        {
            id: 1,
            number: 1,
            Name: "Ahmed Ali",
            CORPID: "30002145",
            Position: "IT Support",
            Department: "IT Support",
            Status: "Active",
        },
        {
            id: 2,
            number: 2,
            Name: "Sara Omar",
            CORPID: "30002168",
            Position: "Network Eng",
            Department: "IT Infrastructure",
            Status: "Warning",
        },
        {
            id: 3,
            number: 3,
            Name: "Faisal Saleh",
            CORPID: "30002210",
            Position: "Security Spec",
            Department: "Security",
            Status: "Active",
        },
        {
            id: 4,
            number: 4,
            Name: "Reem Hassan",
            CORPID: "30002234",
            Position: "DBA",
            Department: "Database",
            Status: "Inactive",
        },
        {
            id: 5,
            number: 5,
            Name: "Omar Khalid",
            CORPID: "30002278",
            Position: "Cloud Eng",
            Department: "Cloud",
            Status: "Warning",
        },
        {
            id: 6,
            number: 6,
            Name: "Lama Fahad",
            CORPID: "30002301",
            Position: "Mobile Deve",
            Department: "Applications",
            Status: "Active",
        },
        {
            id: 7,
            number: 7,
            Name: "Noura Saad",
            CORPID: "30002345",
            Position: "QA Engineer",
            Department: "QA",
            Status: "Inactive",
        },
        {
            id: 8,
            number: 8,
            Name: "Abdullah Ali",
            CORPID: "30002388",
            Position: "IT Analyst",
            Department: "Operations",
            Status: "Warning",
        },
        {
            id: 9,
            number: 9,
            Name: "Dena Yousif",
            CORPID: "30002370",
            Position: "UX Spec",
            Department: "Digital Solutions",
            Status: "Active",
        },
    ];

    const filteredEmployees = useMemo(() => {
        let result = employeesData.filter((employee) =>
            Object.values(employee).some((value) =>
                String(value)
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        );

        if (sortBy) {
            result = [...result].sort((a, b) => {
                if (sortBy === "CORPID") {
                    return a.CORPID.localeCompare(b.CORPID);
                }

                return String(a[sortBy]).localeCompare(
                    String(b[sortBy])
                );
            });
        }

        return result.map((employee, index) => ({
            ...employee,
            number: index + 1,
        }));
    }, [search, sortBy]);

    return (
        <div className="ManagerEmployees">
            <Sidebar role="manager" />

            <main className="MEmployees-content">
                <header className="Employees-header">
                    <h1>Employees Records</h1>

                </header>

                <div className="EmployeesFilters">
                    <Input
                        placeholder="Search by any field..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="employees-sort"
                    >
                        <option value="">Sort by</option>
                        <option value="Name">Name</option>
                        <option value="CORPID">CORPID</option>
                        <option value="Position">Position</option>
                        <option value="Department">Department</option>
                        <option value="Status">Status</option>
                    </select>
                </div>

                <Table
    headers={headers}
    fields={fields}
    data={filteredEmployees}
    renderCell={(row, field) => {
        if (field === "Status") {
            return <StatusBadge status={row.Status} />;
        }

        return row[field];
    }}
    actions={(row) => (
        <button
            type="button"
            className="employee-view-button"
            aria-label={`View ${row.Name}`}
            onClick={() => console.log("Selected employee:", row)}
        >
            <Eye size={16} />
        </button>
    )}
/>
            </main>
        </div>
    );
}

export default ManagerEmployees;
