import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import JobListItem from '../../commonComponents/JobListItem';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../..';
import { clearGetFilterJobsSlice, getFilterJobs } from '../../../store/reducers/jobs/GetFilterJobs';
import { saveJobs } from "../../../store/reducers/applyJobs/saveJob";
import { getCheckJobToSave } from '../../utils/utils';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group gap-2 flex justify-end 
        items-center w-full">
      <button className='block p-3 bg-[#818CF8] text-white rounded-l-md' onClick={() =>
        previous()}> <FiChevronLeft /></button>
      <button onClick={() => next()}><span className='block p-3 bg-[#818CF8] text-white rounded-r-md' ><BiChevronRight /></span></button>
    </div>
  );
};
const JobRecommendations = () => {

  const [page, setPage] = useState(1);
  const userId = Cookies.get("userId");
  const dispatch = useAppDispatch();
  const { allJobs, success } = useAppSelector((state) => state.getFilterJobs);
  const [jobId, setJobId] = useState<any>(null);
  const [saveButton, setSaveButton] = useState<string>('');
  const [saveJobCount, setSaveJobCount] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(getFilterJobs({ page }));
  }, [page, dispatch]);

  const onClickJobItem = (jobId: any) => {
    window.open(`/allJobs/jobDescription/${jobId}`, '_blank')
  }

  useEffect(() => {
    if (success) {
      dispatch(clearGetFilterJobsSlice());
    }
  }, [success, dispatch]);

  useEffect(() => {
    allJobs?.slice(0, 8).map((job, index) => {
      getCheckJobToSave(Number(userId), Number(job?.id)).then((count: any) => {
        if (count > 0) {
          setSaveJobCount((prevSavedJobs) => ({
            ...prevSavedJobs,
            [job?.id]: true,
          }));
        } else {
          setSaveJobCount((prevSavedJobs) => ({
            ...prevSavedJobs,
            [job?.id]: false,
          }));
        }
      });
    })
  }, [allJobs, userId]);

  useEffect(() => {
    if (saveButton === 'save') {
      setSaveJobCount((prevSavedJobs) => ({
        ...prevSavedJobs,
        [jobId]: true,
      }));
      dispatch(
        saveJobs({
          jobSeekerProfile: userId && parseInt(userId),
          jobs: jobId && parseInt(jobId),
        })
      ).then((data: any) => {
        if (data?.payload?.count > 0) {
          toast.info("job already saved !!");
        } else {
          toast.success("job save successfully !!");
        }
      })
    }
  }, [userId, jobId, saveButton])

  return (
    <div>
      {allJobs?.length > 0 && <div>
        <div className="flex justify-between items-center mb-10 font-bold">
          <h1 className="text-xl 2xl:text-2xl">Job recommendations</h1>
          <Link to="/allJobs" className="text-base 2xl:text-lg flex justify-center items-center text-[#312E81]"><span className="mr-2">All Jobs</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" /></Link>
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all 2.5s ease-in-out"
          // transitionDuration={8000}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
        >
          {allJobs?.slice(0, 8).map((job, index) => index <= 7 &&
            <JobListItem
              jobItem={job}
              onClickJobItem={onClickJobItem}
              saveJobCount={saveJobCount}
              setJobId={setJobId}
              setSaveButton={setSaveButton}
              key={index}
            />
          )}
        </Carousel>
      </div>}
    </div>
  )
}

export default JobRecommendations