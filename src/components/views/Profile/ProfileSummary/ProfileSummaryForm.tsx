import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../../';
import { profileDashboardUpdate } from '../../../../store/reducers/jobSeekerProfile/profileDashboardUpdate';

interface IFormInputs {
    profileSummary: string | null
}

type Parameters = {
    testSummary: string,
    id: number,
    defaultProfileSummary: string,
    closeDialog: () => void
}

const SignUpSchema = yup
    .object({
        profileSummary: yup.string().label("Profile summary").required().test(
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

const ProfileSummaryForm: FC<Parameters> = ({ testSummary, id, defaultProfileSummary, closeDialog }) => {
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

    useEffect(() => {
        setValue('profileSummary', defaultProfileSummary);
    }, [setValue, defaultProfileSummary]);

    const onSubmit = (data: IFormInputs) => {
        dispatch(profileDashboardUpdate({ id, profileSummary: data.profileSummary }));
    }

    // const handleDelete = () => {
    //     dispatch(profileDashboardUpdate({ id, profileSummary: null }));
    // }

    const watchProfileSummary = watch('profileSummary')?.length;

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-3">
                {testSummary}
            </span>
            <form id="my-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <textarea
                        id="message"
                        maxLength={1000}
                        className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none mb-1"
                        placeholder="Type here..."
                        {...register("profileSummary")}
                        rows={4}
                    ></textarea>
                    {
                        errors.profileSummary
                        &&
                        <p className="font-normal text-xs text-red-500 absolute">
                            {errors.profileSummary.message}
                        </p>
                    }
                    <div className="text-xs font-light text-gray-600 text-right flex justify-between items-center">
                        {!errors.profileSummary ? <span>{watchProfileSummary ? 1000 - watchProfileSummary : 1000} character(s) left</span> : <span></span>}
                        {
                            watchProfileSummary ?
                                <span className="text-gray-500 border-b-2 text-sm font-semibold border-gray-500 leading-none cursor-pointer" onClick={() => setValue('profileSummary', "")}>Clear</span> : <span></span>
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
                            className={watchProfileSummary === 0 || watch('profileSummary') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
                            disabled={watchProfileSummary === 0 || watch('profileSummary') === null}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileSummaryForm;