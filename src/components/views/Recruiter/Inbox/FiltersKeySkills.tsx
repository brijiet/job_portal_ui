import { useEffect, useState } from 'react';
import { getKeySkillsList } from '../../../utils/utils';
import { useAppSelector, useAppDispatch } from '../../../../';
import { setKeySkills, setNavigateFilterOption, setKeySkillsIds, setCheckItems } from '../../../../store/reducers/applicant/GetFilterApplicant';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { BiSearch } from 'react-icons/bi';

export const KeySkillsApplicantBasedFilter = ({ handleKeySkillsCheckbox, setIsOpen }: any) => {
  const dispatch = useAppDispatch();
  const { keySkills, searchKeySkills } = useAppSelector((state) => state.getFilterApplicant);

  useEffect(() => {
    if (searchKeySkills) {
      (async () => {
        const keySkills = await getKeySkillsList();
        if (Object.keys(keySkills)?.length) {
          dispatch(setKeySkills(keySkills));
        }
      })();
    }
  }, [searchKeySkills]);

  const handleViewAll = () => {
    setIsOpen(true)
    dispatch(setNavigateFilterOption("Key Skils"));
  }

  return (
    <div className="w-full">
      <Disclosure>
        {({
          open
        }) => <>
            <Disclosure.Button className="flex w-full justify-between items-center">
              <label className="text-[#475569] font-semibold">Key Skills</label>
              <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-5">
              {keySkills?.slice(0, 5)?.map((item: any) => <div className="text-[#475569] mb-2 flex justify-start items-center">
                <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleKeySkillsCheckbox(item)} />
                <label className="ml-2 text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
              </div>)}
              <button className="text-[#4F46E5] text-sm" onClick={handleViewAll}>View all...</button>
            </Disclosure.Panel>
          </>}
      </Disclosure>
    </div>
  )
};

const FiltersApplicantKeySkills = () => {
  const dispatch = useAppDispatch();
  const { checkItems } = useAppSelector((state) => state.getFilterApplicant);
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeySkillsCheckbox = (data: any) => {
    dispatch(setCheckItems({
      keySkills: checkItems?.keySkills?.map((item: any) =>
        item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
      )
    }));
    if (data?.isChecked === undefined || data?.isChecked === false) {
      dispatch(setKeySkillsIds(data?.id));
    } else {
      dispatch(setKeySkillsIds({ filter: data?.id }));
    }
  };

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = checkItems?.keySkills?.filter((item: any) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-between h-full px-5">
        <h1 className="font-semibold leading-none my-5 text-lg">Select location/ city</h1>
        <div className="relative flex items-center w-full py-2 mb-3 border border-[#E0E7FF] rounded-lg overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <BiSearch className="h-5 w-5" />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            onChange={handleSearch}
            placeholder="Search location.." />
        </div>
        <div className="h-96 overflow-x-auto overflow-y-hidden flex flex-col flex-wrap">
          {filteredItems?.map((item: any) =>
            <div className="text-[#475569] flex justify-start items-center mt-1 text-sm w-1/4">
              <input type="checkbox" defaultChecked={false} checked={item?.isChecked !== undefined && item?.isChecked} onChange={() => handleKeySkillsCheckbox(item)} />
              <label className="ml-2 text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default FiltersApplicantKeySkills;