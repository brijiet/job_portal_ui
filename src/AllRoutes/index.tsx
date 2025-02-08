import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/views/LandingPage";
import SignUp from "../components/views/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../components/views/HomePage";
import Profile from "../components/views/Profile/Profile";
import AllJobs from "../components/views/Jobs/AllJobs";
import JobDescription from "../components/views/Jobs/JobDescription";
import AllCompanies from "../components/views/Companies/AllCompanies";
import CompanyDescription from "../components/views/Companies/CompanyDescription";
import JobDetails from "../components/views/Recruiter/PostJob/JobDetails";
import Requirements from "../components/views/Recruiter/PostJob/Requirements";
import Company from "../components/views/Recruiter/PostJob/Company";
import Recruiter from "../components/views/Recruiter/PostJob/Recruiter";
import Response from "../components/views/Recruiter/PostJob/Response";
import NoMatch from "../components/views/NoMatch";
import Preview from "../components/views/Recruiter/PostJob/preview";
import EmployerDashboard from "../components/views/Recruiter/Dashboard/EmployerDashboard";
import RecruiterJobList from "../components/views/Recruiter/Jobs/RecruiterJobList";
import Questionnaire from "../components/views/Recruiter/PostJob/Questionnaire";
import SignIn from "../components/views/SignIn";
import EmailSuccessPage from "../components/views/EmailSuccessPage";
import EmailAlreadyVerifiedPage from "../components/views/EmailAlreadyVerified";
import Inbox from "../components/views/Jobs/SaveJobs/Inbox";
import RecruiterInbox from "../components/views/Recruiter/Inbox/RecruiterInbox";
import MailCenter from "../components/views/Recruiter/MailCenter/MailCenter";
import SearchResumes from "../components/views/Recruiter/SearchResumes/SearchResumes";
import MailTemplate from "../components/views/Recruiter/MailTemplate/MailTemplateList";
import SendReply from "../components/views/Jobs/ApplyJobs/SendReply";
import ApplyConfirmation from "../components/views/Jobs/ApplyJobs/ApplyConfirmation";
import SearchResumeResult from "../components/views/Recruiter/SearchResumes/SearchResumeResult";
import ApplicantDetailsPage from "../components/views/Recruiter/Inbox/ApplicantDetailsPage";
import ForgotPassword from "../components/views/SignIn/ForgotPassword";
import Messaging from "../components/views/Messaging/Messaging";
import Settings from "../components/views/Settings/Settings";
import TermsOfServices from "../components/views/staticPage/TermsOfServices";
import PrivacyPolicy from "../components/views/staticPage/PrivacyPolicy";
import Services from "../components/views/staticPage/Services";
import About from "../components/views/staticPage/About";

// const LandingPage = React.lazy(() => import('../components/views/LandingPage'));
// const SignUp = React.lazy(() => import('../components/views/SignUp'));
// const ProtectedRoute = React.lazy(() => import('./ProtectedRoute'));
// const PublicRoute = React.lazy(() => import('./PublicRoute'));
// const HomePage = React.lazy(() => import('../components/views/HomePage'));
// const Profile = React.lazy(() => import('../components/views/Profile/Profile'));
// const AllJobs = React.lazy(() => import('../components/views/Jobs/AllJobs'));
// const JobDescription = React.lazy(() => import('../components/views/Jobs/JobDescription'));
// const AllCompanies = React.lazy(() => import('../components/views/Companies/AllCompanies'));
// const CompanyDescription = React.lazy(() => import('../components/views/Companies/CompanyDescription'));
// const JobDetails = React.lazy(() => import('../components/views/Recruiter/PostJob/JobDetails'));
// const Requirements = React.lazy(() => import('../components/views/Recruiter/PostJob/Requirements'));
// const Company = React.lazy(() => import('../components/views/Recruiter/PostJob/Company'));
// const Recruiter = React.lazy(() => import('../components/views/Recruiter/PostJob/Recruiter'));
// const Response = React.lazy(() => import('../components/views/Recruiter/PostJob/Response'));
// const NoMatch = React.lazy(() => import('../components/views/NoMatch'));
// const Preview = React.lazy(() => import('../components/views/Recruiter/PostJob/preview'));
// const EmployerDashboard = React.lazy(() => import('../components/views/Recruiter/Dashboard/EmployerDashboard'));
// const RecruiterJobList = React.lazy(() => import('../components/views/Recruiter/Jobs/RecruiterJobList'));
// const Questionnaire = React.lazy(() => import('../components/views/Recruiter/PostJob/Questionnaire'));
// const SignIn = React.lazy(() => import('../components/views/SignIn'));
// const EmailSuccessPage = React.lazy(() => import('../components/views/EmailSuccessPage'));
// const EmailAlreadyVerifiedPage = React.lazy(() => import('../components/views/EmailAlreadyVerified'));
// const Inbox = React.lazy(() => import('../components/views/Jobs/SaveJobs/Inbox'));
// const RecruiterInbox = React.lazy(() => import('../components/views/Recruiter/Inbox/RecruiterInbox'));
// const MailCenter = React.lazy(() => import('../components/views/Recruiter/MailCenter/MailCenter'));
// const SearchResumes = React.lazy(() => import('../components/views/Recruiter/SearchResumes/SearchResumes'));
// const MailTemplate = React.lazy(() => import('../components/views/Recruiter/MailTemplate/MailTemplateList'));
// const SendReply = React.lazy(() => import('../components/views/Jobs/ApplyJobs/SendReply'));
// const ApplyConfirmation = React.lazy(() => import('../components/views/Jobs/ApplyJobs/ApplyConfirmation'));
// const SearchResumeResult = React.lazy(() => import('../components/views/Recruiter/SearchResumes/SearchResumeResult'));
// const ApplicantDetailsPage = React.lazy(() => import('../components/views/Recruiter/Inbox/ApplicantDetailsPage'));
// const ForgotPassword = React.lazy(() => import('../components/views/SignIn/ForgotPassword'));
// const Messaging = React.lazy(() => import('../components/views/Messaging/Messaging'));
// const Setting = React.lazy(() => import('../components/views/Setting/Setting'));
// const TermsOfServices = React.lazy(() => import('../components/views/staticPage/TermsOfServices'));
// const PrivacyPolicy = React.lazy(() => import('../components/views/staticPage/PrivacyPolicy'));
// const Services = React.lazy(() => import('../components/views/staticPage/Services'));
// const About = React.lazy(() => import('../components/views/staticPage/About'));

const AllRoutes = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration?/:url?" element={<SignUp />} />
          <Route path="/login?/:url?" element={<SignIn />} />
          <Route path="/emailSuccess" element={<EmailSuccessPage />} />
          <Route path="/emailAlreadyVerified" element={<EmailAlreadyVerifiedPage />} />
          <Route path="/forgotPassword?/:url?" element={<ForgotPassword />} />
        </Route>
        <Route path="/allJobs" element={<AllJobs />} />
        <Route path="/allCompanies" element={<AllCompanies />} />
        <Route path="/allJobs/jobDescription/:id" element={<JobDescription />} />
        <Route
          path="/allCompanies/companyDescription/:id"
          element={<CompanyDescription />}
        />
        <Route path="/termsOfServices" element={<TermsOfServices />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/employerDashboard" element={<EmployerDashboard />} />
          <Route path="/recruiterJobList" element={<RecruiterJobList />} />
          <Route path="/recruiterInbox/:jobId" element={<RecruiterInbox />} />
          <Route path="/recruiterInbox/applicantDetailsPage/:applicantId" element={<ApplicantDetailsPage />} />
          <Route path="/cvZone">
            <Route path="mailCenter" element={<MailCenter />} />
            <Route path="searchResumes" element={<SearchResumes />} />
            <Route path="emailTemplates" element={<MailTemplate />} />
            <Route path="searchResumeResult" element={<SearchResumeResult />} >
              <Route path="keySkills/:id" element={<SearchResumeResult />}></Route>
            </Route>
          </Route>
          <Route path="/inbox" element={<Messaging />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/postJob">
            <Route path="jobDetails?/:postId" element={<JobDetails />} />
            <Route path="requirements/:postId?" element={<Requirements />} />
            <Route path="company/:postId?" element={<Company />} />
            <Route path="recruiter/:postId?" element={<Recruiter />} />
            <Route path="questionnaire/:postId?" element={<Questionnaire />} />
            <Route path="response/:postId?" element={<Response />} />
            <Route path="preview/:postId?" element={<Preview />} />
          </Route>
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/mail">
            <Route path="sendReply?/:uId" element={<SendReply />} />
            <Route
              path="applyConfirmation?/:uId"
              element={<ApplyConfirmation />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    // </Suspense>
  );
};

export default AllRoutes;
