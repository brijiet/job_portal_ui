import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../../utils/utils';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import LinkExpired from './LinkExpired';
import { toast } from 'react-toastify';
import ResetSuccessful from './ResetSuccessful';

interface PasswordFormInput {
  newPassword: string;
  confirmPassword: string;
}

const passwordSchema = yup.object().shape({
  newPassword: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .nullable(),
});

const UpdatePassword = () => {
  const location = useLocation();
  const token = location?.pathname?.split('/')[2];
  const decoded: any = jwtDecode(token);
  const [toggleExpiry, setToggleExpiry] = useState(false);
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PasswordFormInput>({
    resolver: yupResolver(passwordSchema as any)
  });

  useEffect(() => {
    const requestData = {
      password: null
    };
    (async () => {
      const res = await updatePassword(requestData, token);
      if (res?.resetTokenExpiry) {
        setToggleExpiry(res?.resetTokenExpiry);
      }
    })();
  }, []);

  const onSubmit = async (data: PasswordFormInput) => {
    const requestData = {
      password: data?.confirmPassword
    };
    const res = await updatePassword(requestData, token);
    if (res?.success) {
      setToggleSuccess(res?.success);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };
  return (
    <>
      {toggleSuccess ?
        <ResetSuccessful/>
        :
        toggleExpiry ?
          <div>
            <div className="flex justify-center items-center py-10">
              <h1 className="font-bold text-2xl text-[#0F172A]">Forgot Password</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    New password
                  </label>
                  <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    {...register("newPassword")}
                    required
                  />
                  {errors?.newPassword && <p className="font-normal text-xs text-red-500">{errors?.newPassword?.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm new password
                  </label>
                  <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    {...register("confirmPassword")}
                    required
                  />
                  {errors?.confirmPassword && <p className="font-normal text-xs text-red-500">{errors?.confirmPassword?.message}</p>}
                  {(watch("newPassword") === watch("confirmPassword") && watch("newPassword") !== "" && watch("newPassword") !== null && watch("newPassword") !== undefined) && <p className="font-normal text-xs text-green-500">Passwords matched</p>}
                </div>
                <div>
                  <button className="bg-indigo-600 text-base text-white font-bold rounded-lg w-full h-12 mt-5" type="submit">Done</button>
                </div>
              </div>
            </form>
          </div>
          :
          <LinkExpired email={decoded?.email} />
      }
    </>
  )
}

export default UpdatePassword;