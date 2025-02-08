import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../..';
import ApplicantCard from './ApplicantCard';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import ReactPaginateItems from '../../../commonComponents/ReactPaginate';
import NoRecords from '../../../commonComponents/NoRecords';
import ApplicantDetailCard from './ApplicantDetailCard';
import ApplicantLeftCard from './ApplicantLeftCard';
import moment from 'moment';
import {
  getFilterApplicant,
  clearGetFilterJobsSlice,
  setToggleFilter
} from '../../../../store/reducers/applicant/GetFilterApplicant';
import { changeApplicantStatus } from '../../../../store/reducers/applicant/applicantStatus';
import { toast } from 'react-toastify';
import Toaster from '../../../commonComponents/Toaster';
import { applicantShortListReject } from '../../../utils/utils';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const RecruiterInbox = () => {

  const dispatch = useAppDispatch();
  const { success,
    allApplicant,
    loading,
    filtersData,
    toggleFilter } = useAppSelector((state) => state.getFilterApplicant);

  const { jobId } = useParams();
  const [jobApplicantCard, setJobApplicantCard] = useState<any>([]);
  const [jobTitle, setJobTitle] = useState({ jobTitle: "", postedDate: "", applicantCount: "" });
  const [expand, setExpand] = useState<any>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [toggleDispatch, setToggleDispatch] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  let [categories, setCategories] = useState({
    UnReviewed: [],
    ShortListed: [],
    Rejected: [],
  });

  // using for pagination
  const itemsPerPage: number = 10;
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setJobTitle({ ...jobTitle, jobTitle: jobApplicantCard?.filter((jobItem: any) => jobItem?.jobs?.id === Number(jobId))[0]?.jobs?.title, postedDate: moment(jobApplicantCard?.filter((jobItem: any) => jobItem?.jobs?.id === Number(jobId))[0]?.jobs?.updatedAt, "YYYYMMDD").fromNow(), applicantCount: jobApplicantCard?.length })

  }, [jobApplicantCard, jobId]);

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

  useEffect(() => {
    let filtersCount = 0;
    if (filtersData?.expYear) {
      filtersCount += 1
    }
    if (filtersData?.department?.length) {
      filtersCount += filtersData?.department?.length
    }
    if (filtersData?.location?.length) {
      filtersCount += filtersData?.location?.length
    }
    if (filtersData?.workMode?.length) {
      filtersCount += filtersData?.workMode?.length
    }
    if (filtersData?.salary) {
      filtersCount += 1
    }
    if (filtersData?.companyType?.length) {
      filtersCount += filtersData?.companyType?.length
    }
    if (filtersData?.roleCategory?.length) {
      filtersCount += filtersData?.roleCategory?.length
    }
    if (filtersData?.keySkills?.length) {
      filtersCount += filtersData?.keySkills?.length
    }
    setFiltersCount(filtersCount);
  }, [filtersData]);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  useEffect(() => {
    if (toggleDispatch) {
      if (filtersData?.expYear !== null
        || (filtersData?.department !== undefined && filtersData?.department?.length !== 0)
        || (filtersData?.location !== undefined && filtersData?.location?.length !== 0)
        || (filtersData?.workMode !== undefined && filtersData?.workMode?.length !== 0)
        || filtersData?.salary !== null
        || (filtersData?.companyType !== undefined && filtersData?.companyType?.length !== 0)
        || (filtersData?.roleCategory !== undefined && filtersData?.roleCategory?.length !== 0)
        || (filtersData?.keySkills !== undefined && filtersData?.keySkills?.length !== 0)
      ) {
        dispatch(getFilterApplicant({ page, data: filtersData }));
        if (toggleFilter) {
          setPage(1);
          setJobApplicantCard([]);
          dispatch(setToggleFilter());
        }
      } else {
        dispatch(getFilterApplicant({ page, jobId }));
      }
    }
  }, [dispatch, page, filtersData, toggleDispatch, toggleFilter]);

  useEffect(() => {
    if (success) {

      if (allApplicant.length !== 0) {
        setJobApplicantCard(allApplicant);
      } else {
        setToggleDispatch(false);
      }
      dispatch(clearGetFilterJobsSlice());
    }
  }, [success]);

  useEffect(() => {
    if (jobApplicantCard) {
      setCategories((preValue: any) => {
        return {
          ...preValue,
          UnReviewed: applicantShortListReject(jobApplicantCard, ''),
          ShortListed: applicantShortListReject(jobApplicantCard, 'ShortListed'),
          Rejected: applicantShortListReject(jobApplicantCard, 'Reject'),
        }
      });
    }
  }, [jobApplicantCard]);

  const shortListReject = (status: string, userId: number) => {
    dispatch(changeApplicantStatus({
      applicantStatus: status,
      applicantStatusJobSeeker: userId,
      applicantId: userId,
      JobId: jobId
    })).then((res) => {
      toast.success("Applicant status changed successfully !!");
    })
  }
  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid  gap-10 px-32 bg-[#F8FAFC]">
        <div className="col-start-1 col-end-4">
          <ApplicantLeftCard setJobApplicantCard={setJobApplicantCard} setToggleDispatch={setToggleDispatch} setPage={setPage} filtersCount={filtersCount} />
        </div>
        <div className="col-start-4 mb-10 col-end-12">
          <div className="w-full h-auto justify-start items-center gap-5 py-10 inline-flex">
            <div className="w-10 h-10 bg-indigo-50 rounded-[60px] justify-center items-center flex">
              <img
                className="w-14 h-14 rounded-lg"
                src={jobApplicantCard[0]?.company?.companyImage ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${jobApplicantCard[0]?.company?.companyImage}`.replace(/"/g, '') as any : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`}
                alt="no img"
              />
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="text-black text-2xl font-bold leading-[28.80px] tracking-tight">{jobTitle?.jobTitle}</div>
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="border-b border-slate-600 justify-start items-center gap-2.5 flex">
                  <div className="text-slate-600 text-sm font-medium leading-[16.80px] tracking-tight">Job Description</div>
                </div>
                <div className="w-[17px] self-stretch origin-top-left rotate-90"></div>
                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">Posted {jobTitle?.postedDate}</div>
                <div className="w-[17px] self-stretch origin-top-left rotate-90 "></div>
                <div className="text-slate-500 text-sm font-normal leading-[16.80px] tracking-tight">{jobTitle?.applicantCount} Applicants</div>
              </div>
            </div>
          </div>

          <Tab.Group>
            <Tab.List className="flex">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames('w-full outline-none leading-10 font-bold border-b', selected ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-[#E0E7FF] text-[#64748B]')
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="w-full">
              {Object.values(categories).map((posts, idx) => {
                const currentItems = posts?.slice(itemOffset, endOffset);
                return (
                  <Tab.Panel key={idx}>
                    {currentItems !== undefined && currentItems?.length !== 0 ?
                      <>
                        {posts.map((data, index: number) =>
                          <div className="flex-col justify-start items-center gap-7 flex" key={index}>
                            {!expand.includes(Number(index) + 1) &&
                              <ApplicantCard
                                data={data}
                                index={index + 1}
                                setExpand={setExpand}
                                expand={expand}
                                shortListReject={shortListReject}
                              />}

                            {expand.includes(Number(index) + 1) &&
                              <ApplicantDetailCard
                                data={data}
                                index={index + 1}
                                setExpand={setExpand}
                                expand={expand}
                                shortListReject={shortListReject}
                              />}
                          </div>
                        )}
                        <ReactPaginateItems itemsPerPage={itemsPerPage} items={posts} itemOffset={itemOffset} setItemOffset={setItemOffset} />
                      </>
                      : <NoRecords />
                    }
                  </Tab.Panel>
                )
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default RecruiterInbox;