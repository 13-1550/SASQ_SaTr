import { useMemo, useState } from "react";
import { Bell, CircleUserRound, Search, Eye, Pencil } from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Table from "../../Components/Common/Table/Table";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";
import Input from "../../Components/Common/Input/Input";
import Button from "../../Components/Common/Button/Button";
import Modal from "../../Components/Common/Modal/Modal";

const employeesData = [
    { id: 1, name: "Ahmed Ali", position: "IT Support", payroll: "30002145", subDept: "Service Desk", department: "IT Support", status: "Active" },
    { id: 2, name: "Sara Omar", position: "Network Eng", payroll: "30002168", subDept: "Network", department: "IT Infrastructure", status: "Warning" },
    { id: 3, name: "Faisal Saleh", position: "Security Spec", payroll: "30002210", subDept: "Cybersecurity", department: "Security", status: "Active" },
    { id: 4, name: "Reem Hassan", position: "DBA", payroll: "30002234", subDept: "Database", department: "Database", status: "Inactive" },
    { id: 5, name: "Omar Khalid", position: "Cloud Eng", payroll: "30002278", subDept: "Cloud Services", department: "Cloud", status: "Warning" },
    { id: 6, name: "Lama Fahad", position: "Mobile Deve", payroll: "30002301", subDept: "Software Dev", department: "Applications", status: "Active" },
    { id: 7, name: "Noura Saad", position: "QA Engineer", payroll: "30002345", subDept: "QA & Testing", department: "QA", status: "Inactive" },
    { id: 8, name: "Abdullah Ali", position: "IT Analyst", payroll: "30002388", subDept: "IT Operations", department: "Operations", status: "Warning" },
    { id: 9, name: "Dena Yousif", position: "UX Spec", payroll: "30002370", subDept: "UX Design", department: "Digital Solutions", status: "Active" },
];

const headers = ["#", "Name", "Position", "Payroll", "Sub Dept", "Department", "Status"];
const fields = ["number", "name", "position", "payroll", "subDept", "department", "status"];

function AdminEmployees() {
    const [employees, setEmployees] = useState(employeesData);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [viewId, setViewId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const rows = useMemo(() => {
        const text = search.toLowerCase();
        let result = employees.filter((e) =>
            [e.name, e.position, e.payroll, e.subDept, e.department, e.status].join(" ").toLowerCase().includes(text)
        );
        if (sortBy) {
            result = [...result].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])));
        }
        return result.map((e, index) => ({ ...e, number: index + 1 }));
    }, [employees, search, sortBy]);

    const viewed = employees.find((e) => e.id === viewId);

    function openEdit(row) {
        setEditId(row.id);
        setEditForm({ ...row });
    }

    function saveEdit() {
        setEmployees(employees.map((e) => (e.id === editId ? { ...e, ...editForm } : e)));
        setEditId(null);
    }

    function renderCell(row, field) {
        if (field === "status") return <StatusBadge status={row.status} />;
        return row[field];
    }

    function renderActions(row) {
        return (
            <div className="um-actions">
                <button className="um-icon-btn um-icon-view" aria-label={`View ${row.name}`} onClick={() => setViewId(row.id)}>
                    <Eye size={16} />
                </button>
                <button className="um-icon-btn um-icon-edit" aria-label={`Edit ${row.name}`} onClick={() => openEdit(row)}>
                    <Pencil size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="admin-employees-page">
            <Sidebar role="admin" />

            <main className="admin-employees-content">
                <header className="page-header">
                    <h1 className="page-header-title">Employees Records</h1>
                    <div className="page-header-user">
                        <button type="button" className="notification-btn" aria-label="Notifications">
                            <Bell size={24} />
                            <span className="notification-badge">1</span>
                        </button>
                        <CircleUserRound className="user-avatar" strokeWidth={1.3} />
                        <div className="user-info">
                            <span className="user-name">Khalid Mohammed</span>
                            <span className="user-role">Admin</span>
                        </div>
                    </div>
                </header>

                <div className="um-toolbar">
                    <div className="um-search">
                        <Search size={16} className="um-search-icon" />
                        <Input
                            placeholder="Search by any field..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="um-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="name">Name</option>
                        <option value="position">Position</option>
                        <option value="payroll">Payroll</option>
                        <option value="subDept">Sub Dept</option>
                        <option value="department">Department</option>
                        <option value="status">Status</option>
                    </select>
                </div>

                <Table
                    className="admin-employees-table"
                    headers={headers}
                    fields={fields}
                    data={rows}
                    renderCell={renderCell}
                    actions={renderActions}
                />

                {/* View */}
                <Modal isOpen={viewId !== null} onClose={() => setViewId(null)} title="Employee Details">
                    {viewed && (
                        <div className="courses-form">
                            {[
                                ["Name", viewed.name],
                                ["Position", viewed.position],
                                ["Payroll", viewed.payroll],
                                ["Sub Department", viewed.subDept],
                                ["Department", viewed.department],
                                ["Status", viewed.status],
                            ].map(([label, value]) => (
                                <div key={label} className="courses-form-field">
                                    <label>{label}</label>
                                    <input className="input" value={value} readOnly />
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>

                {/* Edit */}
                <Modal isOpen={editId !== null} onClose={() => setEditId(null)} title="Edit Employee">
                    {editForm && (
                        <div className="courses-form">
                            {[
                                ["Name", "name"],
                                ["Position", "position"],
                                ["Sub Department", "subDept"],
                                ["Department", "department"],
                            ].map(([label, key]) => (
                                <div key={key} className="courses-form-field">
                                    <label>{label}</label>
                                    <input
                                        className="input"
                                        value={editForm[key]}
                                        onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                                    />
                                </div>
                            ))}
                            <div className="courses-form-field">
                                <label>Status</label>
                                <select
                                    className="input"
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                >
                                    <option>Active</option>
                                    <option>Warning</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div className="courses-form-actions">
                                <Button type="white" onClick={() => setEditId(null)}>Cancel</Button>
                                <Button type="green" onClick={saveEdit}>Save Changes</Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </main>
        </div>
    );
}

export default AdminEmployees;