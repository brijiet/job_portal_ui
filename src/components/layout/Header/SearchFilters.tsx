import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { BiSearch } from 'react-icons/bi';
import { getDepartmentList, getLocationList, getKeySkillsList } from '../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../';
import {
    setDepartment,
    setLocation,
    setFilterDepartment,
    setFilterLocation,
    setSearchDepartment,
    setSearchLocation,
    setSearchKeySkills,
    clearAll,
    setKeySkills,
    setFilterKeySkills
} from '../../../store/reducers/jobs/GetFilterJobs';

const SearchFilters = () => {
    const { department, location, keySkills } = useAppSelector((state) => state.getFilterJobs);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    let locationPath = useLocation();
    const dispatch = useAppDispatch();
    const [filteredDepartment, setFilteredDepartment] = useState([]);
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [filteredKeySkills, setFilteredKeySkills] = useState([]);

    useEffect(() => {
        (async () => {
            const departmentList = await getDepartmentList();
            if (Object.keys(departmentList)?.length) {
                dispatch(setDepartment(departmentList));
            }
        })();
        (async () => {
            const locationList = await getLocationList();
            if (Object.keys(locationList)?.length) {
                dispatch(setLocation(locationList))
            }
        })();
        (async () => {
            const keySkills = await getKeySkillsList();
            if (Object.keys(keySkills)?.length) {
                dispatch(setKeySkills(keySkills))
            }
        })();
    }, []);

    useEffect(() => {
        if (locationPath?.pathname !== "/allJobs") {
            dispatch(clearAll());
        }
    }, [locationPath]);

    useEffect(() => {
        if (department?.length !== 0) {
            setFilteredDepartment(
                query === ''
                    ? department
                    : department.filter((item: any) =>
                        item.title
                            .toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(query.toLowerCase().replace(/\s+/g, ''))
                    )
            )
        }
        if (location?.length !== 0) {
            setFilteredLocation(
                query === ''
                    ? location
                    : location.filter((item: any) =>
                        item.title
                            .toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(query.toLowerCase().replace(/\s+/g, ''))
                    )
            )
        }
        if (keySkills?.length !== 0) {
            setFilteredKeySkills(
                query === ''
                    ? keySkills
                    : keySkills.filter((item: any) =>
                        item.title
                            .toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(query.toLowerCase().replace(/\s+/g, ''))
                    )
            )
        }
    }, [department, location, keySkills, query])

    const handleDepartment = (id: number) => {
        navigate("/allJobs");
        dispatch(setDepartment(
            department?.map((item: any) =>
                item?.id === id ? { ...item, isChecked: true } : item
            )
        ));
        dispatch(setSearchDepartment(false));
        dispatch(setFilterDepartment(id));
    }

    const handleLocation = (id: number) => {
        navigate("/allJobs");
        dispatch(setLocation(
            location?.map((item: any) =>
                item?.id === id ? { ...item, isChecked: true } : item
            )
        ));
        dispatch(setSearchLocation(false));
        dispatch(setFilterLocation(id));
    }

    const handleKeySkills = (id: number) => {
        navigate("/allJobs");
        dispatch(setKeySkills(
            keySkills?.map((item: any) =>
                item?.id === id ? { ...item, isChecked: true } : item
            )
        ));
        dispatch(setSearchKeySkills(false));
        dispatch(setFilterKeySkills(id));
    }

    return (
        <div className="w-72 2xl:w-96 xl:w-72">
            <Combobox>
                <div className="relative">
                    <div className="relative flex items-center justify-between w-full border border-[#E0E7FF] rounded-lg overflow-hidden focus:border-none">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <BiSearch className="h-5 w-5" />
                        </div>
                        <Combobox.Input
                            className="w-full border-none py-2 pr-10 text-sm 2xl:text-base xl:text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                            displayValue={(item: any) => locationPath?.pathname === "/allJobs" ? item?.title : ""}
                            placeholder="Search something.."
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base xl:text-base 2xl:text-xl shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredDepartment?.length === 0 && filteredLocation?.length === 0 && filteredKeySkills?.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                <>
                                    {filteredDepartment.map((item: any) => (
                                        <Combobox.Option
                                            key={item?.id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            onClick={() => handleDepartment(item?.id)}
                                            value={item}
                                        >
                                            <span className="font-normal w-full h-full">{item.title}</span>
                                        </Combobox.Option>
                                    ))}
                                    {filteredLocation.map((item: any) => (
                                        <Combobox.Option
                                            key={item?.id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            onClick={() => handleLocation(item?.id)}
                                            value={item}
                                        >
                                            <span className="font-normal w-full h-full">{item.title}</span>
                                        </Combobox.Option>
                                    ))}
                                    {filteredKeySkills.map((item: any) => (
                                        <Combobox.Option
                                            key={item?.id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            onClick={() => handleKeySkills(item?.id)}
                                            value={item}
                                        >
                                            <span className="font-normal w-full h-full">{item.title}</span>
                                        </Combobox.Option>
                                    ))}
                                </>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchFilters;