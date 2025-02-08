import { useEffect } from 'react';
import { getWorkModeList } from '../../utils/utils';
import { useAppSelector, useAppDispatch } from '../../../';
import { setWorkMode, setWorkModeIds, setCheckItems } from '../../../store/reducers/jobs/GetFilterJobs';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export const WorkModeBasedFilter = ({ handleWorkModeCheckbox }: any) => {

    const dispatch = useAppDispatch();
    const { workMode } = useAppSelector((state) => state.getFilterJobs);

    useEffect(() => {
        (async () => {
            const workModeList = await getWorkModeList();
            if (Object.keys(workModeList)?.length) {
                dispatch(setWorkMode(workModeList));
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
                            <label className="text-[#475569] font-semibold">Work Mode</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {workMode?.map((item: any, index: number) => <div className={workMode.length - 1 !== index ? "text-[#475569] flex justify-start items-center mb-2" : "text-[#475569] flex justify-start items-center"}>
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked !== undefined && item?.isChecked} onChange={() => handleWorkModeCheckbox(item)} />
                                <label className="ml-2 text-sm overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

const FiltersWorkMode = () => {
    const dispatch = useAppDispatch();
    const { checkItems } = useAppSelector((state) => state.getFilterJobs);

    const handleWorkModeCheckbox = (data: any) => {
        dispatch(setCheckItems({
            workMode: checkItems?.workMode?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        }));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setWorkModeIds(data?.id));
        } else {
            dispatch(setWorkModeIds({ filter: data?.id }));
        }
    };

    return (
        <div className="w-full h-full px-5">
            <h1 className="font-semibold leading-none mt-5 mb-2 text-lg">Work mode</h1>
            <div className="flex flex-wrap items-center w-full">
                {checkItems?.workMode?.map((item: any, index: number) =>
                    <div className="text-[#475569] flex justify-start items-center mt-2 text-sm w-1/2" key={index}>
                        <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleWorkModeCheckbox(item)} />
                        <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                    </div>
                )}
            </div>
        </div>
    )
};

export default FiltersWorkMode;