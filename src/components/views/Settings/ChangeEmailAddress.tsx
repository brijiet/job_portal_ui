import { useEffect, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../';
import { randomNumberInRange, updateEmailAddress } from '../../utils/utils';
import { toast } from 'react-toastify';

interface IFormInputs {
  emailAddress: string
}

const SignUpSchema = yup
  .object({
    emailAddress: yup.string().email().required('Email Address is required').test(
      "Validate Email",
      (value) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLowerCase())
      },
    ),
  })
  .required();

const ChangeEmailAddress = ({ closeEmailAddressDialog, setIsEmailAddressOpen, setUpdateEmailAddress }: any) => {
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
    updateEmailAddress({
      "email": data.emailAddress,
      "isEmailVerified": false
    }).then((data) => {
      setIsEmailAddressOpen(false);
      setUpdateEmailAddress(randomNumberInRange(1, 15))
      toast.success("Email address updated successfully!! ")
    });
  }

  const watchEmailAddress = watch('emailAddress')?.length;

  return (
    <div className="flex flex-col">
      <form id="my-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col flex-grow">
          <div className="flex-grow">
            <h1 className="font-medium mb-2 mt-4">Change Email Address</h1>
          </div>
          <div className="w-full ">
            <Controller
              control={control}
              name="emailAddress"
              render={({ field }) => (
                <input
                  {...field}
                  value={watch("emailAddress")}
                  type="text"
                  readOnly={false}
                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2  py-1.5 "
                />
              )}
            />
            {errors.emailAddress && <p className="font-normal text-xs text-red-500 ">{errors.emailAddress.message}</p>}
          </div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeEmailAddressDialog}
            >
              Cancel
            </button>
            <button
              form='my-form' type="submit"
              className={watchEmailAddress === 0 || watch('emailAddress') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-8  py-1.5"}
              disabled={watchEmailAddress === 0 || watch('emailAddress') === null}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangeEmailAddress;