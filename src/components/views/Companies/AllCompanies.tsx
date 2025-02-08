import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../..';
import CompanyCard from './CompanyCard';
import { BiSearch } from 'react-icons/bi';
import { getAllCompanies, clearGetAllCompaniesSlice, setDepartment, setFilterDepartment, setFilterLocation, setLocation, setCompanyType, setFilterCompanyType, setIndustry, setFilterIndustry, setCompany, setFilterCompany, clearIndividual, setNavigateFilterOption, clearAll, setToggleFilter } from '../../../store/reducers/companies/getAllCompanies';
import { CompanyDepartmentFilter } from './FilterByCompanyDepartment';
import { scrollToTop } from '../../utils/utils';
import FiltersModal from '../Companies/FiltersModal';
import { CompanyTypeFilter } from './FilterByCompanyType';
import { CompanyLocationFilter } from './FilterByCompanyLocation';
import { IndustryFilter } from './FilterByIndustry';
import { CompanyFilter } from './FilterByCompany';
import { RxCross2 } from 'react-icons/rx';
import TopCompanies from './TopCompanies';

const AllCompanies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { success, allCompanies, loading, department, filtersData, location, companyType, industry, company, allFilterIds, toggleFilter } = useAppSelector((state) => state.getAllCompanies);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [filtersCount, setFiltersCount] = useState(0);
    const [companyCard, setCompanyCard] = useState<any>([]);

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        let filtersCount = 0;
        if (filtersData?.department?.length) {
            filtersCount += filtersData?.department?.length
        }
        if (filtersData?.location?.length) {
            filtersCount += filtersData?.location?.length
        }
        if (filtersData?.industry?.length) {
            filtersCount += filtersData?.industry?.length
        }
        if (filtersData?.companyType?.length) {
            filtersCount += filtersData?.companyType?.length
        }
        if (filtersData?.company?.length) {
            filtersCount += filtersData?.company?.length
        }
        setFiltersCount(filtersCount);
    }, [filtersData]);

    useEffect(() => {
        if (toggleDispach) {
            if ((filtersData?.department !== undefined && filtersData?.department?.length !== 0) || (filtersData?.location !== undefined && filtersData?.location?.length !== 0) || (filtersData?.companyType !== undefined && filtersData?.companyType?.length !== 0) || (filtersData?.industry !== undefined && filtersData?.industry?.length !== 0) || (filtersData?.company !== undefined && filtersData?.company?.length !== 0)) {
                dispatch(getAllCompanies({ page, data: filtersData }));
                if (toggleFilter) {
                    setCompanyCard([]);
                    setPage(1);
                    dispatch(setToggleFilter());
                }
            } else {
                dispatch(getAllCompanies({ page }));
            }
        }
    }, [dispatch, page, filtersData, toggleDispach, toggleFilter]);

    useEffect(() => {
        if (success) {
            if (allCompanies.length !== 0) {
                setCompanyCard((prev: any) => [...prev, ...allCompanies]);
            } else {
                setToggleDispach(false);
            }
            dispatch(clearGetAllCompaniesSlice());
        }
    }, [success])

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

    const onClickCompanyCard = (companyId: any) => {
		window.open(`/allCompanies/companyDescription/${companyId}`, '_blank');
    }

    const handleViewAll = () => {
        setIsOpen(true);
        dispatch(setNavigateFilterOption("CompanyType"));
    }

    const handleClearAll = () => {
        dispatch(clearAll());
        setToggleDispach(true);
    }

    const handleDepartmentCheckbox = (data: any) => { 
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
        dispatch(setDepartment(
            department?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterDepartment(data?.id));
        } else {
            dispatch(setFilterDepartment({ filterDepartment: data?.id }));
        }
    };
    
    const handleLocationCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
        dispatch(setLocation(
            location?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ))
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterLocation(data?.id));
        } else {
            dispatch(setFilterLocation({ filterLocation: data?.id }));
        }
    };

    const handleCompanyTypeCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
        dispatch(setCompanyType(
            companyType?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ))
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterCompanyType(data?.id));
        } else {
            dispatch(setFilterCompanyType({ filterCompanyType: data?.id }));
        }
    };

    const handleIndustryCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
        dispatch(setIndustry(
            industry?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ))
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterIndustry(data?.id));
        } else {
            dispatch(setFilterIndustry({ filterIndustry: data?.id }));
        }
    };
    const handleCompanyCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
        dispatch(setCompany(
            company?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ))
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterCompany(data?.id));
        } else {
            dispatch(setFilterCompany({ filterCompany: data?.id }));
        }
    };

return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
                    <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
                    <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[#475569] font-bold mr-2">Filters</span>
                                <span>{filtersCount !== 0 && filtersCount}</span>
                            </div>                            
                            {
                                filtersCount !== 0 &&
                                <button className=" border-b border-[#475569] text-[#475569]" onClick={handleClearAll}>Clear all</button>
                            }
                        </div>
                    
                    <div className="mt-5 flex flex-wrap justify-start items-center gap-2">
                            {/* {filtersData?.companyType !== null && companyType?.map((item: any) => item?.id == filtersData?.companyType &&
                                <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                    <span className="mr-1">0 - {item?.title}</span>
                                    <span className="cursor-pointer"
                                        onClick={() => {
                                            dispatch(clearIndividual({ companyType: item?.id }))
                                            setToggleDispach(true)
                                        }}>
                                        <RxCross2 />
                                    </span>
                                </span>
                            )} */}
                            {filtersData?.department?.map((item: any) => {
                                const departmentFilter = department?.filter((departmentItem: any) => departmentItem?.id === item);
                                return (
                                    <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                        <span className="mr-1">{departmentFilter[0]?.title}</span>
                                        <span className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(clearIndividual({ department: departmentFilter[0]?.id }))
                                                setToggleDispach(true)
                                            }}>
                                            <RxCross2 />
                                        </span>
                                    </span>
                                )
                            })}
                            {filtersData?.location?.map((item: any) => {
                                const locationFilter = location?.filter((locationItem: any) => locationItem?.id === item);
                                return (
                                    <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                        <span className="mr-1">{locationFilter[0]?.title}</span>
                                        <span className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(clearIndividual({ location: locationFilter[0]?.id }))
                                                setToggleDispach(true)
                                            }}>
                                            <RxCross2 />
                                        </span>
                                    </span>
                                )
                            })}
                            {filtersData?.company?.map((item: any) => {
                                const companyFilter = company?.filter((companyItem: any) => companyItem?.id === item);
                                return (
                                    <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                        <span className="mr-1">{companyFilter[0]?.title}</span>
                                        <span className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(clearIndividual({ company: companyFilter[0]?.id }))
                                                setToggleDispach(true)
                                            }}>
                                            <RxCross2 />
                                        </span>
                                    </span>
                                )
                            })}
                            {filtersData?.companyType?.map((item: any) => {
                                const companyTypeFilter = companyType?.filter((companyTypeItem: any) => companyTypeItem?.id === item);
                                return (
                                    <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                        <span className="mr-1">{companyTypeFilter[0]?.title}</span>
                                        <span className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(clearIndividual({ companyType: companyTypeFilter[0]?.id }))
                                                setToggleDispach(true)
                                            }}>
                                            <RxCross2 />
                                        </span>
                                    </span>
                                )
                            })}
                        {filtersData?.industry?.map((item: any) => {
                                const industryFIlter = industry?.filter((industryItem: any) => industryItem?.id === item);
                                return (
                                    <span className="bg-[#F1F5F9] px-3 py-1.5 rounded-lg flex justify-start items-center text-xs">
                                        <span className="mr-1">{industryFIlter[0]?.title}</span>
                                        <span className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(clearIndividual({ industry: industryFIlter[0]?.id }))
                                                setToggleDispach(true)
                                            }}>
                                            <RxCross2 />
                                        </span>
                                    </span>
                                )
                            })}
                            {filtersCount >= 4 &&
                                <button className=" border-b border-[#475569] text-[#475569] text-xs" onClick={handleViewAll}>All</button>
                            }
                        </div>

                        <hr className="bg-[#E0E7FF] my-5" />                        
                        <CompanyTypeFilter
                            handleCompanyTypeCheckbox={handleCompanyTypeCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        
                        <hr className="bg-[#E0E7FF] my-5" />
                        <CompanyLocationFilter
                            handleLocationCheckbox={handleLocationCheckbox}
                            setIsOpen={setIsOpen}
                        />
                    <hr className="bg-[#E0E7FF] my-5" />
                    {/* <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Industry</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                            <button className="text-[#4F46E5]">View all...</button>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                    </div> */}
                    <IndustryFilter
                        handleIndustryCheckbox={handleIndustryCheckbox}
                        setIsOpen={setIsOpen}
                    />
                    <hr className="bg-[#E0E7FF] my-5" />
                        <CompanyDepartmentFilter
                            handleDepartmentCheckbox={handleDepartmentCheckbox}
                            setIsOpen={setIsOpen}
                    />
                    <hr className="bg-[#E0E7FF] my-5" />
                        <CompanyFilter
                            handleCompanyCheckbox={handleCompanyCheckbox}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        />
                    {/* <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Companies</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">On-site</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Remote</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Hybrid</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Temp. Remote</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>                         */}
                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <CompanyCard onClickCompanyCard={onClickCompanyCard} companyCard={companyCard} loading={loading} />
                </div>
                <div className="col-start-11 col-end-13">
                    <div className="bg-[#F1F5F9] rounded-xl w-full p-5 sticky top-[13%]">
                        <h1 className="leading-none mb-3">Top Companies</h1>
                        <TopCompanies/>
                    </div>
                </div>
            </div >
            {isOpen &&  <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} setToggleDispach={setToggleDispach} />}
        </>
    )
}

export default AllCompanies