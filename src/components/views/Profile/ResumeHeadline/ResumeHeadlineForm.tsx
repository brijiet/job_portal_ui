import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from '../../../../';
import { resumeHeadlineUpdate } from '../../../../store/reducers/jobSeekerProfile/profileResumeHeadline';

interface IFormInputs {
  resumeHeadline: string | null
}

type Parameters = {
  resumeHeadlineSummery: string,
  id: number,
  defaultResumeHeadline: string,
  closeDialog: () => void
}

const SignUpSchema = yup
  .object({
    resumeHeadline: yup.string().label("Resume headline").required().test(
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

const ResumeHeadlineForm: FC<Parameters> = ({ resumeHeadlineSummery, id, defaultResumeHeadline, closeDialog }) => {
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
    setValue('resumeHeadline', defaultResumeHeadline);
  }, [setValue, defaultResumeHeadline]);

  const onSubmit = (data: IFormInputs) => {
    dispatch(resumeHeadlineUpdate({ id, resumeHeadline: data.resumeHeadline }));
  }

  // const handleDelete = () => {
  //   dispatch(resumeHeadlineUpdate({ id, resumeHeadline: null }));
  // }

  const watchResumeHeadline = watch('resumeHeadline')?.length;

  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 mb-5">
        {resumeHeadlineSummery}
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
            {...register("resumeHeadline")}
            rows={4}
          ></textarea>
          {
            errors.resumeHeadline
            &&
            <p className="font-normal text-xs text-red-500 absolute">
              {errors.resumeHeadline.message}
            </p>
          }
          <div className="flex justify-between items-center">
            {!errors.resumeHeadline ?
              <span className="text-xs font-light text-gray-600">{watchResumeHeadline ? 1000 - watchResumeHeadline : 1000} character(s) left</span> : <span></span>}
            {
              watchResumeHeadline ?
              <span className="text-gray-500 border-b-2 text-sm font-semibold border-gray-500 leading-none cursor-pointer" onClick={() => setValue('resumeHeadline', "")}>Clear</span>:<span></span>
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
              className={watchResumeHeadline === 0 || watch('resumeHeadline') === null ? "rounded-3xl bg-blue-100 text-white px-5 py-1.5" : "rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
              disabled={watchResumeHeadline === 0 || watch('resumeHeadline') === null}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResumeHeadlineForm;