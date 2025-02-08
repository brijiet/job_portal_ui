import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../../';
import { profileDashboardUpdate } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';

interface IFormInputs {
    about: string | null
}

type Parameters = {
    testAbout: string,
    id: number,
    defaultAbout: string,
    closeDialog: () => void
}

const SignUpSchema = yup
    .object({
        about: yup.string().label("Profile summary").required().test(
            'len', 'Minimum 50 characters are required',
            (data) => {
                if (data.length < 50) {
                    return false
                } else {
                    return true
                }
            }
        ).nullable(),
    })
    .required();

const AboutForm: FC<Parameters> = ({ testAbout, id, defaultAbout, closeDialog }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<IFormInputs>({
        resolver: yupResolver(SignUpSchema)
    });
console.log(watch("about"))
    useEffect(() => {
        setValue('about', defaultAbout);
    }, [setValue, defaultAbout]);

    const onSubmit = (data: IFormInputs) => {
        dispatch(profileDashboardUpdate({ id, about: data.about }));
    }

    // const handleDelete = () => {
    //     dispatch(profileDashboardUpdate({ id, about: null }));
    // }

    const watchAbout = watch('about')?.length;

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-5">
                {testAbout}
            </span>
            <form id="my-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <textarea
                        id="message"
                        maxLength={150}
                        className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none mb-1"
                        placeholder="Type here..."
                        {...register("about")}
                        rows={4}
                    ></textarea>
                    {
                        errors?.about
                        &&
                        <p className="font-normal text-xs text-red-500 absolute">
                            {errors?.about?.message}
                        </p>
                    }
                    <div className="flex justify-between items-center">
                        {!errors?.about ?
                            <span className="text-xs font-light text-gray-600">{watchAbout ? 150 - watchAbout : 150} character(s) left</span>:<span></span>
                        }
                         {
                            watchAbout ?
                            <span className="text-gray-500 border-b-2 text-sm font-semibold border-gray-500 leading-none cursor-pointer" onClick={()=>setValue('about', "")}>Clear</span>:<span></span>
                        }
                    </div>

                </div>
                <div className="mt-5 flex justify-end items-center">
                    <div>
                        <button
                            type="button"
                            className="mr-3"
                            onClick={closeDialog}
                        >
                            Cancel
                        </button>
                        <button
                            form='my-form' type="submit"
                            className={watchAbout === 0 || watch('about') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
                            disabled={watchAbout === 0 || watch('about') === null}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AboutForm;