
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, LockKeyhole } from "lucide-react";

function Login() {
    const [role, setRole] = useState("manager");
    const navigate = useNavigate();

    const users = {
        employee: {
            name: "Employee",
            path: "/employee"
        },
        coordinator: {
            name: "Training Coordinator",
            path: "/coordinator"
        },
        manager: {
            name: "Manager",
            path: "/manager/main"
        },
        admin: {
            name: "Admin",
            path: "/admin/main"
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate(users[role].path);
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleLogin}>
                <h1>SaSQ</h1>
                <p className="login-subtitle">
                    Training Management System
                </p>

                <h2>Welcome Back</h2>
                <p>Sign in to access your dashboard.</p>

                <label htmlFor="username">Username</label>
                <div className="login-input">
                    <UserRound size={18} />
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        defaultValue="demo.user"
                    />
                </div>

                <label htmlFor="password">Password</label>
                <div className="login-input">
                    <LockKeyhole size={18} />
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        defaultValue="demo123"
                    />
                </div>

                <label htmlFor="role">Demo user role</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="employee">Employee</option>
                    <option value="coordinator">Training Coordinator</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="login-button">
                    Sign In
                </button>

                <p className="login-demo-note">
                    Demo mode · No real authentication
                </p>
            </form>
        </div>
    );
}

export default Login;

