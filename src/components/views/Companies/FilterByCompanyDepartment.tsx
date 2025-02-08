import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAppSelector, useAppDispatch } from '../../..';
import { getDepartmentList } from '../../utils/utils';
import { setDepartment, setNavigateFilterOption, setDepartmentIds, setCheckItems } from '../../../store/reducers/companies/getAllCompanies';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { BiSearch } from 'react-icons/bi';

export const CompanyDepartmentFilter = ({ handleDepartmentCheckbox, setIsOpen }: any) => {
    const dispatch = useAppDispatch();
    const { department } = useAppSelector((state) => state.getAllCompanies);
    useEffect(() => {
        (async () => {
            const departmentList = await getDepartmentList();
            if (Object.keys(departmentList)?.length) {
                dispatch(setDepartment(departmentList));
            }
        })();
    }, []);
    const handleViewAll = () => {
        setIsOpen(true)
        dispatch(setNavigateFilterOption("Department"));
    }
    return (
        <div className="w-full h-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Department</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {department?.slice(0, 5)?.map((item: any) => <div className="text-[#475569] mb-2 flex justify-start items-center">
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleDepartmentCheckbox(item)} />
                                <label className="ml-2 text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                            <button className="text-[#4F46E5] text-sm" onClick={handleViewAll}>
                                View all...
                            </button>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div >
    )
}

const FiltersDepartment = () => {
    const dispatch = useAppDispatch();
    const { checkItems } = useAppSelector((state) => state.getAllCompanies);
    const [searchQuery, setSearchQuery] = useState("");

    const handleDepartmentCheckbox = (data: any) => {
        dispatch(setCheckItems({
            department: checkItems?.department?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        }));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setDepartmentIds(data?.id));
        } else {
            dispatch(setDepartmentIds({ filter: data?.id }));
        }
    };

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = checkItems?.department?.filter((item: any) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full">
            <div className="flex flex-col justify-between h-full px-5">
                <h1 className="font-semibold leading-none my-5 text-lg">Select department</h1>
                <div className="relative flex items-center w-full py-2 mb-3 border border-[#E0E7FF] rounded-lg overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <BiSearch className="h-5 w-5" />
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        onChange={handleSearch}
                        placeholder="Search department.." />
                </div>
                <div className="h-96 overflow-x-auto overflow-y-hidden flex flex-col flex-wrap">
                    {filteredItems?.map((item: any) =>
                        <div className="text-[#475569] flex justify-start items-center mt-1 text-sm w-1/2">
                            <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleDepartmentCheckbox(item)} />
                            <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FiltersDepartment;