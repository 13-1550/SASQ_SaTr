import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ManagerMain from "./Pages/Manager/MMainPage";
import ManagerReports from "./Pages/Manager/ManagerReports";
import ManagerCourses from "./Pages/Manager/ManagerCourses";
import ManagerEmployees from "./Pages/Manager/ManagerEmployees";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/manager/main" replace />}
                />

                <Route
                    path="/manager/main"
                    element={<ManagerMain />}
                />

                <Route
                    path="/manager/reports"
                    element={<ManagerReports />}
                />

                <Route
                path="/manager/courses"
                element={<ManagerCourses />}
                />

                <Route
                path="/manager/employees"
                element={<ManagerEmployees />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;