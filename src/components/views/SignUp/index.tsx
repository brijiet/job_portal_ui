import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser, clearRegisterSlice } from '../../../store/reducers/register';
import { useAppDispatch } from '../../../';
import { useAppSelector } from '../../../';
import { googleAuthSignUp } from '../../../store/reducers/googleAuth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Cookies from 'js-cookie';
import { getCompanyList } from '../../utils/utils';
import Select from 'react-select';
import { filterArray } from '../../utils/filterArray';
import { toast } from 'react-toastify';
import Toaster from '../../commonComponents/Toaster';

interface IFormInputs {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    workStatus: boolean | undefined;
    role: string;
    companies: any
}

const SignUpSchema = yup
    .object({
        name: yup.string().label("Full Name").required(),
        email: yup.string().email().required().test(
            "Validate Email",
            (value) => {
                const re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(value).toLowerCase())
            },
        ),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            ),
        mobileNumber: yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number'),
            workStatus: yup.boolean().label("Work Status").when(
                'role', {
                is: 'jobSeeker',
                then: (schema) => schema.default(undefined).required(),
                otherwise: (schema) => schema.notRequired(),
            }),
        role: yup.string().label("User Type").required(),
        companies: yup.object().when(
            'role', {
            is: 'employer',
            then: (schema) => schema.required("Please select current company"),
            otherwise: (schema) => schema.notRequired(),
        }),
    })
    .required();

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isContinueWithEmail, setIsContinueWithEmail] = useState(false);
    const { success, user } = useAppSelector((state) => state.register);
    const [companyList, setCompanyList] = useState<any>([]);
    const { url } = useParams();

    const {
        register,
        setValue,
        handleSubmit,
        control,
        watch,
        getValues,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(SignUpSchema)
    });

    useEffect(() => {
        setValue('role', 'jobSeeker');
    }, [])

    useEffect(() => {
        (async () => {
            const company = await getCompanyList();
            setCompanyList(company);
        })();
    }, []);

    useEffect(() => {
        if (success) {
            dispatch(clearRegisterSlice());
            if (Cookies.get('userType') === 'jobSeeker')
                if (url) {
                    const getUrl = atob(url)
                    navigate(getUrl);
                } else {
                    navigate('/homePage');
                }
            if (Cookies.get('userType') === 'employer')
                navigate('/employerDashboard');
            if (user) {
                toast.error(user?.response?.data?.message)
            }
        }

    }, [success, navigate, dispatch])

    const onSubmit = (data: IFormInputs) => {
        const companyArray = filterArray(companyList, parseInt(data?.companies?.value));


        dispatch(registerUser({
            name: data?.name,
            password: data?.password,
            email: data?.email,
            mobileNumber: data?.mobileNumber,
            workStatus: data?.workStatus && data?.workStatus,
            userType: data?.role && data?.role,
            companies: data?.companies && companyArray[0]
        }));

    };

    const googleAuth = () => {
        googleAuthSignUp();
    }

    return (
        <>
            <div className="w-full h-screen grid grid-cols-12">
                <div className="overflow-hidden col-start-1 col-end-8 relative">
                    <div className="bg-gradient-to-r from-[#FFF] to-[#ffffff1e] to-60% backdrop-blur-[6px] w-full h-20 absolute top-8 flex justify-start items-center px-8">
                        <Link to="/">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}portalLogo.png`} alt="portalLogo" className="h-10" />
                        </Link>
                    </div>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}signup_logo.png`} alt="signUp logo" className="h-full w-full" />
                </div>
                <div className="bg-[#F8FAFC] h-full px-20 grid grid-cols-1 gap-3 col-start-8 col-end-13">
                    <div>
                        <div className="flex justify-center items-center py-8 2xl:py-12 relative">
                            {isContinueWithEmail && <div onClick={() => setIsContinueWithEmail(false)} className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-base 2xl:text-lg text-[#0F172A] flex items-center justify-start cursor-pointer">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}backButton.svg`} alt="backButton" className="mr-4" />
                                <span className=" leading-none">
                                    Back
                                </span>
                            </div>}
                            <h1 className="font-bold text-2xl 2xl:3xl text-[#0F172A]">Sign up</h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="w-full flex-col justify-start items-start gap-2 flex">
                                    <div className="self-stretch justify-start items-start gap-5 inline-flex">
                                        <div className="grow shrink basis-0 h-12 2xl:h-14 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <Controller
                                                    name="role"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <input
                                                            type="radio"
                                                            className="ml-5"
                                                            {...field}
                                                            checked={getValues("role") === "jobSeeker"}
                                                            onChange={() => {
                                                                setValue("role", "jobSeeker");
                                                            }}
                                                        />
                                                    )}
                                                /> </div>
                                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                                                <div className="text-black text-base 2xl:text-lg font-normal  leading-snug tracking-tight">  Job Seeker</div>
                                            </div>
                                        </div>
                                        <div className="grow shrink basis-0 h-12 2xl:h-14 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <Controller
                                                    name="role"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <input
                                                            type="radio"
                                                            className="ml-5"
                                                            {...field}
                                                            checked={getValues("role") === "employer"}
                                                            onChange={() => {
                                                                setValue("role", "employer");
                                                                setIsContinueWithEmail(false);
                                                            }}
                                                        />
                                                    )}
                                                /> </div>
                                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                                                <div className="text-black text-base 2xl:text-lg font-normal  leading-snug tracking-tight">  Employer</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {((isContinueWithEmail && watch("role") === "jobSeeker") || watch("role") === "employer") && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Full name
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="What is your name?"
                                                {...register("name")}
                                                required
                                            />
                                            {errors?.name && <p className="font-normal text-xs text-red-500">{errors?.name?.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Email
                                            </label>
                                            <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                                type="email"
                                                placeholder="Tell us your Email ID"
                                                {...register("email")}
                                                required
                                            />
                                            {errors?.email && <p className="font-normal text-xs text-red-500">{errors?.email?.message}</p>}
                                            {/* {!errors?.email && <span className="font-normal text-xs text-gray-500">We'll send you relevant jobs in your mail</span>} */}
                                        </div>
                                        {watch("role") === "employer" && <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Company
                                            </label>
                                            <div className="appearance-none border rounded-xl w-full text-gray-600 shadow-sm">
                                                <Controller
                                                    control={control}
                                                    name="companies"
                                                    render={({ field }) => (
                                                        <Select className="shadow-sm appearance-none border rounded-xl w-full  text-gray-600  focus:outline-none focus:shadow-outline"
                                                            {...field}
                                                            isClearable
                                                            placeholder="Select company"
                                                            options={companyList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                                                            defaultValue={watch("companies")}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors?.companies && <p className="font-normal text-xs text-red-500">Please select your Company</p>}
                                            {/* {!errors?.email && <span className="font-normal text-xs text-gray-500">We'll send you relevant jobs in your mail</span>} */}
                                        </div>}
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="">
                                                <label className="block text-sm font-semibold mb-2">
                                                    Password
                                                </label>
                                                <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="password"
                                                    placeholder="Create a password for your account"
                                                    {...register("password")}
                                                    required
                                                />
                                                {errors?.password && <p className="font-normal text-xs text-red-500">{errors?.password?.message}</p>}
                                                {!errors?.password && <span className="font-normal text-xs text-gray-500">Minimum 6 characters required</span>}
                                            </div>
                                            <div className="">
                                                <label className="block text-sm font-semibold mb-2">
                                                    Mobile number
                                                </label>
                                                <div className="relative">
                                                    <input className="shadow-sm appearance-none border rounded-xl w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        type="number"
                                                        placeholder="Mobile Number"
                                                        {...register("mobileNumber")}
                                                        required
                                                    />
                                                    <span className="absolute top-3 left-1">+91</span>
                                                </div>
                                                {errors?.mobileNumber && <p className="font-normal text-xs text-red-500">{errors?.mobileNumber?.message}</p>}
                                                {/* {!errors?.mobileNumber && <span className="font-normal text-xs text-gray-500">Recruiters will call on this number</span>} */}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {
                                    isContinueWithEmail && watch("role") === "jobSeeker" &&
                                    <div>
                                        <span className="block text-sm font-semibold mb-2">
                                            Work status
                                        </span>
                                        <div className="grid grid-cols-2 gap-10">
                                            <Controller
                                                name="workStatus"
                                                control={control}
                                                render={({ field }) => (
                                                    <button
                                                        type="button"
                                                        className={watch("workStatus") ? "border-2 border-gray-300 bg-gray-300 flex flex-col justify-center items-start p-5 rounded-lg" : "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg hover:bg-gray-300"}
                                                        onClick={() => field.onChange(true)}
                                                    >
                                                        <span>
                                                            <span className="text-left m-0 block mb-4">Experienced</span>
                                                        </span>
                                                        <img
                                                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}experienced.svg`}
                                                            alt="experienced"
                                                            //width="25.2px"
                                                            //height="28px"
                                                            className=" h-6 w-[25.2]"
                                                        />
                                                    </button>
                                                )}
                                                rules={{ required: true }}
                                            />
                                            <Controller
                                                name="workStatus"
                                                control={control}
                                                render={({ field }) => (
                                                    <button
                                                        type="button"
                                                        className={watch("workStatus") === undefined || watch("workStatus") === true ? "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg hover:bg-gray-300" : "border-2 border-gray-300 flex flex-col justify-center items-start p-5 rounded-lg bg-gray-300"}
                                                        onClick={() => field.onChange(false)}
                                                    >
                                                        <span>
                                                            <span className="text-left m-0 block mb-4">Fresher</span>
                                                        </span>
                                                        <img
                                                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}fresher.svg`}
                                                            alt="fresher"
                                                            //width="50px"
                                                            //height="50px"
                                                            className=" h-6 w-[25.2]"
                                                        />
                                                    </button>
                                                )}
                                                rules={{ required: true }}
                                            />
                                        </div>
                                        {errors?.workStatus && <p className="font-normal text-xs text-red-500">{errors?.workStatus?.message}</p>}
                                    </div>
                                }

                                {((isContinueWithEmail && watch("role") === "jobSeeker") || watch("role") === "employer") && <div>
                                    <button className="bg-indigo-600 text-white font-bold rounded-lg w-full h-12" type="submit">Register now</button>
                                    <div className="flex justify-center font-semibold items-center text-sm mt-2">
                                        <span className=" text-[#94A3B8] mr-1">
                                            Already have an account?
                                        </span>
                                        <Link to='/login' className=" underline"> Login</Link>
                                    </div>
                                </div>}
                            </div>
                        </form>
                        {
                            !isContinueWithEmail && watch("role") === "jobSeeker" && <div className="grid grid-cols-1 mt-10 2xl:mt-12 gap-5">
                                <div className="text-sm font-semibold flex flex-col gap-2 justify-center">

                                    <div className=" grid grid-cols-1 gap-5">
                                        <div>
                                            <button className="bg-indigo-600 text-white font-bold rounded-lg w-full h-12 2xl:h-14 2xl:text-lg" type="button" onClick={() => setIsContinueWithEmail(true)}>Continue with email</button>
                                            <div className="flex justify-center items-center text-sm 2xl:text-base mt-2">
                                                <span className=" text-[#94A3B8] mr-1">
                                                    Already have an account?
                                                </span>
                                                <Link to='/login' className=" underline"> Login</Link>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <hr className=" w-2/5" />
                                            <span className=" py-3 2xl:text-base">OR</span>
                                            <hr className=" w-2/5" />
                                        </div>

                                        <div>
                                            <button className=" bg-white flex justify-center items-center drop-shadow-lg rounded-lg w-full h-12 2xl:14 2xl:text-lg"
                                                onClick={googleAuth}
                                            >
                                                <FcGoogle size={20} />
                                                <span className="ml-1">Sign up with Google</span>
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>}
                    </div>
                </div >
            </div >
            <Toaster />
        </>
    )
}

export default SignUp;