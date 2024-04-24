import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';

function ProtectedRoutes() {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    
    const AdminProtectedRoute = ({ children }) => {
        if (!currentUser || currentUser.userType !== "admin") {
          return <Navigate to="/sign-in" replace state={{prevUrl : location.pathname}}/>;
        } else {
          return children;
        }
    };

  return (
    <div>
        <Routes>
            <Route path="/admin/*" element={ <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute> } />
        </Routes>
    </div>
  )
}

export default ProtectedRoutes