import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { resetPassword } from '../../../utils/utils';
import SideSection from '../SideSection';
import { Link, useLocation } from 'react-router-dom';
import EmailSent from './EmailSent';
import Toaster from '../../../commonComponents/Toaster';
import { toast } from 'react-toastify';
import UpdatePassword from './UpdatePassword';

interface IFormInputs {
  email: string;
}

const ForgotSchema = yup
  .object({
    email: yup.string().email().required()
  })
  .required();

const ForgotPassword = () => {
  const location = useLocation();
  const token = location?.pathname?.split('/')[2];
  console.log(token);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(ForgotSchema)
  });

  const onSubmit = async (data: IFormInputs) => {
    const res = await resetPassword(data);
    if (res?.success) {
      setEmailSentSuccess(res?.success);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen grid grid-cols-12">
        <SideSection />
        <div className="bg-[#F8FAFC] h-full px-20 grid grid-cols-1 gap-3 col-start-8 col-end-13">
          {!token ?
            <div>
              <div className="flex justify-center items-center py-10">
                <h1 className="font-bold text-2xl text-[#0F172A]">Forgot Password</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {!emailSentSuccess ?
                  <div className="grid grid-cols-1 gap-10">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#334155]">
                        Enter email to receive reset link
                      </label>
                      <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        {...register("email")}
                        required
                      />
                      {errors?.email && <p className="font-normal text-xs text-red-500">{errors?.email?.message}</p>}
                    </div>
                    <div>
                      <button className={watch("email") ? "bg-[#4F46E5] text-base text-white font-bold rounded-lg w-full h-12" : "bg-[#4F46E5] opacity-50 text-base text-white font-bold rounded-lg w-full h-12"} disabled={!watch("email")} type="submit">Send link</button>
                      <div className="flex justify-center items-center mt-1">
                        <Link to="/login" className="text-[#475569] underline">Log in</Link>
                      </div>
                    </div>
                  </div>
                  :
                  <EmailSent />
                }
              </form>
            </div>
            :
            <UpdatePassword />
          }
        </div >
      </div >
      <Toaster />
    </>
  )
}

export default ForgotPassword;