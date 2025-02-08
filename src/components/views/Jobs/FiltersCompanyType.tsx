import { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { getCompanyTypeList } from '../../utils/utils';
import { useAppSelector, useAppDispatch } from '../../../';
import { setCompanyType, setNavigateFilterOption, setCheckItems, setCompanyTypeIds } from '../../../store/reducers/jobs/GetFilterJobs';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export const CompanyTypeBasedFilter = ({ handleCompanyTypeCheckbox, setIsOpen }: any) => {
    const dispatch = useAppDispatch();
    const { companyType } = useAppSelector((state) => state.getFilterJobs);

    useEffect(() => {
        (async () => {
            const companyTypeList = await getCompanyTypeList();
            if (Object.keys(companyTypeList)?.length) {
                dispatch(setCompanyType(companyTypeList));
            }
        })();
    }, []);
    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Company Type</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {companyType?.map((item: any) => <div className="text-[#475569] mb-2 flex justify-start items-center">
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked !== undefined && item?.isChecked} onChange={() => handleCompanyTypeCheckbox(item)} />
                                <label className="ml-2 text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
}

const FiltersCompanyType = () => {
    const dispatch = useAppDispatch();
    const { checkItems } = useAppSelector((state) => state.getFilterJobs);

    const handleCompanyTypeCheckbox = (data: any) => {
        dispatch(setCheckItems({
            companyType: checkItems?.companyType?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        }));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setCompanyTypeIds(data?.id));
        } else {
            dispatch(setCompanyTypeIds({ filter: data?.id }));
        }
    };

    return (
        <div className="w-full h-full px-5">
            <h1 className="font-semibold leading-none mt-5 mb-2 text-lg">Company type</h1>
            <div className="flex flex-wrap items-center w-full">
                {checkItems?.companyType?.map((item: any, index: number) =>
                    <div className="text-[#475569] flex justify-start items-center mt-2 text-sm w-1/2" key={index}>
                        <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleCompanyTypeCheckbox(item)} />
                        <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FiltersCompanyType;