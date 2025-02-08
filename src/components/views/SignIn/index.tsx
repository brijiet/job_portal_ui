import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../..';
import { useAppSelector } from '../../..';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Cookies from 'js-cookie';
import { clearSignInSlice, signInUser } from '../../../store/reducers/signIn';
import Toaster from '../../commonComponents/Toaster';
import { toast } from 'react-toastify';
import SideSection from './SideSection';

interface IFormInputs {
  email: string;
  password: string;
}

const SignInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, login } = useAppSelector((state) => state.login);
  const userType = Cookies.get("userType");
  const { url } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignInSchema)
  });

  useEffect(() => {
    if (success) {
      dispatch(clearSignInSlice());
      if (userType === 'jobSeeker') {
        if (url) {
          const getUrl = atob(url)
          navigate(getUrl);
        } else {
          navigate('/homePage');
        }
      }
      if (userType === 'employer')
        navigate('/employerDashboard');
      if (login) {
        dispatch(clearSignInSlice());
        toast.error(login?.response?.data?.message)
      }
    }
  }, [success, navigate, dispatch]);

  const onSubmit = async (data: IFormInputs) => {
    await dispatch(signInUser({
      password: data.password,
      email: data.email,
    }))
  };

  const googleAuth = () => {
    googleAuthSignUp();
  }

  return (
    <>
      <div className="w-full h-screen grid grid-cols-12">
        <SideSection />
        <div className="bg-[#F8FAFC] h-full px-20 grid grid-cols-1 gap-3 col-start-8 col-end-13">
          <div>
            <div className="flex justify-center items-center py-8 2xl:py-12">
              <h1 className="font-bold text-2xl 2xl:text-3xl text-[#0F172A]">Log In</h1>
            </div>
            <div className="grid grid-cols-1 mt-4 gap-5">
              <div className="text-sm font-semibold flex flex-col gap-2 justify-center">
                <div className=" grid grid-cols-1 gap-5">
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-5 2xl:gap-6">
                        <div>
                          <label className="block text-sm 2xl:text-base font-semibold mb-2">
                            Email
                          </label>
                          <input className="shadow-sm appearance-none border rounded-xl w-full py-3 2xl:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Tell us your Email ID"
                            {...register("email")}
                            required
                          />
                          {errors?.email && <p className="font-normal text-xs 2xl:text-sm text-red-500">{errors?.email?.message}</p>}
                        </div>
                        <div className="">
                          <label className="block text-sm 2xl:text-base font-semibold mb-2">
                            Password
                          </label>
                          <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 2xl:text-base  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Create a password for your account"
                            {...register("password")}
                            required
                          />
                          <div className="flex justify-between items-center">
                            {errors?.password && <p className="font-normal text-xs 2xl:text-sm text-red-500">{errors?.password?.message}</p>}
                            {!errors?.password && <span className="font-normal text-xs 2xl:text-sm text-gray-500">Minimum 6 characters required</span>}
                            <Link to="/forgotPassword" className="font-normal text-xs 2xl:text-sm text-blue-500 cursor-pointer">Forgot Password?</Link>
                          </div>
                        </div>
                        <div>
                          <button className="bg-indigo-600 text-base 2xl:text-lg text-white font-bold rounded-lg w-full h-12 2xl:h-14" type="submit">Log In</button>
                        </div>
                      </div>
                    </form>
                    <div className="flex justify-center items-center text-sm 2xl:text-base mt-2">
                      <span className=" text-[#94A3B8] mr-1">
                        Don't have an account?
                      </span>
                      <Link to='/registration' className="underline"> Sign Up</Link>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <hr className=" w-2/5" />
                    <span className="py-3 2xl:text-base">OR</span>
                    <hr className=" w-2/5" />
                  </div>
                  <div>
                    <button className=" bg-white flex justify-center items-center drop-shadow-lg rounded-lg w-full h-12 2xl:h-14 text-base 2xl:text-lg"
                      onClick={googleAuth}
                    >
                      <FcGoogle size={20} />
                      <span className="ml-1">Log in with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      <Toaster />
    </>
  )
}

export default SignIn;