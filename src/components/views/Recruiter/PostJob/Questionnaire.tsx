import { useEffect, useState } from 'react'
import JobLeftPanel from './JobLeftPanel'
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import Cookies from 'js-cookie';
import QuestionnaireForm from './QuestionnaireForm';


const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>([]);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [jobTitle, setJobTitle] = useState('');
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);


  useEffect(() => {
    if (Number(postId)) {
      dispatch(getJobDetail(postId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

  useEffect(() => {
    (async () => {
      const companyList = await getCompanyList()
      if (Object.keys(companyList)?.length) {
        setCompany(companyList as any)
      }
    })();


  }, []);
  useEffect(() => {
    dispatch(getAllCompanies({} as any));
  }, [dispatch])

  useEffect(() => {
    setCompany(allCompanies as any)
  }, [success])

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])

  useEffect(() => {
    if (Number(postId)) {
      setJobTitle(jobDetail?.title);
    } else {
      setJobTitle(jobDetailData?.title);
    }
  }, []);

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel jobTitle={jobTitle} status={jobDetail?.jobStatus} />
          </div>
          <div className="col-start-4 col-end-11">
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">

              <QuestionnaireForm />

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Questionnaire