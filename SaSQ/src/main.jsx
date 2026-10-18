import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AMainPage from "./Pages/Admin/AMainPage";

import "./Styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/admin/main" element={<AMainPage />} />
                <Route path="*" element={<Navigate to="/admin/main" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);