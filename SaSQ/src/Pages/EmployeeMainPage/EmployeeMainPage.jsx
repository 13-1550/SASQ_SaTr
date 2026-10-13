import { useState, useEffect, useRef } from "react";
import {
  Award,
  Upload,
  Users,
  Bell,
  CircleUser,
  AlertCircle,
  XCircle,
  PackagePlus} from "lucide-react";
import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";
import Card from "../../Components/Common/Card/Card";
import Table from "../../Components/Common/Table/Table";
import StatusBadge from "../../Components/Common/StatusBadge/StatusBadge";


//  Notification icons 
const notificationIcons = {
  warning: AlertCircle,
  danger: XCircle,
  info: PackagePlus
};

//  Header
function PageHeader(props) {
    /* isNotificationsOpen is a corrent value of the Window, setIsNotificationsOpen for change value */
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);
  /* useRef for click inside and outsidand window */
  const notificationRef = useRef(null);

  const {
    title,
    subtitle,
    userName,
    userRole,
    notifications,
    notificationItems = []
  } = props;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = isRead ? 0 : notifications;

  return (
    <header className="page-header">
      <div>
        <h1 className="page-header-title">{title}</h1>
        <p className="page-header-subtitle">{subtitle}</p>
      </div>

      <div className="page-header-user">
        <div
          className="page-header-notifications"
          ref={notificationRef}
        >
          <button
            type="button"
            className="notification-btn"
            onClick={() =>
              setIsNotificationsOpen(!isNotificationsOpen)
            }
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
          >
            <Bell size={26} />

            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="notification-popup">
              <div className="notification-popup-header">
                <h3>Notifications</h3>

                <div className="notification-popup-actions">
                  {!isRead && notifications > 0 && (
                    <button
                      type="button"
                      className="mark-read-btn"
                      onClick={() => setIsRead(true)}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              <div className="notification-popup-list">
                {notificationItems.length > 0 ? (
                  notificationItems.map((item, index) => {
                    const Icon =
                      notificationIcons[item.type] || AlertCircle;

                    return (
                      <div
                        className={
                          "notification-popup-item" +
                          (item.unread && !isRead ? " unread" : "")
                        }
                        key={index}
                      >
                        <span
                          className={
                            "notification-popup-icon " + item.type
                          }
                        >
                          <Icon />
                        </span>

                        <div className="notification-popup-content">
                          <strong>{item.title}</strong>
                          <p>{item.message}</p>
                          <small>{item.time}</small>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="notification-empty">
                    No notifications
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <CircleUser className="user-avatar" size={46} />

        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-role">{userRole}</span>
        </div>
      </div>
    </header>
  );
}

//  Circle with the percentage 
function DonutChart(props) {
  const value = props.value;

  return (
    <div className="donut" style={{ width: 142, height: 142 }}>
      <svg width="142" height="142" viewBox="0 0 142 142">
        <circle
          className="donut-track"
          cx="71"
          cy="71"
          r="65"
          strokeWidth="12"
          fill="none"
        />

        <circle
          className="donut-progress"
          cx="71"
          cy="71"
          r="65"
          strokeWidth="12"
          fill="none"
          pathLength="100"
          strokeDasharray={value + " 100"}
          transform="rotate(-90 71 71)"
        />
      </svg>

      <span className="donut-value">{value} %</span>
    </div>
  );
}

//  Course Data 
const courseData = [
  {
    course: "Safety Management System",
    status: <StatusBadge status="Active" />
  },
  {
    course: "Emergency Response Fundamentals",
    status: <StatusBadge status="Warning" />
  },
  {
    course: "Fire Safety Awareness",
    status: <StatusBadge status="Expired" />
  },
  {
    course: "Root Cause Analysis",
    status: <StatusBadge status="Not Started" />
  }
];

//  Notification Data 

const notificationData = [
  {
    title: "Certificate expiring in 30 days",
    message: "Cloud Security Certificate",
    time: "Today · 9:15 AM",
    type: "warning",
    unread: true
  },
  {
    title: "Certificate expired",
    message: "Database Administration Certificate",
    time: "Today · 9:05 AM",
    type: "danger",
    unread: true
  },
  {
    title: "New course assigned",
    message: "Database Administration Certificate",
    time: "Yesterday · 8:05 PM",
    type: "info"
  }
];

//  Recent Activity Data 
const recentActivityData = [
  { title: "Certificate Uploaded", time: "Today · 9:05 AM" },
  { title: "Department Uploaded", time: "Today · 8:45 AM" },
  { title: "New course assigned", time: "Today · 8:45 AM" },
  { title: "Certificate Uploaded", time: "Today · 8:45 AM" }
];

// The Page 
function EmployeeMainPage() {
  return (
    <div className="dashboard-page employee-dashboard">
      <Sidebar role="employee" activePage="Main page" />

      <main className="dashboard-content">
        <PageHeader
          title="Main page"
          subtitle="View and manage all Functionality"
          userName="Omar Mohammed"
          userRole="Employee"
          notifications={notificationData.filter((n) => n.unread).length}
          notificationItems={notificationData}
        />

        {/* First row: Quick Actions + Completion Rate */}
        <section className="dashboard-row dashboard-row-top">
          <div className="card panel">
            <h2 className="panel-title panel-title-lg">
              Quick Actions
            </h2>

            <div className="quick-actions">
              <div className="quick-action">
                <Button type="white">
                  <span className="quick-action-label">Courses</span>
                  <span className="quick-action-icon">
                    <Award size={24} />
                  </span>
                </Button>
              </div>

              <div className="quick-action">
                <Button type="white">
                  <span className="quick-action-label">Certificates</span>
                  <span className="quick-action-icon">
                    <Upload size={24} />
                  </span>
                </Button>
              </div>

              <div className="quick-action">
                <Button type="green">
                  <span className="quick-action-label">
                    Personal Information
                  </span>
                  <span className="quick-action-icon">
                    <Users size={24} />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="card panel completion-panel">
            <h2 className="panel-title panel-title-green">
              Overall Course Completion Rate
            </h2>

            <DonutChart value={70} />
          </div>
        </section>

        {/* Second row: Course Status + Recent Activity */}
        <section className="dashboard-row dashboard-row-bottom">
          <div className="card panel">
            <h2 className="panel-title">Course Status</h2>

            <Table
              headers={["Course", "Status"]}
              data={courseData}
              className="list-table course-status-table"
            />
          </div>

          <div className="card panel">
            <h2 className="panel-title">Recent Activity</h2>

            <Table
              headers={[]}
              data={recentActivityData}
              className="list-table activity-table"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeMainPage;
