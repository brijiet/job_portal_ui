import React, { useEffect } from 'react';
import { clearGetJobTitleSlice, jobTitleGet } from '../../../store/reducers/dropdown/jobTitle';
import { useAppDispatch, useAppSelector } from '../../..';
import CategoryItem from '../../commonComponents/CategoryItem';

const MostDemandingCategory = () => {
  const dispatch = useAppDispatch();
  const { success, jobTitle } = useAppSelector((state) => state.getJobTitle);

  useEffect(() => {
    dispatch(jobTitleGet());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearGetJobTitleSlice());
    }
  }, [dispatch, success]);

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-10 font-bold">
          <h1 className="text-xl 2xl:text-2xl">Most demanding categories</h1>
          <button className="flex justify-center items-center text-[#312E81] text-base 2xl:text-lg"><span className="mr-2">All Categories</span><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" /></button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {jobTitle?.slice(0, 3)?.map(item => <CategoryItem item={item} count={12} />)}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {jobTitle?.slice(3, 7)?.map(item => <CategoryItem item={item} count={12} />)}
        </div>
      </div>
    </>
  )
}

export default MostDemandingCategory