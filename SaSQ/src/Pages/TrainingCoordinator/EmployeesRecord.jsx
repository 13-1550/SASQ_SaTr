import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Bell,
    Eye,
    Pencil,
    Search,
    Plus,
    ArrowLeft,
    Check,
    X,
    FileText,
    MessageSquare,
    CircleUserRound,
    CircleAlert,
    CircleX,
    CircleCheck,
} from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Table from "../../Components/Common/Table/Table";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import Modal from "../../Components/Common/Modal/Modal";
import TrainingCoordinatorHeader from "./TrainingCoordHeader";


const employeesData = [
    {
        id: 1,
        firstName: "Ahmed",
        middleName: "Ali",
        lastName: "Alharbi",
        email: "Ahmed@Saudia.com",
        payroll: "30002145",
        position: "IT Support",
        department: "IT Support",
        subDepartment: "Service Desk",
        seniorityDate: "03-Mar-2018",
        status: "Active",
        completion: 90,
    },
    {
        id: 2,
        firstName: "Sara",
        middleName: "Omar",
        lastName: "ALhazmi",
        email: "Sara@Saudia.com",
        payroll: "30002168",
        position: "Network Engineering",
        department: "IT Infrastructure",
        subDepartment: "Network",
        seniorityDate: "12-Sep-2016",
        status: "Warning",
        completion: 70,
    },
    {
        id: 3,
        firstName: "Faisal",
        middleName: "Saleh",
        lastName: "Alotaibi",
        email: "Faisal@Saudia.com",
        payroll: "30002210",
        position: "Security Specialist",
        department: "Security",
        subDepartment: "Cybersecurity",
        seniorityDate: "21-Jan-2019",
        status: "Active",
        completion: 85,
    },
    {
        id: 4,
        firstName: "Reem",
        middleName: "Hassan",
        lastName: "Alzahrani",
        email: "Reem@Saudia.com",
        payroll: "30002234",
        position: "DBA",
        department: "Database",
        subDepartment: "Database",
        seniorityDate: "15-Jun-2017",
        status: "Inactive",
        completion: 40,
    },
    {
        id: 5,
        firstName: "Omar",
        middleName: "Khalid",
        lastName: "Alghamdi",
        email: "Omar@Saudia.com",
        payroll: "30002278",
        position: "Cloud Engineer",
        department: "Cloud",
        subDepartment: "Cloud Services",
        seniorityDate: "09-Nov-2020",
        status: "Warning",
        completion: 60,
    },
    {
        id: 6,
        firstName: "Lama",
        middleName: "Fahad",
        lastName: "Alshehri",
        email: "Lama@Saudia.com",
        payroll: "30002301",
        position: "Mobile Developer",
        department: "Applications",
        subDepartment: "Software Dev",
        seniorityDate: "02-Feb-2021",
        status: "Active",
        completion: 95,
    },
    {
        id: 7,
        firstName: "Noura",
        middleName: "Saad",
        lastName: "Almutairi",
        email: "Noura@Saudia.com",
        payroll: "30002345",
        position: "QA Engineer",
        department: "QA",
        subDepartment: "QA & Testing",
        seniorityDate: "27-Aug-2015",
        status: "Inactive",
        completion: 30,
    },
    {
        id: 8,
        firstName: "Abdullah",
        middleName: "Ali",
        lastName: "Aldosari",
        email: "Abdullah@Saudia.com",
        payroll: "30002388",
        position: "IT Analyst",
        department: "Operations",
        subDepartment: "IT Operations",
        seniorityDate: "18-Apr-2019",
        status: "Warning",
        completion: 55,
    },
    {
        id: 9,
        firstName: "Dena",
        middleName: "Yousif",
        lastName: "Alsubaie",
        email: "Dena@Saudia.com",
        payroll: "30002370",
        position: "UX Specialist",
        department: "Digital Solutions",
        subDepartment: "UX Design",
        seniorityDate: "05-Oct-2022",
        status: "Active",
        completion: 75,
    },
];

// Empty employee used when the Add window opens
const emptyEmployee = {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    payroll: "",
    position: "",
    department: "",
    subDepartment: "",
    seniorityDate: "",
    status: "Active",
    completion: 0,
};

const requiredCourses = [
    {
        id: 1,
        course: "Network Security Fundamentals",
        completed: true,
        result: "Pass",
        expiry: "01-Jan-2027",
        status: "Active",
        certificate: true,
        feedback: true,
    },
    {
        id: 2,
        course: "Cisco Certified Network Professional",
        completed: true,
        result: "Pass",
        expiry: "10-Jan-2027",
        status: "Expired",
        certificate: true,
        feedback: true,
    },
];

const optionalCourses = [
    {
        id: 3,
        course: "Data Center Networking",
        completed: true,
        result: "Pass",
        expiry: "01-Jan-2027",
        status: "Active",
        certificate: true,
        feedback: true,
    },
    {
        id: 4,
        course: "Fire Safety Awareness",
        completed: false,
        result: "Fail",
        expiry: "29-May-2027",
        status: "Expired",
        certificate: true,
        feedback: false,
    },
];

// Notification (type = warning or danger or success)
const notificationsData = [
    {
        id: 1,
        type: "warning",
        title: "Certificate expiring in 30 days",
        message: "Cloud Security Certificate",
        time: "Today · 9:05 AM",
        read: false,
    },
    {
        id: 2,
        type: "danger",
        title: "Course added to the Network Engineering department",
        message: "Cisco Certified Network Associate",
        time: "Today · 9:05 AM",
        read: false,
    },
    {
        id: 3,
        type: "success",
        title: "Employee data updated successfully",
        message: "Sara Alhazmi's department has been updated from IT Operations to Network Engineering",
        time: "Today · 9:05 AM",
        read: false,
    },
];



//  Employee table: order of titles
const employeeHeaders = ["#", "Name", "Position", "Payroll", "Sub Dept", "Department", "Status"];
const employeeFields = ["number", "name", "position", "payroll", "subDepartment", "department", "status"];

// Cources Table
const courseHeaders = ["Course", "Completed?", "Result", "Expiry Date", "Status", "Certificate Doc", "Feedback"];
const courseFields = ["course", "completed", "result", "expiry", "status", "certificate", "feedback"];

// Edit Details
const personalFields = [
    { label: "First Name", name: "firstName" },
    { label: "Middle Name", name: "middleName" },
    { label: "Last Name", name: "lastName" },
];

const jobFields = [
    { label: "Email Address", name: "email" },
    { label: "Payroll Number", name: "payroll" },
    { label: "Position", name: "position" },
    { label: "Department", name: "department" },
    { label: "Sub - Department", name: "subDepartment" },
    { label: "Seniority Date", name: "seniorityDate" },
];

const infoFields = personalFields.concat(jobFields);


// notfoication icon by type
function getNotificationIcon(type) {
    if (type === "warning") {
        return <CircleAlert size={20} />;
    }
    if (type === "danger") {
        return <CircleX size={20} />;
    }
    return <CircleCheck size={20} />;
}

// Row of  Employee table 
function renderEmployeeCell(row, field) {
    if (field === "status") {
        return <StatusBadge status={row.status} />;
    }
    return row[field];
}

// Row of Cources Table
function renderCourseCell(row, field) {
    if (field === "completed") {
        if (row.completed) {
            return (
                <span className="coord-check coord-check-yes">
                    <Check size={14} />
                </span>
            );
        }
        return (
            <span className="coord-check coord-check-no">
                <X size={14} />
            </span>
        );
    }

    if (field === "status") {
        return <StatusBadge status={row.status} />;
    }

    if (field === "certificate") {
        if (row.certificate) {
            return <FileText size={18} className="coord-doc-icon" />;
        }
        return "-";
    }

    if (field === "feedback") {
        if (row.feedback) {
            return <MessageSquare size={18} className="coord-feedback-icon" />;
        }
        return "-";
    }

    return row[field];
}


/* Pages Elements*/
function CoordinatorEmployees() {

    // (state) 
    const [employees, setEmployees] = useState(employeesData);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    // list , Employee details 
    const [currentView, setCurrentView] = useState("list");
    const [selectedId, setSelectedId] = useState(null);

    // The Main page sends { openAdd: true } when you click "Add Employee" in Quick Actions
    const location = useLocation();
    const cameFromQuickAction = location.state !== null && location.state !== undefined && location.state.openAdd === true;

    // pop up Edit / Add
    // formMode is "edit" or "add"
    const [formMode, setFormMode] = useState(cameFromQuickAction ? "add" : "edit");
    const [isEditOpen, setIsEditOpen] = useState(cameFromQuickAction);
    const [editForm, setEditForm] = useState(cameFromQuickAction ? emptyEmployee : {});

    // notifications
    const [notifications, setNotifications] = useState(notificationsData);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);


    // Functions

    // Details icon
    function openDetails(row) {
        setSelectedId(row.id);
        setCurrentView("details");
    }

    // Button Back to Main
    function backToList() {
        setCurrentView("list");
    }

    // Edit icon
    function openEdit(row) {
        const originalEmployee = employees.find(function (emp) {
            return emp.id === row.id;
        });
        setEditForm({ ...originalEmployee });
        setFormMode("edit");
        setIsEditOpen(true);
    }

    // Button Add Employee (opens the same window with empty fields)
    function openAdd() {
        setEditForm({ ...emptyEmployee });
        setFormMode("add");
        setIsEditOpen(true);
    }

    //  Whriting in Modal Dialog
    function handleEditChange(fieldName, newValue) {
        setEditForm({ ...editForm, [fieldName]: newValue });
    }

    // Button Save Changes (edit mode) or Add (add mode)
    function saveEdit() {
        if (formMode === "add") {
            // Add a new employee at the end of the list
            const newEmployee = { ...editForm, id: employees.length + 1 };
            setEmployees([...employees, newEmployee]);
        } else {
            // Replace the edited employee
            const updatedList = employees.map(function (emp) {
                if (emp.id === editForm.id) {
                    return editForm;
                }
                return emp;
            });
            setEmployees(updatedList);
        }
        setIsEditOpen(false);
    }

    // Button Cancel
    function closeEdit() {
        setIsEditOpen(false);
    }

    // Notification button
    function toggleNotifications() {
        setIsNotificationsOpen(!isNotificationsOpen);
    }

    // button Mark all as read
    function markAllAsRead() {
        const updatedNotifications = notifications.map(function (note) {
            return { ...note, read: true };
        });
        setNotifications(updatedNotifications);
    }



    // Number of unread notifications (the number on the bell)
    const unreadCount = notifications.filter(function (note) {
        return note.read === false;
    }).length;

    // Search
    const searchText = search.toLowerCase();
    const visibleEmployees = employees.filter(function (emp) {
        const allText =
            emp.firstName + " " +
            emp.middleName + " " +
            emp.lastName + " " +
            emp.position + " " +
            emp.payroll + " " +
            emp.subDepartment + " " +
            emp.department + " " +
            emp.status;
        return allText.toLowerCase().includes(searchText);
    });

    // Sorting
    if (sortBy !== "") {
        visibleEmployees.sort(function (a, b) {
            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        });
    }

    // Add the row number and the display name for the table
    const tableRows = visibleEmployees.map(function (emp, index) {
        return {
            ...emp,
            number: index + 1,
            name: emp.firstName + " " + emp.middleName,
        };
    });

    // The employee page opened in the details page
    const selectedEmployee = employees.find(function (emp) {
        return emp.id === selectedId;
    });

    //  Percentage circle(donut)
    const circleLength = 2 * Math.PI * 50;
    let circleOffset = circleLength;
    if (selectedEmployee) {
        circleOffset = circleLength - (selectedEmployee.completion / 100) * circleLength;
    }

    //  Details and Edit icons in the actions column
    function renderActions(row) {
        return (
            <div className="coord-actions">
                <button
                    className="coord-icon-btn"
                    aria-label="View employee details"
                    onClick={() => openDetails(row)}
                >
                    <Eye size={17} />
                </button>

                <button
                    className="coord-icon-btn coord-icon-btn-edit"
                    aria-label="Edit employee"
                    onClick={() => openEdit(row)}
                >
                    <Pencil size={17} />
                </button>
            </div>
        );
    }


    // shown on the screen
    return (
        <div className="coord-page">

            <Sidebar role="coordinator" />

            <div className="coord-content">

                <TrainingCoordinatorHeader/>


                {/* View 1: employees records*/}
                {currentView === "list" && (
                    <div>

                        <div className="coord-toolbar">

                            <div className="coord-search">
                                <Search size={16} className="coord-search-icon" />
                                <Input
                                    placeholder="Search by any field..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <select
                                className="coord-sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="firstName">Name</option>
                                <option value="position">Position</option>
                                <option value="payroll">Payroll</option>
                                <option value="department">Department</option>
                                <option value="status">Status</option>
                            </select>

                            <Button type="green" onClick={openAdd}>
                                <Plus size={14} /> Add Employee
                            </Button>

                        </div>

                        <Table
                            className="coord-records-table"
                            headers={employeeHeaders}
                            fields={employeeFields}
                            data={tableRows}
                            renderCell={renderEmployeeCell}
                            actions={renderActions}
                        />

                    </div>
                )}


                {/* View 2: employee details */}
                {currentView === "details" && selectedEmployee && (
                    <div>

                        <div className="coord-back-row">
                            <Button type="white" onClick={backToList}>
                                <ArrowLeft size={14} /> Back to Main
                            </Button>
                        </div>

                        <div className="dashboard-row dashboard-row-top">

                            <div className="panel coord-profile">

                                <div className="coord-profile-top">
                                    <CircleUserRound
                                        size={46}
                                        strokeWidth={1.3}
                                        className="coord-profile-avatar"
                                    />

                                    <div className="coord-profile-text">
                                        <h3 className="coord-profile-name">
                                            {selectedEmployee.firstName} {selectedEmployee.middleName} {selectedEmployee.lastName}
                                        </h3>
                                        <p className="coord-profile-sub">
                                            {selectedEmployee.position} , {selectedEmployee.department} Department
                                        </p>
                                    </div>

                                    <StatusBadge status={selectedEmployee.status} />
                                </div>

                                <div className="coord-info-grid">
                                    {infoFields.map(function (item) {
                                        return (
                                            <div key={item.name} className="coord-info-item">
                                                <span className="coord-info-label">{item.label}</span>
                                                <span className="coord-info-value">
                                                    {selectedEmployee[item.name]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>

                            <div className="panel completion-panel">
                                <h3 className="panel-title panel-title-green">
                                    Overall Course Completion Rate
                                </h3>

                                <div className="donut">
                                    <svg viewBox="0 0 120 120">
                                        <circle
                                            className="donut-track"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            strokeWidth="14"
                                        />
                                        <circle
                                            className="donut-progress"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            strokeWidth="14"
                                            strokeDasharray={circleLength}
                                            strokeDashoffset={circleOffset}
                                            transform="rotate(-90 60 60)"
                                        />
                                    </svg>

                                    <span className="donut-value">{selectedEmployee.completion} %</span>
                                </div>
                            </div>

                        </div>

                        <h2 className="coord-section-title">Required Courses and Certificates</h2>
                        <Table
                            className="coord-course-table"
                            headers={courseHeaders}
                            fields={courseFields}
                            data={requiredCourses}
                            renderCell={renderCourseCell}
                        />

                        <h2 className="coord-section-title">Optional Courses and Certificates</h2>
                        <Table
                            className="coord-course-table"
                            headers={courseHeaders}
                            fields={courseFields}
                            data={optionalCourses}
                            renderCell={renderCourseCell}
                        />

                    </div>
                )}


                {/* Edit / Add employee window */}
                <Modal
                    isOpen={isEditOpen}
                    onClose={closeEdit}
                    title={
                        <span className="coord-modal-title">
                            {formMode === "add" ? <Plus size={18} /> : <Pencil size={18} />}
                            {formMode === "add" ? "Add Employee Information" : "Edit Employee Information"}
                        </span>
                    }
                >
                    <p className="coord-modal-subtitle">
                        {formMode === "add"
                            ? "Enter the new employee information"
                            : "Update " + editForm.firstName + " " + editForm.middleName + " " + editForm.lastName}
                    </p>

                    <h4 className="coord-form-section">Personal Information</h4>
                    <div className="coord-form-grid">
                        {personalFields.map(function (field) {
                            return (
                                <Input
                                    key={field.name}
                                    label={field.label}
                                    value={editForm[field.name]}
                                    onChange={(e) => handleEditChange(field.name, e.target.value)}
                                />
                            );
                        })}
                    </div>

                    <h4 className="coord-form-section">Job Information</h4>
                    <div className="coord-form-grid">
                        {jobFields.map(function (field) {
                            return (
                                <Input
                                    key={field.name}
                                    label={field.label}
                                    value={editForm[field.name]}
                                    onChange={(e) => handleEditChange(field.name, e.target.value)}
                                />
                            );
                        })}
                    </div>

                    <div className="coord-modal-footer">
                        <Button type="white" onClick={closeEdit}>Cancel</Button>
                        <Button type="green" onClick={saveEdit}>
                            {formMode === "add" ? "Add" : "Save Changes"}
                        </Button>
                    </div>
                </Modal>

            </div>
        </div>
    );
}

export default CoordinatorEmployees;