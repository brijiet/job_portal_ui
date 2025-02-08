import { Controller, useForm } from 'react-hook-form';
import ApplyJobResume from './ApplyJobResume';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { useEffect } from 'react';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';
import { applyJobs } from '../../../../store/reducers/applyJobs/applyJobs';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useSearchParams } from 'react-router-dom';

const SendReply = () => {

  const { pathname } = useLocation();
  const pathName = atob(pathname.split('/')[3]).split('&')

  const jobId = pathName[0].split('=')[1];
  const seekerId = pathName[1].split('=')[1];
  const dispatch = useAppDispatch();
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const { success, userData } = useAppSelector((state) => state.getUser);

  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<any>({
    defaultValues: {},
  });

  // OnSubmit button
  const onSubmit = (data: any) => {

    dispatch(applyJobs({
      "jobSeekerProfile": userData?.id && Number(userData?.id),
      "jobs": jobId && Number(jobId),
      "questionnaireAnswer": [],
      "multipleChoiceQuestionnaireAnswer": [],
      "subject": data.subject,
      "message": data.message
    })).then((data: any) => {
      if (data?.payload?.count > 0) {
        toast.info("job already applied !!")
      } else {
        toast.success("job Applied successfully and message sent to recruiter !!")
      }
    });

  };

  useEffect(() => {
    if (jobDetail) {
      setValue('to', jobDetail?.company?.user?.map((item: any) => item?.email));
      setValue('from', userData?.email);
    }
  }, [jobDetail, setValue])

  useEffect(() => {
    if (Number(jobId)) {
      dispatch(getJobDetail(jobId));
    }
    dispatch(getUserData());


  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

  const sendReplyMessage = watch('sendReplyMessage')?.length;

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
        <div className="col-start-1 col-end-4">
          <div className="p-4 sticky top-[13%]">
          </div>
        </div>
        <div className="col-start-4 col-end-11">
          <div className="col-span-full border-b-4 border-indigo-500">
            <label htmlFor="composeYourMessage" className="block text-2xl  leading-10 text-gray-900 font-bold">Compose your message</label>
          </div>
          <div className="col-span-full mb-4 bg-yellow-100">
            <label htmlFor="composeYourMessage" className="block text-sm p-2 text-gray-900 ml-4">Click here to see message from recruiter :</label>
          </div>
          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">To</label>
              <div className="mt-1">
                <Controller
                  name="to"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                      readOnly={true}
                    />
                  )}
                />
                {errors.to && <p className="font-normal text-xs text-red-500">{errors.to.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">From</label>
              <div className="mt-1">
                <Controller
                  name="from"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                      readOnly={true}
                    />
                  )}
                />
                {errors.from && <p className="font-normal text-xs text-red-500">{errors.from.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
              <div className="mt-1">
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                      readOnly={false}
                    />
                  )}
                />
                {errors.subject && <p className="font-normal text-xs text-red-500">{errors.subject.message as string}</p>}
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label htmlFor="startTyping" className="block text-sm font-medium leading-6 text-gray-900">Start typing your message here...</label>
              <div className="mt-1">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      maxLength={5000}
                      className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 outline-none mb-1"
                      placeholder="Type here..."
                      rows={4}
                    ></textarea>

                  )}
                />
                {errors.message && <p className="font-normal text-xs text-red-500">{errors.message.message as string}</p>}

                <div className="flex justify-between items-center">
                  {!errors.sendReplyMessage ?
                    <span className="text-xs font-light text-gray-600">{sendReplyMessage ? 5000 - sendReplyMessage : 5000} character(s) left</span> : <span></span>}
                  {
                    sendReplyMessage ?
                      <span className="text-gray-500 border-b-2 text-sm font-semibold border-gray-500 leading-none cursor-pointer" onClick={() => reset()}>Clear</span> : <span></span>
                  }
                </div>
              </div>
            </div>

            <div className="col-span-full mb-4">
              <ApplyJobResume />
            </div>

            <div className="mt-5 flex justify-end items-center">
              <div>
                <button
                  form='my-form' type="submit"
                  className="rounded-3xl bg-blue-500 text-white px-5 py-1.5 mr-3"
                >
                  Send Message
                </button>
                {/* <button
                  form='my-form' type="submit"
                  className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
                >
                  Send Message Preview
                </button> */}
              </div>
            </div>
          </form>
        </div>
        <div className="col-start-11 col-end-13">
        </div>
      </div >
      <ToastContainer />
    </>
  )
}

export default SendReply;

