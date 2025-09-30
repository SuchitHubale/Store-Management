import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// import { UserDashboard } from "./pages/UserDashboard";
// import { StoreOwnerDashboard } from "./pages/StoreOwnerDashboard";
// import { AdminDashboard } from "./pages/AdminDashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserPage from "./pages/UserDashboard";

// A helper function to check if the user is authenticated
function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem("user"));
  // Return true if a user object exists and has a role
  return user && user.role;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/user-dashboard" 
            element={
              isAuthenticated() ? <UserPage /> : <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/admin-dashboard" 
            element={
              isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" replace />
            } 
          />
         
        </Routes>
        
        {/* React Hot Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#374151',
              color: '#fff',
              border: '1px solid #4B5563',
            },
            success: {
              style: {
                background: '#065F46',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#7F1D1D',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;