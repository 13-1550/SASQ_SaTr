import { useMemo, useState } from "react";
import { Bell, CircleUserRound, Search, Filter, ChevronDown, List, Pencil, Trash2, Plus } from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Table from "../../Components/Common/Table/Table";
import Button from "../../Components/Common/Button/Button";
import Input from "../../Components/Common/Input/Input";
import Modal from "../../Components/Common/Modal/Modal";

const initialCourses = [
    { id: 1, name: "Cybersecurity Awareness", code: "CSA-1012", trainer: "SAUDIA Learning", validity: "Permanent", mandatory: "All Employees" },
    { id: 2, name: "Fire Safety", code: "IOSH", trainer: "Civil Defense", validity: "Permanent", mandatory: "All Employees" },
    { id: 3, name: "First Aid & CPR", code: "FACC", trainer: "Saudi Red Crescent", validity: "2 Years", mandatory: "None" },
    { id: 4, name: "Code of Conduct & Ethics", code: "CCE-1445", trainer: "HR Department", validity: "3 Years", mandatory: "Human Resources" },
    { id: 5, name: "AI Productivity Fundamentals", code: "AIC1001", trainer: "Microsoft", validity: "Permanent", mandatory: "IT Departments" },
    { id: 6, name: "Time Management", code: "TM0123", trainer: "Coursera", validity: "Permanent", mandatory: "None" },
    { id: 7, name: "Project Management", code: "PM101", trainer: "Coursera", validity: "Permanent", mandatory: "None" },
    { id: 8, name: "UX Design", code: "UX201", trainer: "Coursera", validity: "Permanent", mandatory: "None" },
];

const emptyCourse = { name: "", code: "", trainer: "", validity: "", mandatory: "" };

const headers = ["Name", "Code", "Trainer"];
const fields = ["name", "code", "trainer"];

const formFields = [
    ["Course Name", "name"],
    ["Course Code", "code"],
    ["Trainer", "trainer"],
    ["Validity Duration", "validity"],
    ["Mandatory For", "mandatory"],
];

function CoordinatorCourses() {
    const [courses, setCourses] = useState(initialCourses);
    const [search, setSearch] = useState("");
    const [trainerFilter, setTrainerFilter] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [viewId, setViewId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = add mode
    const [form, setForm] = useState(emptyCourse);

    const trainers = useMemo(() => [...new Set(courses.map((c) => c.trainer))], [courses]);

    const rows = useMemo(() => {
        const text = search.trim().toLowerCase();
        let result = courses.filter(
            (c) =>
                (!trainerFilter || c.trainer === trainerFilter) &&
                (!text || [c.name, c.code, c.trainer].join(" ").toLowerCase().includes(text))
        );
        if (sortBy) {
            result = [...result].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])));
        }
        return result;
    }, [courses, search, trainerFilter, sortBy]);

    const viewed = courses.find((c) => c.id === viewId);
    const toDelete = courses.find((c) => c.id === deleteId);

    function openAdd() {
        setEditingId(null);
        setForm(emptyCourse);
        setIsFormOpen(true);
    }

    function openEdit(row) {
        setEditingId(row.id);
        setForm({ ...row });
        setIsFormOpen(true);
    }

    function saveCourse() {
        if (!form.name.trim() || !form.code.trim()) return;
        if (editingId === null) {
            setCourses([...courses, { ...form, id: Date.now() }]);
        } else {
            setCourses(courses.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
        }
        setIsFormOpen(false);
    }

    function confirmDelete() {
        setCourses(courses.filter((c) => c.id !== deleteId));
        setDeleteId(null);
    }

    function renderActions(row) {
        return (
            <div className="courses-actions">
                <button className="courses-icon-btn courses-icon-view" aria-label="View course details" onClick={() => setViewId(row.id)}>
                    <List size={18} />
                </button>
                <button className="courses-icon-btn courses-icon-edit" aria-label="Edit course" onClick={() => openEdit(row)}>
                    <Pencil size={16} />
                </button>
                <button className="courses-icon-btn courses-icon-delete" aria-label="Delete course" onClick={() => setDeleteId(row.id)}>
                    <Trash2 size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="courses-page">
            <Sidebar role="coordinator" />

            <main className="courses-content">
                <header className="page-header">
                    <div className="page-header-user">
                        <button type="button" className="notification-btn" aria-label="Notifications">
                            <Bell size={24} />
                            <span className="notification-badge">1</span>
                        </button>
                        <CircleUserRound className="user-avatar" strokeWidth={1.3} />
                        <div className="user-info">
                            <span className="user-name">Noura Alansari</span>
                            <span className="user-role">Training Coordinator</span>
                        </div>
                    </div>
                </header>

                <h1 className="courses-title">Courses List</h1>

                <div className="courses-toolbar">
                    <div className="um-search courses-search">
                        <Search size={16} className="um-search-icon" />
                        <Input
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="courses-select">
                        <select value={trainerFilter} onChange={(e) => setTrainerFilter(e.target.value)} aria-label="Filter by trainer">
                            <option value="">Filter</option>
                            {trainers.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <Filter size={16} className="courses-select-icon" />
                    </div>

                    <div className="courses-select">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort courses">
                            <option value="">Sort by</option>
                            <option value="name">Name</option>
                            <option value="code">Code</option>
                            <option value="trainer">Trainer</option>
                        </select>
                        <ChevronDown size={16} className="courses-select-icon" />
                    </div>

                    <Button type="green" onClick={openAdd}>
                        <Plus size={14} /> Add Course
                    </Button>
                </div>

                <Table className="courses-table" headers={headers} fields={fields} data={rows} actions={renderActions} />

                {/* Add / Edit */}
                <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingId === null ? "Add Course" : "Edit Course"}>
                    <div className="courses-form">
                        {formFields.map(([label, key]) => (
                            <div key={key} className="courses-form-field">
                                <label>{label}</label>
                                <input
                                    className="input"
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                />
                            </div>
                        ))}
                        <div className="courses-form-actions">
                            <Button type="white" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="green" onClick={saveCourse}>{editingId === null ? "Add Course" : "Save Changes"}</Button>
                        </div>
                    </div>
                </Modal>

                {/* View */}
                <Modal isOpen={viewId !== null} onClose={() => setViewId(null)} title="Course Details">
                    {viewed && (
                        <div className="courses-form">
                            {formFields.map(([label, key]) => (
                                <div key={key} className="courses-form-field">
                                    <label>{label}</label>
                                    <input className="input" value={viewed[key]} readOnly />
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>

                {/* Delete */}
                <Modal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Course">
                    <p className="courses-delete-text">
                        Are you sure you want to delete <strong>{toDelete?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="courses-form-actions">
                        <Button type="white" onClick={() => setDeleteId(null)}>Cancel</Button>
                        <Button type="green" onClick={confirmDelete}>Delete</Button>
                    </div>
                </Modal>
            </main>
        </div>
    );
}

export default CoordinatorCourses;