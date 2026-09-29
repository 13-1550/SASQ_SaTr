import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ManagerMain from "./Pages/Manager/MMainPage";
import ManagerReports from "./Pages/Manager/ManagerReports";

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

            </Routes>
        </BrowserRouter>
    );
}

export default App;