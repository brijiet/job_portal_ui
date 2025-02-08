import React, { useState } from 'react'
import LeftPanel from './LeftPanel'
import { useEffect, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../..';
import { getAllCompanies } from '../../../store/reducers/companies/getAllCompanies';
import { deleteBlockedCompanies, listBlockedCompanies, postBlockedCompanies } from '../../utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { GrFormClose } from 'react-icons/gr';
interface IFormInputs {
  blockCompanies: { value: string; label: string; }
}

const CompanySchema = yup.object().shape({
  blockCompanies: yup.object().shape({
    value: yup.string().required("Please select company"),
    label: yup.string().required("Please select company"),
  })
})
  .required();

const BlockCompanies = () => {
  const dispatch = useAppDispatch();
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);
  const userId = Cookies.get("userId");
  const [companyList, setCompanyList] = useState<any>([]);
  const [savedCompanyList, setSavedCompanyList] = useState<any>([]);
  const [deleteAction, setDeleteAction] = useState<number>();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(CompanySchema)
  });

  const onSubmit = (data: IFormInputs) => {
    postBlockedCompanies({
      "jobSeeker": userId,
      "company": data.blockCompanies.value
    }).then((data) => {
      setDeleteAction(data.company)
      setValue("blockCompanies", { value: '', label: '' })
      toast.success("Company added successfully!! ")
    });
  }

  useEffect(() => {
    setCompanyList(allCompanies as any)
  }, [success]);

  useEffect(() => {
    dispatch(getAllCompanies({} as any));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const saveBlockList = await listBlockedCompanies(Number(userId))
      if (Object?.keys(saveBlockList)?.length) {
        setSavedCompanyList(saveBlockList)
      }
    })();
  }, [userId, deleteAction]);

  const handleAddDelete = async (companyId: number) => {
    await deleteBlockedCompanies(Number(companyId)).then((data: any) => {
      setDeleteAction(companyId);
      toast.success("Company deleted successfully!! ")
    })
  }
  return (
    <>
      <div className="w-full p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Block Companies</h1>
        <p className="mb-2">This section will prevent companies recruiter blocked from viewing your profile on the Job portal.</p>
        <form id="my-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="my-5">
            <Controller
              control={control}
              name="blockCompanies"
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  placeholder="Select companies, what you want to block"
                  options={companyList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                  defaultValue={getValues("blockCompanies")}
                />
              )}
            />
            {
              errors.blockCompanies
              &&
              <p className="font-normal text-xs text-red-500 absolute">
                {errors.blockCompanies?.label?.message}
              </p>
            }
          </div>
          <div className="flex flex-wrap">
            {savedCompanyList && savedCompanyList?.map((item: any, key: number) =>
              <div key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5 ">{item?.company?.title}<GrFormClose className='h-4 w-4 float-right ml-2 cursor-pointer' onClick={() => handleAddDelete(item?.id)} /></div>
            )}
          </div>
          <p className='text-xs'>Your Profiles are obnubilated from above culled companies by default, when you probe for a job then the job will be not appear in search job section, if you update or apply for a job, blocked companies, can not get your profile.</p>
          <div className="mt-5 flex justify-end items-center">
            <div>

              <button
                form='my-form' type="submit"
                className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default BlockCompanies