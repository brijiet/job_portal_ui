import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../..';
import SaveJobCard from './SaveJobCard';
import Cookies from 'js-cookie';
import { getApplyJobList, getSaveJobList } from '../../../utils/utils';
import JobDetailCard from './JobDetailCard';

const Inbox = () => {
  const { loading } = useAppSelector((state) => state.getFilterJobs);
  const [jobCard, setJobCard] = useState<any>([]);
  const [jobApplyCard, setJobApplyCard] = useState<any>([]);
  const [jobId, setJobId] = useState();
  const [inbox, setInbox] = useState("Apply");
  const userId = Cookies.get('userId');
  const [deleteSave, setDeleteSave] = useState(false);
  const [applyJob, setApplyJob] = useState(false);

  useEffect(() => {
    if (userId) {
      getSaveJobList(Number(userId)).then((data) => {
        setJobCard(data)
      })
    }
  }, [userId, deleteSave])

  useEffect(() => {
    if (userId) {
      getApplyJobList(Number(userId)).then((data) => {
        setJobApplyCard(data)
      })
    }
  }, [userId, applyJob])

  var ids: undefined;
  useEffect(() => {
    if (inbox === 'Apply') {
      jobApplyCard.map((item: any, index: number) => {
        if (index === 0) {
          ids = item?.jobs.id
        }
      })
    }
    if (inbox === 'Save') {
      jobCard.map((item: any, index: number) => {
        if (index === 0) {
          ids = item?.jobs.id
        }
      })
    }

    if (ids) {
      setJobId(ids)
    }
  }, [ids, jobApplyCard, inbox, jobCard])

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-5">
          <div className="sticky">
            <div className="justify-between items-center  p-2">
              <SaveJobCard setInbox={setInbox} jobId={jobId} setJobId={setJobId} jobApplyCard={jobApplyCard} jobCard={jobCard} loading={loading} />
            </div>
          </div>
        </div>
        <div className="col-start-5 col-end-13">
          <JobDetailCard setApplyJob={setApplyJob} setDeleteSave={setDeleteSave} inbox={inbox} jobId={jobId} setJobId={setJobId} jobCard={jobCard} loading={loading} />
        </div>

      </div >
    </>
  )
}

export default Inbox;