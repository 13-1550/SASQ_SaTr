
import { useState } from "react";
import {
  Bell,
  CircleAlert,
  CircleCheck,
  Mail,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmployeeHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Certificate approved",
      message: "Your uploaded certificate has been approved.",
      time: "Today · 9:05 AM",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      title: "Course reminder",
      message: "You have an upcoming training course to complete.",
      time: "Today · 8:45 AM",
      type: "warning",
      unread: true,
    },
    {
      id: 3,
      title: "Certificate expiring soon",
      message: "One of your certificates will expire in 30 days.",
      time: "Yesterday · 3:20 PM",
      type: "error",
      unread: false,
    },
    {
      id: 4,
      title: "Training update",
      message: "Your training records have been updated.",
      time: "Yesterday · 1:15 PM",
      type: "email",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function getNotificationIcon(type) {
    if (type === "warning") return <CircleAlert size={21} />;
    if (type === "error") return <X size={21} />;
    if (type === "email") return <Mail size={21} />;
    return <CircleCheck size={21} />;
  }

  return (
    <header className="manager-header employee-header">
      <div className="manager-header-spacer" />

      <div className="manager-header-actions">
        <div className="notification-wrapper">
          <button
            type="button"
            className="notification-bell"
            onClick={() =>
              setShowNotifications((previous) => !previous)
            }
            aria-label="Toggle notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={25} />

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <button
                type="button"
                className="notification-backdrop"
                aria-label="Close notifications"
                onClick={() => setShowNotifications(false)}
              />

              <section className="notification-panel">
                <div className="notification-panel-header">
                  <h2>Notifications</h2>

                  <button
                    type="button"
                    className="mark-read-button"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="notification-list">
                  {notifications.map((notification) => (
                    <article
                      key={notification.id}
                      className={`notification-item ${
                        notification.unread ? "unread" : ""
                      }`}
                    >
                      <div
                        className={`notification-icon ${notification.type}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="notification-content">
                        <div className="notification-item-heading">
                          <h3>{notification.title}</h3>
                          <span>{notification.time}</span>
                        </div>

                        <p>{notification.message}</p>
                      </div>
                    </article>
                  ))}

                  {notifications.length === 0 && (
                    <p className="no-notifications">
                      You're all caught up!
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="manager-profile">
          <div className="manager-avatar">
            <span>OM</span>
          </div>

          <div className="manager-profile-info">
            <strong>Omar Mohammed</strong>
            <span>Employee</span>
          </div>
        </div>

        <button
          type="button"
          className="header-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default EmployeeHeader;
