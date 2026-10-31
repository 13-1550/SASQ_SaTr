
import { useState, useEffect } from "react";
import {
    BookOpen,
    Users,
    CheckCircle,
    Search,
    LayoutGrid,
    Filter,
    RotateCcw,
    List,
    Bell,
    CircleUser,
    FileText,
    X,
    Download
} from "lucide-react";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Card from "../../Components/Common/Card/Card";
import Button from "../../Components/Common/Button/Button";
import Table from "../../Components/Common/Table/Table";
import EmployeeHeader from "./EmployeeHeader";
// Course Data
const courses = [
    {
        name: "Cybersecurity Awareness",
        code: "CSA-1012",
        trainer: "SAUDIA Learning",
        expiresIn: "12 months",
        grade: "92%",
        type: "Mandatory",
        status: "Valid",
        syllabusUrl: ""
    },
    {
        name: "Fire Safety",
        code: "IOSH",
        trainer: "Civil Defense",
        expiresIn: "30 days",
        grade: "85%",
        type: "Mandatory",
        status: "Soon to expire",
        syllabusUrl: ""
    },
    {
        name: "First Aid & CPR",
        code: "FACC",
        trainer: "Saudi Red Crescent",
        expiresIn: "15 days",
        grade: "88%",
        type: "Optional",
        status: "Soon to expire",
        syllabusUrl: ""
    },
    {
        name: "Code of Conduct & Ethics",
        code: "CCE-1445",
        trainer: "HR Department",
        expiresIn: "Expired",
        grade: "76%",
        type: "Mandatory",
        status: "Expired",
        syllabusUrl: ""
    },
    {
        name: "AI Productivity Fundamentals",
        code: "AIC1001",
        trainer: "Microsoft",
        expiresIn: "Not applicable",
        grade: "Not graded",
        type: "Optional",
        status: "Incomplete",
        syllabusUrl: ""
    }
];

// Courses Page
function CoursesPage() {
    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Search Courses
    const shownCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
    );

    // Table Data
    const tableData = shownCourses.map((course) => ({
        name: course.name,
        code: course.code,
        trainer: course.trainer,
        status: course.status,
        details: (
            <button
                type="button"
                className="details-btn"
                onClick={() => setSelectedCourse(course)}
                aria-label={`View details for ${course.name}`}
            >
                <List size={18} />
            </button>
        )
    }));

    const tableHeaders = [
        "Name",
        "Code",
        "Trainer",
        "Status",
        "Details"
    ];

    return (
        <div className="dashboard-page employee-dashboard">

            <Sidebar role="employee"/>

            <main className="dashboard-content">
                {/* Page Header */}
               <EmployeeHeader />

                {/* Course Summary Cards */}
                <section className="courses-cards">
                    <div
                        className="stat-card"
                        data-subtitle="Training courses"
                    >
                        <Card
                            label="Total Courses"
                            number="24"
                            numberColor="green"
                            icon={
                                <span className="course-icon course-icon-green">
                                    <BookOpen size={20} />
                                </span>
                            }
                        />
                    </div>

                    <div
                        className="stat-card"
                        data-subtitle="Currently incomplete"
                    >
                        <Card
                            label="Incomplete Courses"
                            number="8"
                            numberColor="blue"
                            icon={
                                <span className="course-icon course-icon-blue">
                                    <Users size={20} />
                                </span>
                            }
                        />
                    </div>

                    <div
                        className="stat-card"
                        data-subtitle="Successfully completed"
                    >
                        <Card
                            label="Completed Courses"
                            number="5"
                            numberColor="green"
                            icon={
                                <span className="course-icon course-icon-green">
                                    <CheckCircle size={20} />
                                </span>
                            }
                        />
                    </div>
                </section>

                {/* Search and Filters */}
                <section className="courses-filters">
                    <div className="courses-search">
                        <Search
                            size={18}
                            className="courses-search-icon"
                        />

                        <input
                            className="input"
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>

                    <Button type="white">
                        <LayoutGrid size={18} color="#000000" />

                        <span className="filter-btn-text">
                            <span className="filter-btn-small">
                                Category
                            </span>

                            <span className="filter-btn-big">
                                All Categories
                            </span>
                        </span>
                    </Button>

                    <Button type="white">
                        <Filter size={18} color="#000000" />

                        <span className="filter-btn-text">
                            <span className="filter-btn-small">
                                Status
                            </span>

                            <span className="filter-btn-big">
                                All Status
                            </span>
                        </span>
                    </Button>

                    <Button
                        type="white"
                        onClick={() => setSearch("")}
                    >
                        <RotateCcw
                            size={14}
                            color="#000000"
                        />

                        <span className="filter-btn-big">
                            Clear Filters
                        </span>
                    </Button>
                </section>

                {/* Courses Table */}
                <Table
                    headers={tableHeaders}
                    data={tableData}
                    fields={[
                        "name",
                        "code",
                        "trainer",
                        "status",
                        "details"
                    ]}
                    className="courses-table"
                />
            </main>

            {/* Course Details Modal */}
            {selectedCourse && (
                <CourseDetailsModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </div>
    );
}

// Course Details Modal
function CourseDetailsModal({ course, onClose }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!course) {
        return null;
    }

    const statusClasses = {
        "Valid": "status-valid",
        "Soon to expire": "status-soon",
        "Expired": "status-expired",
        "Incomplete": "status-incomplete"
    };

    function openSyllabus() {
        if (course.syllabusUrl) {
            window.open(
                course.syllabusUrl,
                "_blank",
                "noopener,noreferrer"
            );
        }
    }

    return (
        <div
            className="modal-overlay"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="modal course-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="course-modal-title"
            >
                {/* Modal Header */}
                <div className="modal-header course-modal-header">
                    <div className="course-modal-heading">
                        <span className="course-file-icon">
                            <FileText size={23} />
                        </span>

                        <h2 id="course-modal-title">
                            Course Details
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Course Information */}
                <div className="modal-content course-modal-content">
                    <div className="input-container course-field">
                        <label htmlFor="course-name">
                            Course Name
                        </label>

                        <input
                            id="course-name"
                            className="input course-input"
                            value={course.name}
                            readOnly
                        />
                    </div>

                    <div className="course-fields-row">
                        <div className="input-container course-field">
                            <label htmlFor="course-code">
                                Course Code
                            </label>

                            <input
                                id="course-code"
                                className="input course-input"
                                value={course.code}
                                readOnly
                            />
                        </div>

                        <div className="input-container course-field">
                            <label htmlFor="course-trainer">
                                Trainer
                            </label>

                            <input
                                id="course-trainer"
                                className="input course-input"
                                value={course.trainer}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="course-fields-row">
                        <div className="input-container course-field">
                            <label htmlFor="course-expires">
                                Expires in
                            </label>

                            <input
                                id="course-expires"
                                className="input course-input"
                                value={course.expiresIn}
                                readOnly
                            />
                        </div>

                        <div className="input-container course-field">
                            <label htmlFor="course-grade">
                                Grade
                            </label>

                            <input
                                id="course-grade"
                                className="input course-input"
                                value={course.grade}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Course Type, Status and Syllabus */}
                <div className="course-modal-footer">
                    <div className="course-modal-badges">
                        <span
                            className={`course-type-badge ${
                                course.type === "Mandatory"
                                    ? "type-mandatory"
                                    : "type-optional"
                            }`}
                        >
                            {course.type}
                        </span>

                        <span
                            className={`course-status-badge ${
                                statusClasses[course.status] ||
                                "status-incomplete"
                            }`}
                        >
                            {course.status}
                        </span>
                    </div>

                    <Button
                        type="white"
                        onClick={openSyllabus}
                    >
                        <span>Syllabus</span>

                        <span className="course-download-icon">
                            <Download size={18} />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CoursesPage;
