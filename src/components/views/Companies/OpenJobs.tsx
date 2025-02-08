import { Link } from "react-router-dom";
import ShortOpenJobCard from "./ShortOpenJobCard";
const OpenJobs = ({  setSaveJobCount, companyDetail }: any) => {
    const onClickJobCard = (jobId: any) => {
        window.open(`/allJobs/jobDescription/${jobId}`, "_blank");
      };
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5">
      <span className="font-bold text-xl">Open positions</span>
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
          {companyDetail?.jobs?.length !== 0 ?
            companyDetail?.jobs?.map((openJob:any) => {
              return (
                <ShortOpenJobCard
                  openJob={openJob}
                  onClickJobCard={onClickJobCard}
                  setSaveJobCount={setSaveJobCount}
                  jobDetail={companyDetail?.jobs}
                />
              );
            })
          :   
          <div className="p-5 bg-white rounded-xl w-full border border-[#E0E7FF] h-60 flex justify-center items-center">
            <span className="text-xl">Open positions are not available.</span>
          </div>
          }
        </>
      </div>
    </>
  );
};
export default OpenJobs;
