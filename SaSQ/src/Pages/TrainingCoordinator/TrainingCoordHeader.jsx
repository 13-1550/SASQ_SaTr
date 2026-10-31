
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CircleAlert,
  CircleCheck,
  X,
  LogOut,
} from "lucide-react";

function TrainingCoordinatorHeader() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Certificate expiring in 30 days",
      message: "Cloud Security Certificate",
      time: "Today · 9:05 AM",
      type: "warning",
      unread: true,
    },
    {
      id: 2,
      title: "Course added to the Network Engineering department",
      message: "Cisco Certified Network Associate",
      time: "Today · 9:05 AM",
      type: "error",
      unread: true,
    },
    {
      id: 3,
      title: "Employee data updated successfully",
      message:
        "Sara Alahmadi's department has been updated from IT Operations to Network Engineering",
      time: "Today · 8:05 AM",
      type: "success",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function handleLogout() {
    setShowNotifications(false);
    navigate("/");
  }

  function getIcon(type) {
    if (type === "warning") return <CircleAlert size={19} />;
    if (type === "error") return <X size={19} />;
    return <CircleCheck size={19} />;
  }

  return (
    <header className="manager-header coordinator-header">
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

              <section className="notification-panel coordinator-notification-panel">
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
                        {getIcon(notification.type)}
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
                </div>
              </section>
            </>
          )}
        </div>

        <div className="manager-profile">
          <div className="manager-avatar coordinator-avatar">
            <span>NA</span>
          </div>

          <div className="manager-profile-info">
            <strong>Noura Alansari</strong>
            <span>Training Coordinator</span>
          </div>
        </div>

        <button
          type="button"
          className="header-logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default TrainingCoordinatorHeader;
