
import { useMemo, useState } from "react";
import {
  Bell,
  ChartNoAxesColumn,
  CalendarDays,
  Users,
  ShieldCheck,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  BookOpen,
  UserRound,
  Settings,
  ChartNoAxesCombined,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import AdminHeader from "./AdminHeader";

const auditRecords = [
  {
    id: 1,
    user: "Noura Alansari",
    role: "Admin",
    action: "Status Updated",
    description: "Changed status for Mohammed Albaz from Enabled to Disabled",
    date: "2026-08-07",
    time: "10:30 PM",
    status: "Success",
  },
  {
    id: 2,
    user: "Dena Yousif",
    role: "UX Expert",
    action: "Upload Certificate",
    description: "Supported file format",
    date: "2026-08-07",
    time: "09:15 PM",
    status: "Success",
  },
  {
    id: 3,
    user: "Lena Alharthi",
    role: "Training Coordinator",
    action: "Add Course",
    description: "Added a required course to Database Department",
    date: "2026-08-07",
    time: "08:45 PM",
    status: "Pending",
  },
  {
    id: 4,
    user: "Sara Alharbi",
    role: "Network Engineering",
    action: "Role Updated",
    description: "Changed Lama Hariri's role from Employee to Manager",
    date: "2026-08-07",
    time: "08:20 PM",
    status: "Failed",
  },
  {
    id: 5,
    user: "Omar Al-khaldi",
    role: "Admin",
    action: "User Created",
    description: "Added a new Manager to the system",
    date: "2026-08-07",
    time: "07:50 PM",
    status: "Success",
  },
  {
    id: 6,
    user: "Fahad Alotaibi",
    role: "Training Coordinator",
    action: "Enroll Course",
    description: "Enrolled in Safety Management course",
    date: "2026-08-07",
    time: "07:10 PM",
    status: "Success",
  },
  {
    id: 7,
    user: "Omar Al-khaldi",
    role: "Admin",
    action: "User Login",
    description: "Signed in to the administration dashboard",
    date: "2026-08-07",
    time: "06:35 PM",
    status: "Success",
  },
  {
    id: 8,
    user: "Reem Almagnoni",
    role: "Mobile Development",
    action: "Upload Certificate",
    description: "Unsupported file format",
    date: "2026-08-07",
    time: "06:10 PM",
    status: "Failed",
  },
  {
    id: 9,
    user: "Hanan Mohammed",
    role: "Admin",
    action: "Course Updated",
    description: "Updated the course completion requirements",
    date: "2026-08-06",
    time: "04:25 PM",
    status: "Success",
  },
  {
    id: 10,
    user: "Faisal Nasser",
    role: "Employee",
    action: "Certificate Viewed",
    description: "Viewed the Cybersecurity Awareness certificate",
    date: "2026-08-06",
    time: "03:40 PM",
    status: "Success",
  },
  {
    id: 11,
    user: "Maha Ibrahim",
    role: "Training Coordinator",
    action: "Course Assigned",
    description: "Assigned Workplace Safety to the Operations department",
    date: "2026-08-06",
    time: "02:15 PM",
    status: "Pending",
  },
  {
    id: 12,
    user: "Khalid Mansour",
    role: "Admin",
    action: "User Disabled",
    description: "Disabled a duplicate user account",
    date: "2026-08-05",
    time: "11:20 AM",
    status: "Success",
  },
  {
    id: 13,
    user: "Rana Khalid",
    role: "Employee",
    action: "Login Attempt",
    description: "Incorrect password entered",
    date: "2026-08-05",
    time: "09:10 AM",
    status: "Failed",
  },
  {
    id: 14,
    user: "Tariq Ahmed",
    role: "Manager",
    action: "Report Exported",
    description: "Exported the monthly training report",
    date: "2026-08-04",
    time: "01:30 PM",
    status: "Success",
  },
  {
    id: 15,
    user: "Lina Ahmed",
    role: "Training Coordinator",
    action: "Certificate Reviewed",
    description: "Certificate is waiting for approval",
    date: "2026-08-04",
    time: "10:05 AM",
    status: "Pending",
  },
];

function AuditLog() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedAction, setSelectedAction] = useState("All Actions");
  const [selectedDate, setSelectedDate] = useState("2026-08-07");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  const users = [...new Set(auditRecords.map((record) => record.user))];
  const actions = [...new Set(auditRecords.map((record) => record.action))];

  const filteredRecords = useMemo(() => {
    return auditRecords.filter((record) => {
      const searchText =
        `${record.user} ${record.role} ${record.action} ${record.description}`.toLowerCase();

      return (
        searchText.includes(search.toLowerCase()) &&
        (selectedUser === "All Users" || record.user === selectedUser) &&
        (selectedAction === "All Actions" ||
          record.action === selectedAction) &&
        (selectedDate === "All Dates" || record.date === selectedDate) &&
        (selectedStatus === "All Status" ||
          record.status === selectedStatus)
      );
    });
  }, [search, selectedUser, selectedAction, selectedDate, selectedStatus]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / rowsPerPage)
  );

  const visibleRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  function updateFilter(setter, value) {
    setter(value);
    setCurrentPage(1);
  }

  function exportCSV() {
    const headers = [
      "User",
      "Role",
      "Action",
      "Description",
      "Date",
      "Time",
      "Status",
    ];

    const csvRows = filteredRecords.map((record) =>
      [
        record.user,
        record.role,
        record.action,
        record.description,
        record.date,
        record.time,
        record.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-audit-log.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const summaryCards = [
    {
      title: "Total Activities",
      value: "1,248",
      note: "↑ 12% from last week",
      icon: ChartNoAxesColumn,
      color: "green",
    },
    {
      title: "Today",
      value: "86",
      note: "↑ 8% from yesterday",
      icon: CalendarDays,
      color: "blue",
    },
    {
      title: "Unique Users",
      value: "54",
      note: "↑ 5% from last week",
      icon: Users,
      color: "purple",
    },
    {
      title: "Admin Actions",
      value: "24",
      note: "↑ 3% from yesterday",
      icon: ShieldCheck,
      color: "yellow",
    },
  ];

  return (
    <div className="audit-page">
      <Sidebar role="admin" />

      <main className="audit-content">
        <AdminHeader />

        <section className="audit-summary">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="audit-summary-card" key={card.title}>
                <div className={`audit-summary-icon ${card.color}`}>
                  <Icon size={19} />
                </div>

                <div className="audit-summary-text">
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                  <small>{card.note}</small>
                </div>
              </article>
            );
          })}
        </section>

        <section className="audit-filters">
          <div className="audit-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) => updateFilter(setSearch, e.target.value)}
            />
          </div>

          <select
            value={selectedUser}
            onChange={(e) => updateFilter(setSelectedUser, e.target.value)}
            aria-label="Filter by user"
          >
            <option>All Users</option>
            {users.map((user) => (
              <option key={user}>{user}</option>
            ))}
          </select>

          <select
            value={selectedAction}
            onChange={(e) => updateFilter(setSelectedAction, e.target.value)}
            aria-label="Filter by action"
          >
            <option>All Actions</option>
            {actions.map((action) => (
              <option key={action}>{action}</option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => updateFilter(setSelectedDate, e.target.value)}
            aria-label="Filter by date"
          >
            <option value="All Dates">All Dates</option>
            <option value="2026-08-07">Aug 7, 2026</option>
            <option value="2026-08-06">Aug 6, 2026</option>
            <option value="2026-08-05">Aug 5, 2026</option>
            <option value="2026-08-04">Aug 4, 2026</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => updateFilter(setSelectedStatus, e.target.value)}
            aria-label="Filter by status"
          >
            <option>All Status</option>
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>

          <button
            type="button"
            className="audit-export-button"
            onClick={exportCSV}
          >
            <Download size={15} />
            Export
          </button>
        </section>

        <section className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Description</th>
                <th>Date &amp; Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visibleRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="audit-user-name">{record.user}</div>
                    <span className="audit-user-role">{record.role}</span>
                  </td>
                  <td>{record.action}</td>
                  <td>{record.description}</td>
                  <td className="audit-date">
                    {new Date(record.date + "T00:00:00").toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                    , {record.time}
                  </td>
                  <td>
                    <span
                      className={`audit-status ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}

              {visibleRecords.length === 0 && (
                <tr>
                  <td colSpan="5" className="audit-empty">
                    No activities match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <footer className="audit-pagination">
          <span>
            {filteredRecords.length === 0
              ? "0 activities"
              : `${(currentPage - 1) * rowsPerPage + 1}–${Math.min(
                  currentPage * rowsPerPage,
                  filteredRecords.length
                )} of ${filteredRecords.length}`}
          </span>

          <div className="audit-pagination-controls">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <ChevronLeft size={17} />
            </button>

            <span className="audit-page-number">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default AuditLog;
