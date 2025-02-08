import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useAppDispatch } from "../..";
import { saveJobs } from "../../store/reducers/applyJobs/saveJob";
import Cookies from "js-cookie";
import { getCheckJobToSave } from "../utils/utils";

const ShortJobCard = ({ similarJob, onClickJobCard, setSaveJobCount, jobDetail }: any) => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(
    null
  );
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userId");
  const [saveSimilarJobCount, setSaveSimilarJobCount] = useState(false);

  const setButtonClick = (buttonClick: string, id: string) => {
    if (buttonClick === "Save") {
      setSaveSimilarJobCount(true);
      if (jobDetail?.id === id) {
        setSaveJobCount(true);
      }
      dispatch(
        saveJobs({
          jobSeekerProfile: userId && parseInt(userId),
          jobs: id && parseInt(id),
        })
      ).then((data: any) => {
        if (data?.payload?.count > 0) {
          toast.info("job already applied !!");
        } else {
          toast.success("job save successfully !!");
        }
      })
    }
  };

  useEffect(() => {
    getCheckJobToSave(Number(userId), Number(similarJob?.id)).then((count: any) => {
      if (count > 0) setSaveSimilarJobCount(true);
    });
  }, [similarJob]);

  useEffect(() => {
    const parsedDate = parseISO(similarJob?.createdAt);
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [similarJob]);

  return (
    <div className=" p-5 bg-white rounded-xl flex-col justify-start items-start inline-flex w-full border border-[#E0E7FF] cursor-pointer" onClick={() => onClickJobCard(similarJob.id)}>
      <div className="self-stretch  flex-col justify-start items-start gap-3 flex ">
        <div className="self-stretch  flex-col justify-start items-start gap-1 flex ">
          <div className="flex justify-between w-full ">
            <div
              className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight"
              
              key={similarJob?.id}>
              {similarJob?.title}
            </div>
            <button className='p-2' onClick={() => setButtonClick("Save", similarJob?.id)}>
              {saveSimilarJobCount ? (
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookIconColored.svg`} alt="BookMark Dark" />
              ) : (
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bookMark.svg`} alt="bookMark" />
              )}
            </button>

          </div>
          <div className="justify-start items-center gap-3 ">
            <span className="text-slate-500 text-sm font-normal leading-snug tracking-tight">
              {similarJob?.aboutCompany}
            </span>
          </div>
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-orange-600 text-sm font-normal  leading-none tracking-tight">
              {similarJob?.workMode?.title}
            </div>
          </div>
          <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
            <div className="text-green-600 text-sm font-normal  leading-none tracking-tight">
              {similarJob?.employmentType?.title}
            </div>
          </div>
          <div className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
            {lastUpdatedTimestamp !== null &&
              formatDistanceToNow(lastUpdatedTimestamp, {
                addSuffix: true,
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortJobCard;
