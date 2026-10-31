import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login/Login";

// Manager
import ManagerMain from "./Pages/Manager/MMainPage";
import ManagerReports from "./Pages/Manager/ManagerReports";
import ManagerCourses from "./Pages/Manager/ManagerCourses";
import ManagerEmployees from "./Pages/Manager/ManagerEmployees";

// Employee
import EmployeeMainPage from "./Pages/Employee/EmployeeMainPage";
import CoursesPage from "./Pages/Employee/EmployeeCourses";
import EmployeeUpload from "./Pages/Employee/EmployeeUpload";
import EmployeeCertificates from "./Pages/Employee/EmployeeCertificates";

// Coordinator
import CoordinatorMain from "./Pages/TrainingCoordinator/CoordinatorMain";
import CoordinatorEmployees from "./Pages/TrainingCoordinator/EmployeesRecord";
import CoordinatorReports from "./Pages/TrainingCoordinator/CoordReports";
import CoordinatorCourses from "./Pages/TrainingCoordinator/TrainingCoordinatorCourses";
// Admin
import AdminMain from "./Pages/Admin/AMainPage";
import UserManagement from "./Pages/Admin/UserManagement";
import AdminReports from "./Pages/Admin/AdminReports";
import AdminAuditLog from "./Pages/Admin/AdminAuditLog";
import AdminEmployees from "./Pages/Admin/AdminEmployees";
import AdminCourses from "./Pages/Admin/AdminCourses";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Manager */}
                <Route path="/manager/main" element={<ManagerMain />} />
                <Route path="/manager/courses" element={<ManagerCourses />} />
                <Route path="/manager/employees" element={<ManagerEmployees />} />
                <Route path="/manager/reports" element={<ManagerReports />} />

                {/* Employee */}
                <Route path="/employee/main" element={<EmployeeMainPage />} />
                <Route path="/employee/courses" element={<CoursesPage />} />
                <Route path="/employee/upload" element={<EmployeeUpload />} />
                <Route path="/employee/certificates" element={<EmployeeCertificates />} />

                {/* Training Coordinator */}
                <Route path="/coordinator/main" element={<CoordinatorMain />} />
                <Route path="/coordinator/employees" element={<CoordinatorEmployees />}/>
                <Route path="/coordinator/reports" element={<CoordinatorReports />}/>
                <Route path="/coordinator/courses" element={<CoordinatorCourses />}/>

                {/* Admin */}
                <Route path="/admin/main" element={<AdminMain />} />
                <Route path="/admin/user-management" element={<UserManagement />}/>
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/audit-log" element={<AdminAuditLog />} />
                <Route path="/admin/employees" element={<AdminEmployees />} />
                <Route path="/admin/courses" element={<AdminCourses />} />

                {/* Unknown URLs */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;