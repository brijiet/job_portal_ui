import { useEffect, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../';
import { randomNumberInRange, updateMobileNumber } from '../../utils/utils';
import { toast } from 'react-toastify';

interface IFormInputs {
  mobileNumber: string
}

const SignUpSchema = yup
  .object({
    mobileNumber: yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number'),
  })
  .required();

const ChangeMobileNumber = ({ closeMobileNumberDialog, setIsMobileNumberOpen, setUpdateMobileNumber }: any) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignUpSchema)
  });

  const onSubmit = (data: IFormInputs) => {
    updateMobileNumber({
      "mobileNumber": data.mobileNumber,
      "isMobileVerified": false
    }).then((data) => {
      setIsMobileNumberOpen(false);
      setUpdateMobileNumber(randomNumberInRange(1, 15))
      toast.success("Mobile number updated successfully!! ")
    });
  }

  const watchMobileNumber = watch('mobileNumber')?.length;

  return (
    <div className="flex flex-col">
      <form id="my-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col flex-grow">
          <div className="flex-grow">
            <h1 className="font-medium mb-2 mt-4">Change Mobile Number</h1>
          </div>
          <div className="w-full ">
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field }) => (
                <input
                  {...field}
                  value={watch("mobileNumber")}
                  type="text"
                  readOnly={false}
                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2  py-1.5 "
                />
              )}
            />
            {errors.mobileNumber && <p className="font-normal text-xs text-red-500 ">{errors.mobileNumber.message}</p>}
          </div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeMobileNumberDialog}
            >
              Cancel
            </button>
            <button
              form='my-form' type="submit"
              className={watchMobileNumber === 0 || watch('mobileNumber') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-8  py-1.5"}
              disabled={watchMobileNumber === 0 || watch('mobileNumber') === null}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangeMobileNumber;