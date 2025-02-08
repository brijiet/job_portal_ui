import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../../../..';
import Banner from './Banner';
import JobChart from './JobChart';
import LeftSection from './LeftSection';
import RecentJobPosts from './RecentJobPosts';
import TopApplicants from './TopApplicants';
import TotalJobs from './TotalJobs';
import { useEffect } from 'react';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';
import { getApplicants }  from '../../../../store/reducers/user/getApplicants';

const EmployerDashboard = () => {
  const dispatch = useAppDispatch();
  const { success, companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
  const { applicantsData } = useAppSelector((state) => state.getApplicants);

  const userId = Cookies.get('userId');

  useEffect(() => {
    dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
    dispatch(getApplicants());
  }, [dispatch]);

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-7 gap-12 px-32 bg-[#F8FAFC] py-6">
        <LeftSection />
        <div className="col-start-3 col-end-8">
          <Banner />
          <RecentJobPosts companyDetails={companyDetails} />
          <TotalJobs companyDetails={companyDetails} />
          <TopApplicants applicants={applicantsData} />          
          <JobChart companyDetails={companyDetails} />
        </div>
      </div >
    </>
  )
}

export default EmployerDashboard