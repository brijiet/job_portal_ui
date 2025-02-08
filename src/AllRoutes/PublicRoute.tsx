import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const user_token = Cookies.get('token');
    const userType = Cookies.get("userType");

    return (user_token !== undefined && user_token !== null)
        ? ((userType === "jobSeeker" || userType === undefined) ? <Navigate to="/homePage" /> : <Navigate to="/employerDashboard" />)
        : <Outlet />
}

export default PublicRoute;