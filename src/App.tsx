import { useEffect } from 'react';
import AllRoutes from './AllRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useLocation } from 'react-router';
import { scrollToTop } from './components/utils/utils';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  const forgotPasswordPath = location?.pathname?.split('/')[1];
  const loginPath = location?.pathname?.split('/')[1];
  const registrationPath = location?.pathname?.split('/')[1];

  return (
    <div className="h-screen">
      {(registrationPath !== "registration" && loginPath !== "login") && (location?.pathname !== "/emailAlreadyVerified") && (location?.pathname !== "/emailSuccess") && (forgotPasswordPath !== "forgotPassword") && <Header />}
      <AllRoutes />
      {(registrationPath !== "registration" && loginPath !== "login") && (location?.pathname !== "/emailAlreadyVerified") && (location?.pathname !== "/emailSuccess") && (forgotPasswordPath !== "forgotPassword") && (location?.pathname !== "/allCompanies") && (location?.pathname !== "/allJobs") && <Footer />}
    </div>
  );
}

export default App;
