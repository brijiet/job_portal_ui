import { useEffect, type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { emailDurationListing, postEmailAndMobileNotification, randomNumberInRange } from '../../utils/utils';
import { toast } from 'react-toastify';
import Select from 'react-select';
interface IFormInputs {
  jobRecommended: { value: string; label: string; }
  jobAlert: { value: string; label: string; }
  mobileNotification: any
}

const SignUpSchema = yup
  .object({
    jobRecommended: yup.object().shape({
      value: yup.string().required("Please select job recommended"),
      label: yup.string().required("Please select job recommended"),
    }),
    jobAlert: yup.object().shape({
      value: yup.string().required("Please select job alerts"),
      label: yup.string().required("Please select job alerts"),
    }),
    mobileNotification: yup.boolean().default(false)
  })
  .required();

const ImmediateSettings = ({ closeModal, databaseOptions, setMobileNotificationOptions, setIsOpen }: any) => {

  const [emailDuration, setEmailDuration] = useState<any>([])
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignUpSchema)
  });

  const onSubmitNotification = (data: IFormInputs) => {
    console.log({
      "jobRecommended": data.jobRecommended.value,
      "jobAlert": data.jobAlert.value,
      "mobileNotification": data.mobileNotification
    });

    postEmailAndMobileNotification(
      {
        "jobRecommended": data.jobRecommended.value,
        "jobAlert": data.jobAlert.value,
        "mobileNotification": data.mobileNotification
      }).then((data) => {
        toast.success("Email and mobile notification changed")
        setMobileNotificationOptions(randomNumberInRange(1, 50))
        setIsOpen(false);
      });
  }

  useEffect(() => {
    databaseOptions[0]?.jobRecommended && setValue("jobRecommended", { label: databaseOptions[0]?.jobRecommended?.title, value: databaseOptions[0]?.jobRecommended?.id })
    databaseOptions[0]?.jobAlert && setValue("jobAlert", { label: databaseOptions[0]?.jobAlert?.title, value: databaseOptions[0]?.jobAlert?.id })
    databaseOptions[0]?.mobileNotification && setValue("mobileNotification", databaseOptions[0]?.mobileNotification)

  }, [databaseOptions])

  useEffect(() => {
    (async () => {
      const emailDurationList = await emailDurationListing()
      if (Object.keys(emailDurationList)?.length) {
        setEmailDuration(emailDurationList as any)
      }
    })();
  }, []);


  console.log("mobileNotification watch==", watch("mobileNotification"))
  return (
    <>
      <form id="my-form-sub" onSubmit={handleSubmit(onSubmitNotification)}>
        <div className="w-full p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Which emails and mobile notification do you want to receive?
          </h1>
          <p className="mb-2">Select the notifications and emails you want to receive. By selecting a weekly digest option, you may also decide to lessen the frequency of specific emails. </p>
        </div>
        <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
          <div className="flex items-left justify-between mb-4 align-middle">
            <div className="flex items-start justify-between">
              <div className="flex font-bold align-middle">
                <div>Job Opportunities
                </div>
              </div>
            </div>
          </div>
          <div className=" text-medium text-gray-700 mb-3">
            This section includes all emails and notifications related to job recommendations.
          </div>
          <div className="w-full py-2 grid grid-cols-2">
            <div className="text-sm text-gray-500">Email Type</div>
            <div className="text-sm text-gray-500">Select Duration</div>
          </div>
          <div className="w-full py-2 grid grid-cols-2">
            <div className=" text-medium text-gray-500">Job recommended by Job Portal (basis your profile data and activity on the platform).</div>
            <div className="">
              <Controller
                control={control}
                name="jobRecommended"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    options={emailDuration?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("jobRecommended")}
                  />
                )}
              />
              {errors.jobRecommended && <p className="font-normal text-xs text-red-500">{errors.jobRecommended.message as string}</p>}
            </div>
          </div>
          <div className="w-full py-2 grid grid-cols-2">
            <div className=" text-medium text-gray-500">Job alert created by you</div>
            <div className="">
              <Controller
                control={control}
                name="jobAlert"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    options={emailDuration?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("jobAlert")}
                  />
                )}
              />
              {errors.jobRecommended && <p className="font-normal text-xs text-red-500">{errors.jobRecommended.message as string}</p>}
            </div>
          </div>
          <Controller
            name="mobileNotification"
            defaultValue={false}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='hidden'
              />
            )}
          />
          {/* <div className="w-full grid grid-cols-2 py-2">
            <div className="text-medium text-gray-500">Send me mobile notification for job recommendations.</div>
            <div className="">
              <label className="relative inline-flex items-center cursor-pointer">
                <Controller
                  name="mobileNotification"
                  defaultValue={watch("mobileNotification")}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='checkbox'
                      defaultChecked={watch("mobileNotification")}
                      className="sr-only peer"
                    />
                  )}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                {watch("mobileNotification") && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">on</span>}
                {!watch("mobileNotification") && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">off</span>}
              </label>
            </div>
          </div> */}
          <div className="mt-5 flex justify-end items-center">
            <div>
              <button
                type="button"
                className="mr-3"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                form='my-form-sub' type="submit"
                className="rounded-3xl bg-blue-500 text-white px-8  py-1.5"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ImmediateSettings