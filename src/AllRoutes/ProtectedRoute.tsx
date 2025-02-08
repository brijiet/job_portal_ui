import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const user_token = Cookies.get('token');
    const user_type = Cookies.get('userType');

    const seekerArr = [
        "/homePage",
        "/profile",
        "/inbox",
        "/settings",
        "/mail/sendReply",
        "/mail/applyConfirmation"
    ]

    const employerArr = [
        "/employerDashboard",
        "/recruiterJobList",
        "/postJob/jobDetails",
        "/applicantDetail",
        "/postJob/requirements",
        "/postJob/company",
        "/postJob/recruiter",
        "/postJob/questionnaire",
        "/postJob/response",
        "/postJob/preview",
        "/recruiterInbox",
        "/inbox",
        "/cvZone/mailCenter",
        "/cvZone/searchResumes",
        "/cvZone/emailTemplates",
        "/cvZone/searchResumeResult",
        "/cvZone/searchResumeResult/keySkills",

    ]

    const location = useLocation();

    return (user_token !== undefined && user_token !== null)
        ? (user_type === "jobSeeker" && seekerArr.some(a => location.pathname.includes(a))
            ? <Outlet />
            : (user_type === "employer" && employerArr.some(a => location.pathname.includes(a))) ? <Outlet /> : <Navigate to="/" />)
        : <Navigate to="/" />
}

export default ProtectedRoute;