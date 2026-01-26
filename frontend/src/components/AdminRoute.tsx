import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    // Check if user is logged in and is admin
    // In a real app, you'd decode the JWT to check expiration etc.
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Simple check: if user exists and has a token (and is admin if you verify role)
    // Here we assume if 'user' object exists in localStorage, they are logged in.
    // Ideally verify role === 'admin'
    const isAdmin = user && user.role === 'admin';

    // For demo purposes, if just 'user' exists let them in, but in prod check role
    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
