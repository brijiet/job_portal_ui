import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from "react-router-dom";
import TopCompaniesHiring from "../HomePage/TopCompaniesHiring";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../..";
import { clearGetFilterJobsSlice, getFilterJobs } from "../../../store/reducers/jobs/GetFilterJobs";
import JobListItem from "../../commonComponents/JobListItem";
import FeaturedCity from "../HomePage/FeaturedCity";
import { getAllCityJobsCount } from '../../utils/utils';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        slidesToSlide: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3.5,
        slidesToSlide: 3
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
        <div className="carousel-button-group mt-2 gap-2 flex justify-end 
        items-center w-full">
            <button className='block p-3 bg-[#818CF8] text-white rounded-l-md' onClick={() =>
                previous()}> <FiChevronLeft className='2xl:text-3xl' /></button>
            <button onClick={() => next()} className='block p-3 bg-[#818CF8] text-white rounded-r-md'><BiChevronRight className='2xl:text-3xl' /></button>
        </div>
    );
};

const LandingPage = () => {
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const { allJobs, success } = useAppSelector((state) => state.getFilterJobs);
    const [allCityJobsCount, setAllCityJobsCount] = useState<any>([]);

    useEffect(() => {
        dispatch(getFilterJobs({ page }));
        (async () => {
            const allCityJobsCount = await getAllCityJobsCount();
            if (Object.keys(allCityJobsCount)?.length) {
                setAllCityJobsCount(allCityJobsCount);
            }
        })();
    }, [page, dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(clearGetFilterJobsSlice());
        }
    }, [success, dispatch]);

    const onClickJobItem = (jobId: any) => {
        window.open(`/allJobs/jobDescription/${jobId}`, '_blank')
    }

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="h-[90%] bg-[#FFF] px-32 xl:px-32 2xl:px-40 grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-5xl xl:text-5xl 2xl:text-[55px] font-bold text-black flex flex-col items-start justify-start mb-3">
                        <span>Get a<span className="text-[#818CF8]"> perfect match </span>for</span><span>your skills in one click</span>
                    </h1>
                    <div className="text-base xl:text-base 2xl:text-lg text-[#312E81] mb-16">
                        Just upload your resume and apply for your dream job
                    </div>
                    <div className="flex space-x-6 items-center z-10 text-base xl:text-base 2xl:text-lg">
                        <Link to="/allJobs"><button className="bg-[#4F46E5] rounded-md py-2 text-white w-44 flex items-center justify-center"><span className="mr-3">Explore</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}searchIcon.svg`} alt="SearchIcon" /></button></Link>
                        <button className="bg-[#EEF2FF] rounded-md py-2 w-44 flex items-center justify-center"><span className="mr-3"><Link to="/registration" className="rounded-lg bg-[#EEF2FF] py-2 px-3">Create profile</Link></span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}createProfile.svg`} alt="CreateProfile" /></button>
                    </div>
                </div>
                <div className="relative">
                    <span className="absolute top-36 2xl:top-40 left-44 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}rightwithcircle.svg`} alt="RightWithCircle" /><span className="ml-2">94% Skills Matched</span></span>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Ellipse 28.svg`} alt="Ellipse28" className="absolute top-20 right-10 2xl:w-44" />
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Ellipse 29.svg`} alt="Ellipse29" className="absolute top-1/4 left-20 2xl:w-48" />
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Ellipse 27.svg`} alt="Ellipse27" className="absolute top-1/2 left-1/2 2xl:w-48" />
                    <span className="absolute top-2/3 left-48 2xl:left-52 border border-gray-300 bg-[#F8FAFC] rounded-3xl px-5 py-2 z-10 flex justify-center items-center"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}notificationIcon.svg`} alt="NotificationIcon" /><span className="ml-2">Job alert</span></span>
                </div>
            </div>
            {allJobs?.length > 0 && <div className="h-[80%] bg-[#F8FAFC] px-32 xl-32 2xl:px-40 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-10 font-bold">
                    <h1 className="text-xl xl:text-xl 2xl:text-3xl">Most demanding categories</h1>
                    <Link to="/allJobs" className="text-base xl:text-base 2xl:text-xl flex justify-center items-center text-[#312E81]">
                        <span className="mr-2">All categories</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" />
                    </Link>
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
                    transitionDuration={8000}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    {allJobs?.slice(0, 8)?.map((job: any, index: number) => index <= 8 &&
                        <JobListItem
                            jobItem={job}
                            onClickJobItem={onClickJobItem}
                            key={index}

                        />)}
                </Carousel>
            </div>}
            <div className="bg-[#FFF] px-32 xl:px-32 2xl:px-40 py-10 flex justify-center items-center flex-col">
                <span className="text-xs 2xl:text-base mb-2 text-[#4F46E5]">Job application process</span>
                <h1 className="text-3xl 2xl:text-4xl font-bold mb-16">How it works</h1>
                <div className="grid grid-cols-3 gap-20 mb-16 2xl:text-xl">
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}CreateContactIcons.svg`} className=" 2xl:w-8" alt="CreateContactIcons" />
                        </span>
                        <h1 className="font-bold text-xl 2xl:text-2xl mb-3">Create an account</h1>
                        <p className="text-center xl:text-sm 2xl:text-sm">Explore and configure optional features, such as notification preferences, job preferences (for a job portal), or other platform-specific settings. Once completed, you should receive a confirmation message welcoming you to the platform.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}CompletedContactIcons.svg`} className=" 2xl:w-8" alt="CompletedContactIcons" />
                        </span>
                        <h1 className="font-bold text-xl 2xl:text-2xl mb-3">Complete your profile</h1>
                        <p className="text-center xl:text-sm 2xl:text-sm">Complete your profile by adding your basic information, education, and work experience. upload your resume or CV to expedite the job application process. Customize your job preferences, such as preferred industry, job type, and location.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="bg-[#EEF2FF] rounded-full p-2 mb-3">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}applyJobs.svg`} className=" 2xl:w-8" alt="ApplyJobs" />
                        </span>
                        <h1 className="font-bold text-xl 2xl:text-2xl mb-3">Apply / Post a job</h1>
                        <p className="text-center xl:text-sm 2xl:text-sm">Your one-stop destination for job seekers and employers. Discover exciting career opportunities or find the perfect candidate for your team. We bridge the gap between talent and companies, making the hiring process seamless.</p>
                    </div>
                </div>
                <div className=" flex justify-between items-end bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] w-full px-20 py-28 rounded-lg">
                    <div>
                        <span className="text-[#4F46E5] text-xs xl:text-xs 2xl:text-base">OVER 1400 JOB OPENINGS</span>
                        <h1 className="text-4xl xl:text-4xl 2xl:text-5xl text-[#312E81] font-bold">
                            <span>Create your profile and get</span><br />
                            <span> <span className="text-[#818CF8]">personalized</span> recommendations</span>
                        </h1>
                    </div>
                    <button className="bg-[#4F46E5] rounded-md py-2 xl:py-2 2xl:py-4 w-44 xl:w-44 2xl:w-56 flex items-center justify-center text-white 2xl:text-xl xl:text-base"><span className="mr-3">Create profile</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}createProfile1.svg`} className="2xl:w-6" alt="CreateProfile" /></button>
                </div>
            </div>
            <div className="h-[65%] bg-[#F1F5F9] px-32 xl:px-32 2xl:px-40 flex flex-col justify-center">
                <TopCompaniesHiring title="Top companies hiring" viewLabel="View all" />
            </div>
            {Number(allCityJobsCount?.[0]?.jobCount) !== 0 && <div className="h-[65%] bg-[#F8FAFC] px-32 xl:px-32 2xl:px-40 flex flex-col justify-center">
                <FeaturedCity allCityJobsCount={allCityJobsCount} />
            </div>}
        </>
    )
}

export default LandingPage;