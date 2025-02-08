import { useEffect, type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../';
import { updateUserPassword } from '../../utils/utils';
import { toast } from 'react-toastify';

interface IFormInputs {
  newPassword: string
  confirmNewPassword: string
}

const SignUpSchema = yup
  .object({
    newPassword: yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirmNewPassword: yup.string()
      .required('Confirm password is required')
      .min(8, 'Password must be at least 8 characters long')
      .oneOf([yup.ref('newPassword')], 'Your passwords do not match.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
  })
  .required();

const ChangePassword = ({ closeChangePasswordDialog, setIsChangePasswordOpen }: any) => {
  const dispatch = useAppDispatch();
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
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
    updateUserPassword({
      "newPassword": data.newPassword,
    }).then((data) => {
      setIsChangePasswordOpen(false);
      toast.success("Password updated successfully!! ")
    });
  }

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevState) => !prevState);
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col">
      <form id="my-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="font-medium mb-2 mt-4">New Password</div>
          </div>
          <div className="w-full ">
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <input
                  {...field}
                  value={watch("newPassword")}
                  type="password"
                  readOnly={false}
                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2  py-1.5 "
                />
              )}
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={isNewPasswordVisible}
                onChange={toggleNewPasswordVisibility}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </label>
            {errors.newPassword && <p className="font-normal text-xs text-red-500 ">{errors.newPassword.message}</p>}
          </div>
        </div>
        <div className="w-full flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="font-medium mb-2 mt-4">Confirm New Password</div>
          </div>
          <div className="w-full ">
            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field }) => (
                <input
                  {...field}
                  value={watch("confirmNewPassword")}
                  type="password"
                  readOnly={false}
                  className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2  py-1.5 "
                />
              )}
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={isConfirmPasswordVisible}
                onChange={toggleConfirmPasswordVisibility}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </label>
            {errors.confirmNewPassword && <p className="font-normal text-xs text-red-500 ">{errors.confirmNewPassword.message}</p>}
          </div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeChangePasswordDialog}
            >
              Cancel
            </button>
            <button
              form='my-form' type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-8  py-1.5"}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword;