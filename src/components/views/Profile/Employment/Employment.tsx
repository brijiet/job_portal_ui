import { useEffect, useState } from 'react'
import Modal from '../../../commonComponents/Modal';
import { useAppDispatch, useAppSelector } from '../../../..';
import { profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { FiEdit2 } from 'react-icons/fi';
import EmploymentForm from './EmploymentForm';
import { clearJobSeekerEmploymentAddSlice } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEmploymentAdd';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { getJoiningDateMonthList, getJoiningDateYearList } from '../../../utils/utils';
import { filterArray } from '../../../utils/filterArray';

export default function Employment() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployment, setSelectedEmployment] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [joiningDateYear, setJoiningDateYear] = useState<any>([]);
  const [joiningDateMonth, setJoiningDateMonth] = useState<any>([]);

  const { success } = useAppSelector((state) => state.employment);
  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard) as any;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      setIsOpen(false);
      dispatch(clearJobSeekerEmploymentAddSlice());
      dispatch(profileDashboardGet());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
  }, [success, dispatch]);

  const openModal = () => {
    setIsOpen(true);
    setSelectedEmployment({} as any)
    setIsEdit(false)
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const joiningDateYearList = await getJoiningDateYearList()
      if (Object.keys(joiningDateYearList).length) {
        setJoiningDateYear(joiningDateYearList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const joiningDateMonthList = await getJoiningDateMonthList()
      if (Object.keys(joiningDateMonthList).length) {
        setJoiningDateMonth(joiningDateMonthList as any)
      }
    })();
  }, [])

  return (
    <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
      <div className="flex items-center justify-between mb-4 font-bold">
        <h1>Employment</h1>
        <h1 className="text-blue-600 font-medium cursor-pointer" onClick={openModal}>Add</h1>
      </div>
      {
        (Object.keys(profileDashboard)?.length && Object.keys(profileDashboard?.employments)?.length)
          ? profileDashboard?.employments?.map((item: any, index: any) => (
            <>
              <div className="pb-2 pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex justify-start items-start">
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}companyBrand.png`} alt="companyBrand" />
                    <div className="ml-4">
                      <h1 className="font-bold m-0 p-0 leading-none mb-1">
                        {item?.employmentType === "Full Time" ? item?.designation : item?.role}
                      </h1>
                      <span className="text-sm text-gray-500">{item?.companyName}</span>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-400 hover:scale-125 cursor-pointer end-2">
                    <FiEdit2 onClick={() => {
                      setIsOpen(true)
                      setIsEdit(true)
                      setSelectedEmployment(item as any)
                    }} />
                  </span>
                </div>

                <div className="grid grid-cols-3 w-3/4 mt-5">
                  <span className="text-sm text-gray-500">
                    {
                      item?.employmentType === "Full Time"
                        ? <span>{item?.joiningDateMonth?.title} {item?.joiningDateYear?.title}</span>
                        : <span>
                          {filterArray(joiningDateYear, item?.workedFromYear, undefined)?.[0]?.title} {filterArray(joiningDateMonth, item?.workedFromMonth, undefined)?.[0]?.title}
                        </span>
                    } to {
                      item?.isCurrentEmployment
                        ? "Present"
                        : <span>
                          {filterArray(joiningDateYear, item?.workedTillYear, undefined)?.[0]?.title} {filterArray(joiningDateMonth, item?.workedTillMonth, undefined)?.[0]?.title}
                        </span>
                    }
                  </span>
                  <div className="">
                    <span className={item?.employmentType === "Full Time" ? "text-sm bg-[#F0FFF5] py-2 px-3 rounded-lg text-[#16A34A]" : "text-sm bg-[#FFFAF2] py-2 px-3 rounded-lg text-[#EA580C]"}>{item?.employmentType}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item?.noticePeriod?.title}</span>
                </div>

                <div className="py-2">
                  {item && item?.jobProfile?.split('.').slice(0, item?.jobProfile?.split('.').length - 1).map((item1: any, index: any) => <li><span className="text-sm text-gray-500">{item1}</span></li>)}
                </div>
              </div>
              {Object.keys(profileDashboard?.employments)?.length !== index + 1 && <hr className="my-4" />}
              { }
            </>
          ))
          : <span className="text-sm text-gray-500">Mention your employment details.</span>
      }
      <Modal
        title={"Add Employment"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle={"Add Employment"}
        modalBody={
          <EmploymentForm
            closeDialog={closeDialog}
            //educationDetails={educationDetails}
            selectedEmployment={selectedEmployment}
            isEdit={isEdit}
          />
        }
      />
    </div>
  )
}