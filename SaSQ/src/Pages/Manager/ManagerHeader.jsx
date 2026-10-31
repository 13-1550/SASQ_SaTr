
import { useState } from "react";
import {
  Bell,
  CircleAlert,
  CircleCheck,
  Mail,
  X,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function ManagerHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Certificate expiring in 30 days",
      message:
        "A required certificate is approaching its expiry date and needs renewal.",
      course: "Cloud Security Certificate",
      time: "Today · 9:05 AM",
      type: "warning",
      unread: true,
    },
    {
      id: 2,
      title: "Certificate expired",
      message:
        "This certificate has passed its expiry date. Employee status updated to Inactive.",
      course: "Database Administration Certificate",
      time: "Today · 9:05 AM",
      type: "error",
      unread: true,
    },
    {
      id: 3,
      title: "Expiration email sent",
      message:
        "An expiration notification email has been sent.",
      course: "Database Administration Certificate",
      time: "Today · 8:05 AM",
      type: "email",
      unread: false,
    },
    {
      id: 4,
      title: "Expiration email sent",
      message:
        "An automatic notification was emailed to the employee and Training Coordinator.",
      course: "Cloud Security Certificate",
      time: "Today · 9:05 AM",
      type: "success",
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

  function toggleNotifications() {
    setShowNotifications((previous) => !previous);
  }

  function getNotificationIcon(type) {
    if (type === "warning") return <CircleAlert size={21} />;
    if (type === "error") return <X size={21} />;
    if (type === "email") return <Mail size={21} />;
    return <CircleCheck size={21} />;
  }

  return (
    <header className="manager-header">
      <div className="manager-header-spacer" />

      <div className="manager-header-actions">
        <div className="notification-wrapper">
          <button
            type="button"
            className={`notification-bell ${
              showNotifications ? "active" : ""
            }`}
            onClick={toggleNotifications}
            aria-label="Toggle notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={25} />

            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
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

                        <div className="notification-course">
                          {notification.course}
                        </div>
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
            <img
              src="/manager-avatar.png"
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span>MA</span>
          </div>

          <div className="manager-profile-info">
            <strong>Mohammed Abdullah</strong>
            <span>Manager</span>
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
      </div>
    </header>
  );
}

export default ManagerHeader;
