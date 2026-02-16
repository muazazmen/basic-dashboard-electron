/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("access_token"));

  return (
    <Router>
      <Routes>
        {/* Login page without header */}
        <Route
          path="/login"
          element={<Login onLogin={() => setLogged(true)} />}
        />

        {/* All other pages with Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout onLogout={() => setLogged(false)}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  {/* Add more pages here */}
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
