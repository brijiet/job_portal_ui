import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../';
import JobCard from '../JobCard';
import SaveJobCard from './SaveJobCard';

const SaveJob = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.getFilterJobs);

  const [jobCard, setJobCard] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickJobCard = (jobId: any) => {
    window.open(`/allJobs/jobDescription/${jobId}`, '_blank');
  }

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-5">
          <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
            <div className="justify-between items-center bg-slate-100 p-2">
              <SaveJobCard onClickJobCard={onClickJobCard} jobCard={jobCard} loading={loading} />
            </div>
          </div>
        </div>
        <div className="col-start-5 col-end-13">
          <JobCard onClickJobCard={onClickJobCard} jobCard={jobCard} loading={loading} />
        </div>

      </div >
    </>
  )
}

export default SaveJob;