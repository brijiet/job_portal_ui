import { Link, useNavigate } from 'react-router-dom';
import { setLocation, setSearchLocation, setFilterLocation } from '../../../store/reducers/jobs/GetFilterJobs';
import { useAppDispatch, useAppSelector } from '../../..';
import { useEffect } from 'react';
import { getLocationList } from '../../utils/utils';

const FeaturedCity = ({ allCityJobsCount }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.getFilterJobs);

  useEffect(() => {
    (async () => {
        const locationList = await getLocationList();
        if (Object.keys(locationList)?.length) {
            dispatch(setLocation(locationList))
        }
    })();
}, []);

  const handleCityJobs = (id:number) => {
    navigate("/allJobs");
    dispatch(setLocation(
      location?.map((item: any) =>
        item?.id === id ? { ...item, isChecked: true } : item
      )
    ));
    dispatch(setSearchLocation(false));
    dispatch(setFilterLocation(id));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-10 font-bold">
        <h1 className="text-xl xl:text-xl 2xl:text-2xl">Featured cities</h1>
        <Link to="/allJobs" className="text-base xl:text-base 2xl:text-lg flex justify-center items-center text-[#312E81]"><span className="mr-2">All Cities</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" /></Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {allCityJobsCount?.slice(0, 6)?.map((item: any) => (
         item?.jobsCount !== 0 && 
          <div className="p-4 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg flex flex-col justify-center items-start cursor-pointer" onClick={() => handleCityJobs(Number(item?.id))}>
            <div className="flex justify-between items-center mb-3 text-sm xl:text-sm 2xl:text-lg font-semibold w-full">
              <span>
                <span>{item?.title}, India </span>
              </span>
              <button><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" width="8rem" height="8rem" /></button>
            </div>
            <button className="px-2 py-1 bg-gray-200 rounded-md text-xs xl:text-sm 2xl:text-base">
              {item?.jobsCount} jobs
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCity;