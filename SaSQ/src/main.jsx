import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AMainPage from "./Pages/Admin/AMainPage";
import UserManagement from "./Pages/Admin/UserManagement";

import "./Styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/admin/main" element={<AMainPage />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
                <Route path="*" element={<Navigate to="/admin/main" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);