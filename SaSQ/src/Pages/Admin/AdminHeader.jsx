
import { useState } from "react";
import {
  Bell,
  CircleAlert,
  CircleCheck,
  Mail,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New user created",
      message: "A new user account has been added to the system.",
      time: "Today · 9:05 AM",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      title: "Certificate expired",
      message: "An employee certificate has passed its expiry date.",
      time: "Today · 8:45 AM",
      type: "error",
      unread: false,
    },
    {
      id: 3,
      title: "Failed login attempt",
      message: "A user entered an incorrect password.",
      time: "Today · 8:20 AM",
      type: "warning",
      unread: false,
    },
    {
      id: 4,
      title: "Audit log updated",
      message: "New system activities have been recorded.",
      time: "Today · 8:05 AM",
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
    <header className="manager-header admin-header">
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
            <span>KM</span>
          </div>

          <div className="manager-profile-info">
            <strong>Khalid Mohammed</strong>
            <span>Admin</span>
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

export default AdminHeader;
