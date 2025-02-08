import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { getSalaryRangeList } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../';
import { setSalarys, setMaxSalaryId } from '../../../store/reducers/jobs/GetFilterJobs';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Select from 'react-select';

export const SalaryBasedFilter = ({ handleSalaryFilter, isOpen }: any) => {
    const dispatch = useAppDispatch();
    const { filtersData, salary: intialSalary } = useAppSelector((state) => state.getFilterJobs);
    const [salary, setSalary] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const salaryRangeList = await getSalaryRangeList();
            if (Object.keys(salaryRangeList)?.length) {
                dispatch(setSalarys(salaryRangeList));
            }
        })();
    }, []);
    useEffect(() => {
        if (filtersData?.salary !== null && !isOpen) {
            const salaryData = intialSalary?.filter((item: any) => parseInt(item?.id) === filtersData?.salary);
            if (salaryData?.length !== 0) {
                setSalary(parseInt(salaryData[0]?.title));
            } else {
                setSalary(51);
            }
        } else {
            setSalary(0);
        }
    }, [isOpen, filtersData]);
    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Salary</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-12">
                            <div className="relative mb-3">
                                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"
                                    style={{
                                        left: `${salary * 1.960}%`
                                    }}>
                                    {salary !== 51 ? `${salary} LPA` : "50+PA"}
                                </span>
                                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]" type="range" min="0" max="51"
                                    value={salary}
                                    onMouseUp={() => handleSalaryFilter(salary)}
                                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                                        setSalary(parseInt(event.target.value));
                                    }} />
                            </div>
                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                <span>4 LPA</span>
                                <span>50+ LPA</span>
                            </div>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

const FiltersSalary = () => {
    const dispatch = useAppDispatch();
    const { salary: intialSalary, maxSalaryId } = useAppSelector((state) => state.getFilterJobs);
    const [salaryMaster, setSalaryMaster] = useState([]);
    const [salary, setSalary] = useState<number>(0);

    useEffect(() => {
        setSalaryMaster(intialSalary?.map(({ id, title }: any) => ({ value: id, label: title })));
        if (maxSalaryId) {
            setSalary(maxSalaryId);
        } else {
            setSalary(0);
        }
    }, [maxSalaryId]);

    const handleSalaryFilter = (salary: number) => {
        dispatch(setMaxSalaryId(salary));
    };
    return (
        <div className="w-full px-5">
            <h1 className="font-semibold leading-none mt-5 mb-12 text-lg">Salary</h1>
            <div className="relative mb-3">
                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"
                    style={{
                        left: `${salary * 1.960}%`
                    }}>
                    {salary !== 51 ? `${salary} LPA` : "50+PA"}
                </span>
                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]" type="range" min="0" max="51"
                    value={salary}
                    onMouseUp={() => handleSalaryFilter(salary)}
                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                        setSalary(parseInt(event.target.value));
                    }} />
            </div>
            <div className="flex justify-between items-center text-[#64748B] text-xs mb-3">
                <span>4 LPA</span>
                <span>50+ LPA</span>
            </div>
            <div>
                <h1 className="text-[#64748B] text-xs mb-3">Max salary</h1>
                <Select
                    isClearable
                    isSearchable={true}
                    className="text-sm w-1/2"
                    classNamePrefix="dropdown"
                    options={salaryMaster}
                    placeholder="LPA"
                />
            </div>

        </div>
    )
};

export default FiltersSalary;