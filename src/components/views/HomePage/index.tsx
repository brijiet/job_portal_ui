import "react-multi-carousel/lib/styles.css";
import ProfileLeftSection from "./ProfileLeftSection";
import { useAppDispatch, useAppSelector } from "../../..";
import { useEffect, useState } from "react";
import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import MostDemandingCategory from "./MostDemandingCategory";
import JobRecommendations from "./JobRecommendations";
import TopCompaniesHiring from "./TopCompaniesHiring";
import FeaturedCity from "./FeaturedCity";
import ProfileBanner from "./ProfileBanner";
import { getAllCityJobsCount, getCheckJobToSave } from '../../utils/utils';
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {

  const dispatch = useAppDispatch();
  const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const [allCityJobsCount, setAllCityJobsCount] = useState<any>([]);

  useEffect(() => {
    dispatch(profileDashboardGet());
    (async () => {
      const allCityJobsCount = await getAllCityJobsCount();
      if (Object.keys(allCityJobsCount)?.length) {
        setAllCityJobsCount(allCityJobsCount);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetProfileDashboardSlice());
    }
  }, [dispatch, success]);

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-7 gap-12 px-32 bg-[#F8FAFC] py-6">
        <ProfileLeftSection profileDashboard={profileDashboard} />
        <div className="col-start-3 col-end-8">
          <ProfileBanner />
          <JobRecommendations />
          <hr className="my-10" />
          <MostDemandingCategory />
          <hr className="my-10" />
          <TopCompaniesHiring title="Top companies hiring" viewLabel="View all" />
          <hr className="my-10" />
          {Number(allCityJobsCount?.[0]?.jobCount) !== 0 && <FeaturedCity allCityJobsCount={allCityJobsCount} />}
        </div>
      </div >
      <ToastContainer />
    </>
  )
}

export default HomePage;