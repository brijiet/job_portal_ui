import Carousel from "react-multi-carousel";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import RecentJobItems from "./RecentJobItems";
import NoRecords from "../../../commonComponents/NoRecords";

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

const RecentJobPosts = ({ companyDetails }: any) => {
    let items = [{}, {}, {}, {}, {}, {}]
    return (
        <div>
            <div className="flex justify-between items-center mb-10 font-bold">
                <h1 className="text-xl">Recent Job Posts</h1>
                <Link to="/recruiterJobList" className="text-base flex justify-center items-center text-[#312E81]"><span className="mr-2">All Jobs</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" /></Link>
            </div>
            {companyDetails && companyDetails?.[0]?.jobs?.length ?
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="all .5s ease-in-out"
                    transitionDuration={500}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    {companyDetails?.[0]?.jobs && companyDetails?.[0]?.jobs?.map((item: any) =>
                        <RecentJobItems key={item?.id} item={item} />
                    )}
                </Carousel>
                : <NoRecords height="auto" />
            }
        </div>
    )
}

export default RecentJobPosts