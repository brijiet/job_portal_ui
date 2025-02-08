import { Link } from "react-router-dom";
import ShortJobCard from "../../commonComponents/ShortJobCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../..";
import { getFilterJobs } from "../../../store/reducers/jobs/GetFilterJobs";
const SimilarJobs = ({ keySkillParams, setSaveJobCount, jobDetail }: any) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [similarJobs, setSimilarJobs] = useState([]);
  const { success, allJobs }: any = useAppSelector(
    (state) => state.getFilterJobs
  );
  const onClickJobCard = (jobId: any) => {
    window.open(`/allJobs/jobDescription/${jobId}`, "_blank");
  };

  useEffect(() => {
    if (allJobs) {
      setSimilarJobs(allJobs.filter((item: any) => item?.id !== jobDetail?.id));
    }
  }, [allJobs, success]);
  useEffect(() => {
    dispatch(getFilterJobs({ page, data: keySkillParams }));
  }, [keySkillParams, page]);
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5">
        <span className="font-bold text-xl">Similar Jobs</span>
        <Link to="/allJobs" className="flex justify-center items-center">
          <div className="flex flex-row items-center">
            <span className="flex justify-center items-center text-lg font text-indigo-900 text-center mr-1">
              All Jobs
            </span>
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`}
              alt="rightArrow"
              width="w-full"
              className="text-indigo-900"
            />
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <>
          {similarJobs?.length !== 0 &&
            similarJobs.map((similarJob, index) => {
              return (
                <ShortJobCard
                  key={index}
                  similarJob={similarJob}
                  onClickJobCard={onClickJobCard}
                  setSaveJobCount={setSaveJobCount}
                  jobDetail={jobDetail}
                />
              );
            })}
        </>
      </div>
    </>
  );
};
export default SimilarJobs;
