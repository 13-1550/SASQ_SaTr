import { useState } from "react";
import { Bell, CircleUserRound, Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Table from "../../Components/Common/Table/Table";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import Modal from "../../Components/Common/Modal/Modal";

const initialUsers = [
    { id: 1, firstName: "Ahmed", middleName: "Ali", lastName: "Alharbi", email: "Ahmed@Saudia.com", phone: "+966 501234561", corpId: "30002145", payroll: "30002145", role: "Admin", station: "JED", status: "Enabled", position: "IT Support", department: "IT Support", subDepartment: "Service Desk", seniorityDate: "03-Mar-2018" },
    { id: 2, firstName: "Sara", middleName: "Omar", lastName: "ALhazmi", email: "Sara@Saudia.com", phone: "+966 541234560", corpId: "30002168", payroll: "30002168", role: "Viewer", station: "MED", status: "Disabled", position: "Network Engineering", department: "IT Infrastructure", subDepartment: "Network", seniorityDate: "12-Sep-2016" },
    { id: 3, firstName: "Faisal", middleName: "Saleh", lastName: "Alotaibi", email: "Faisal@Saudia.com", phone: "+966 501234563", corpId: "30002210", payroll: "30002210", role: "Viewer", station: "RUH", status: "Enabled", position: "Security Specialist", department: "Security", subDepartment: "Cybersecurity", seniorityDate: "21-Jan-2019" },
    { id: 4, firstName: "Reem", middleName: "Hassan", lastName: "Alzahrani", email: "Reem@Saudia.com", phone: "+966 501234564", corpId: "30002234", payroll: "30002234", role: "Supervisor", station: "KHO", status: "Disabled", position: "DBA", department: "Database", subDepartment: "Database", seniorityDate: "15-Jun-2017" },
    { id: 5, firstName: "Omar", middleName: "Khalid", lastName: "Alghamdi", email: "Omar@Saudia.com", phone: "+966 501234565", corpId: "30002278", payroll: "30002278", role: "Viewer", station: "TAI", status: "Disabled", position: "Cloud Engineer", department: "Cloud", subDepartment: "Cloud Services", seniorityDate: "09-Nov-2020" },
    { id: 6, firstName: "Lama", middleName: "Fahad", lastName: "Alshehri", email: "Lama@Saudia.com", phone: "+966 501234566", corpId: "30002301", payroll: "30002301", role: "Supervisor", station: "JIZ", status: "Enabled", position: "Mobile Developer", department: "Applications", subDepartment: "Software Dev", seniorityDate: "02-Feb-2021" },
    { id: 7, firstName: "Noura", middleName: "Saad", lastName: "Almutairi", email: "Noura@Saudia.com", phone: "+966 501234567", corpId: "30002345", payroll: "30002345", role: "Supervisor", station: "HOF", status: "Enabled", position: "QA Engineer", department: "QA", subDepartment: "QA & Testing", seniorityDate: "27-Aug-2015" },
    { id: 8, firstName: "Abdullah", middleName: "Ali", lastName: "Aldosari", email: "Abdullah@Saudia.com", phone: "+966 501234568", corpId: "30002388", payroll: "30002388", role: "Viewer", station: "JED", status: "Enabled", position: "IT Analyst", department: "Operations", subDepartment: "IT Operations", seniorityDate: "18-Apr-2019" },
    { id: 9, firstName: "Dena", middleName: "Yousif", lastName: "Alsubaie", email: "Dena@Saudia.com", phone: "+966 501234569", corpId: "30002370", payroll: "30002370", role: "Viewer", station: "JED", status: "Enabled", position: "UX Specialist", department: "Digital Solutions", subDepartment: "UX Design", seniorityDate: "05-Oct-2022" },
];

const emptyUser = {
    firstName: "", middleName: "", lastName: "", email: "", phone: "",
    corpId: "", payroll: "", role: "", station: "", status: "Enabled",
    position: "", department: "", subDepartment: "", seniorityDate: "",
};

const headers = ["#", "Name", "Role", "Payroll", "Corp ID", "Station", "Status"];
const fields = ["number", "name", "role", "payroll", "corpId", "station", "status"];

const personalFields = [
    { label: "First Name", name: "firstName" },
    { label: "Middle Name", name: "middleName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email Address", name: "email" },
    { label: "Phone Number", name: "phone" },
];

const jobFieldsTop = [
    { label: "Corp ID", name: "corpId" },
    { label: "Payroll Number", name: "payroll" },
];

const jobFieldsBottom = [
    { label: "Role", name: "role" },
    { label: "Station", name: "station" },
];

const detailsPersonalFields = [
    { label: "First Name", name: "firstName" },
    { label: "Middle Name", name: "middleName" },
    { label: "Last Name", name: "lastName" },
];

const detailsJobFields = [
    { label: "Email Address", name: "email" },
    { label: "Payroll Number", name: "payroll" },
    { label: "Position", name: "position" },
    { label: "Department", name: "department" },
    { label: "Sub - Department", name: "subDepartment" },
    { label: "Seniority Date", name: "seniorityDate" },
];

// Shows the same input fields in both Add and Edit windows.
function UserFormFields({ form, onChange }) {
    return (
        <>
            <h4 className="um-form-section">Personal Information</h4>
            <div className="um-form-grid">
                {personalFields.map(function (field) {
                    return (
                        <Input
                            key={field.name}
                            label={field.label}
                            value={form[field.name]}
                            onChange={(event) => onChange(field.name, event.target.value)}
                        />
                    );
                })}
            </div>

            <h4 className="um-form-section">Job Information</h4>
            <div className="um-form-grid">
                {jobFieldsTop.map(function (field) {
                    return (
                        <Input
                            key={field.name}
                            label={field.label}
                            value={form[field.name]}
                            onChange={(event) => onChange(field.name, event.target.value)}
                        />
                    );
                })}

                <div className="um-status-group">
                    <label className={form.status === "Enabled" ? "um-radio um-radio-on" : "um-radio"}>
                        <input
                            type="radio"
                            name="user-status"
                            checked={form.status === "Enabled"}
                            onChange={() => onChange("status", "Enabled")}
                        />
                        Enabled
                    </label>
                    <label className={form.status === "Disabled" ? "um-radio um-radio-on" : "um-radio"}>
                        <input
                            type="radio"
                            name="user-status"
                            checked={form.status === "Disabled"}
                            onChange={() => onChange("status", "Disabled")}
                        />
                        Disabled
                    </label>
                </div>

                {jobFieldsBottom.map(function (field) {
                    return (
                        <Input
                            key={field.name}
                            label={field.label}
                            value={form[field.name]}
                            onChange={(event) => onChange(field.name, event.target.value)}
                        />
                    );
                })}
            </div>
        </>
    );
}

// Separate window for adding a new user.
function AddUserModal({ isOpen, form, onChange, onAdd, onClose }) {
    return (
        <div className="um-modal-area">
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={
                    <span className="um-modal-title">
                        <Plus size={26} />
                        <span>
                            <span className="um-modal-title-main">Add User</span>
                            <span className="um-modal-title-sub">Enter the new user information</span>
                        </span>
                    </span>
                }
            >
                <UserFormFields form={form} onChange={onChange} />
                <div className="um-modal-footer">
                    <Button type="white" onClick={onClose}>Cancel</Button>
                    <Button type="green" onClick={onAdd}>Add User</Button>
                </div>
            </Modal>
        </div>
    );
}

// Separate window for editing an existing user.
function EditUserModal({ isOpen, form, onChange, onSave, onClose }) {
    const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ");

    return (
        <div className="um-modal-area">
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={
                    <span className="um-modal-title">
                        <Pencil size={26} />
                        <span>
                            <span className="um-modal-title-main">Edit User</span>
                            <span className="um-modal-title-sub">Update {fullName}</span>
                        </span>
                    </span>
                }
            >
                <UserFormFields form={form} onChange={onChange} />
                <div className="um-modal-footer">
                    <Button type="white" onClick={onClose}>Cancel</Button>
                    <Button type="green" onClick={onSave}>Save Changes</Button>
                </div>
            </Modal>
        </div>
    );
}

function UserDetailsModal({ isOpen, user, onClose }) {
    const shownUser = user || {};

    return (
        <div className="um-modal-area">
            <Modal isOpen={isOpen} onClose={onClose} title="Employee Details">
                <h4 className="um-form-section">Personal Information</h4>
                <div className="um-details-grid">
                    {detailsPersonalFields.map(function (field) {
                        return (
                            <div key={field.name} className="um-detail">
                                <span className="um-detail-label">{field.label}</span>
                                <span className="um-detail-value">{shownUser[field.name] || "-"}</span>
                            </div>
                        );
                    })}
                </div>

                <h4 className="um-form-section">Job Information</h4>
                <div className="um-details-grid">
                    {detailsJobFields.map(function (field) {
                        return (
                            <div key={field.name} className="um-detail">
                                <span className="um-detail-label">{field.label}</span>
                                <span className="um-detail-value">{shownUser[field.name] || "-"}</span>
                            </div>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
}

function DeleteUserModal({ isOpen, user, onConfirm, onClose }) {
    const userName = user ? user.firstName + " " + user.middleName : "";

    return (
        <div className="um-delete-area">
            <Modal isOpen={isOpen} onClose={onClose} title="">
                <div className="um-delete-content">
                    <span className="um-delete-icon"><Trash2 size={22} /></span>
                    <h3 className="um-delete-title">Remove employee record?</h3>
                    <p className="um-delete-text">
                        You&apos;re about to permanently remove <strong>{userName}&apos;s</strong> training
                        record, including all associated course and certificate history.
                        This action cannot be undone.
                    </p>
                    <div className="um-delete-buttons">
                        <Button type="white" onClick={onClose}>Cancel</Button>
                        <Button type="red" onClick={onConfirm}>Yes, Remove</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [addForm, setAddForm] = useState({ ...emptyUser });
    const [editForm, setEditForm] = useState({ ...emptyUser, id: 0 });

    const [viewId, setViewId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    function openAdd() {
        setAddForm({ ...emptyUser });
        setIsAddOpen(true);
    }

    function openEdit(row) {
        const selectedUser = users.find(function (user) {
            return user.id === row.id;
        });
        if (selectedUser) {
            setEditForm({ ...selectedUser });
            setIsEditOpen(true);
        }
    }

    function changeAddForm(fieldName, newValue) {
        setAddForm({ ...addForm, [fieldName]: newValue });
    }

    function changeEditForm(fieldName, newValue) {
        setEditForm({ ...editForm, [fieldName]: newValue });
    }

    function addUser() {
        let biggestId = 0;
        users.forEach(function (user) {
            if (user.id > biggestId) {
                biggestId = user.id;
            }
        });

        const newUser = { ...addForm, id: biggestId + 1 };
        setUsers([...users, newUser]);
        setIsAddOpen(false);
    }

    function saveChanges() {
        const updatedUsers = users.map(function (user) {
            if (user.id === editForm.id) {
                return editForm;
            }
            return user;
        });

        setUsers(updatedUsers);
        setIsEditOpen(false);
    }

    function openView(row) {
        setViewId(row.id);
    }

    function openDelete(row) {
        setDeleteId(row.id);
    }

    function confirmDelete() {
        const remainingUsers = users.filter(function (user) {
            return user.id !== deleteId;
        });
        setUsers(remainingUsers);
        setDeleteId(null);
    }

    const searchText = search.toLowerCase();
    const visibleUsers = users.filter(function (user) {
        const allText =
            user.firstName + " " + user.middleName + " " + user.lastName + " " +
            user.role + " " + user.payroll + " " + user.corpId + " " +
            user.station + " " + user.status;
        return allText.toLowerCase().includes(searchText);
    });

    if (sortBy !== "") {
        visibleUsers.sort(function (a, b) {
            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        });
    }

    const tableRows = visibleUsers.map(function (user, index) {
        return {
            ...user,
            number: index + 1,
            name: user.firstName + " " + user.middleName,
        };
    });

    const viewedUser = users.find(function (user) {
        return user.id === viewId;
    });

    const userToDelete = users.find(function (user) {
        return user.id === deleteId;
    });

    function renderCell(row, field) {
        if (field === "status") {
            return <StatusBadge status={row.status} />;
        }
        return row[field];
    }

    function renderActions(row) {
        return (
            <div className="um-actions">
                <button className="um-icon-btn um-icon-view" aria-label="View user details" onClick={() => openView(row)}>
                    <Eye size={16} />
                </button>
                <button className="um-icon-btn um-icon-edit" aria-label="Edit user" onClick={() => openEdit(row)}>
                    <Pencil size={16} />
                </button>
                <button className="um-icon-btn um-icon-delete" aria-label="Delete user" onClick={() => openDelete(row)}>
                    <Trash2 size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="um-page">
            <Sidebar role="admin" />

            <div className="um-content">
                <header className="page-header">
                    <h1 className="page-header-title">User Management</h1>
                    <div className="page-header-user">
                        <div className="page-header-notifications">
                            <button className="notification-btn" aria-label="Notifications">
                                <Bell size={24} />
                                <span className="notification-badge">1</span>
                            </button>
                        </div>
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
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    <select className="um-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                        <option value="">Sort by</option>
                        <option value="firstName">Name</option>
                        <option value="role">Role</option>
                        <option value="payroll">Payroll</option>
                        <option value="station">Station</option>
                        <option value="status">Status</option>
                    </select>

                    <Button type="green" onClick={openAdd}>
                        <Plus size={14} /> Add User
                    </Button>
                </div>

                <Table
                    className="um-table"
                    headers={headers}
                    fields={fields}
                    data={tableRows}
                    renderCell={renderCell}
                    actions={renderActions}
                />

                <AddUserModal
                    isOpen={isAddOpen}
                    form={addForm}
                    onChange={changeAddForm}
                    onAdd={addUser}
                    onClose={() => setIsAddOpen(false)}
                />

                <EditUserModal
                    isOpen={isEditOpen}
                    form={editForm}
                    onChange={changeEditForm}
                    onSave={saveChanges}
                    onClose={() => setIsEditOpen(false)}
                />

                <UserDetailsModal
                    isOpen={viewId !== null}
                    user={viewedUser}
                    onClose={() => setViewId(null)}
                />

                <DeleteUserModal
                    isOpen={deleteId !== null}
                    user={userToDelete}
                    onConfirm={confirmDelete}
                    onClose={() => setDeleteId(null)}
                />
            </div>
        </div>
    );
}

export default UserManagement;
