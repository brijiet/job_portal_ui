import Cookies from "js-cookie";
import { useAppDispatch } from "../../../..";
import { toast } from "react-toastify";
import { UpdateMailTemplate } from "../../../../store/reducers/RecruiterMails/updateMailTemplate";
import { removeYearText } from "../../../utils/utils";

const PreviewEmailTemplate = ({
  data,
  templateId,
  closeDialog,
  applicantMailId,
}: any) => {
  const dispatch = useAppDispatch();
  const updateExistingMailTemplate = () => {
    const recruiterUser = Cookies.get("userId");
    dispatch(
      UpdateMailTemplate({
        id: templateId,
        templateName: data?.templateName,
        fromEmailId: data?.fromEmailId,
        subject: data?.mailSubject,
        jobTitle: data?.jobTitle,
        jobSubject: data?.mailSubject,
        message: data?.message,
        signature: data?.signature,
        fromWorkExperience: {
          id: Number(data?.fromWorkExperience?.value),
        },
        toWorkExperience: {
          id: Number(data?.toWorkExperience?.value),
        },
        recruiterUser: {
          id: Number(recruiterUser),
        },
        currency: {
          id: Number(data?.currency?.value),
        },
        minSalaryRange: {
          id: Number(data?.fromSalaryRange?.value),
        },
        maxSalaryRange: {
          id: Number(data?.toSalaryRange?.value),
        },
        mailTemplateNumberSystem: {
          id: Number(data?.numberSystem?.value),
        },
        mailTemplateJobLocation:
          data?.jobLocation &&
          data?.jobLocation?.map((item: any) => {
            return { templateLocation: item.value };
          }),
        mailTemplateKeySkills:
          data?.keySkills &&
          data?.keySkills?.map((item: any) => {
            return { keySkills: item.value };
          }),
        applicantUser:
          applicantMailId &&
          applicantMailId
            .filter((items: any) => items.composeJobSeekerProfile)
            .map((item: any) => {
              return {
                composeJobSeekerProfile: Number(item.composeJobSeekerProfile),
              };
            }),
      })
    ).then(() => {
      toast.success("Mail template updated successsfully.");
      closeDialog(true);
    });
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-8 mb-2 mt-2">
          <div className="col-span-2">
            <label
              htmlFor="templateName"
              className="block text-sm font-medium leading-6 text-gray-900">
              Template Name
            </label>
          </div>
          <div className="col-span-6">{data?.templateName}</div>
        </div>
        <div className="col-span-full mb-4 mt-2 p-2 font-semibold bg-slate-200">
          Mail Body
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="fromEmailId"
              className="block text-sm font-medium leading-6 text-gray-900">
              From Email-Id
            </label>
          </div>
          <div className="col-span-6">{data?.fromEmailId}</div>
        </div>

        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="mailSubject"
              className="block text-sm font-medium leading-6 text-gray-900">
              Subject
            </label>
          </div>
          <div className="col-span-6">{data?.mailSubject}</div>
        </div>

        <div className="col-span-full mb-4 mt-2 p-2 font-semibold bg-slate-200">
          Job Detail
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium leading-6 text-gray-900">
              Job Title
            </label>
          </div>
          <div className="col-span-6">{data?.jobTitle}</div>
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="mailSubject"
              className="block text-sm font-medium leading-6 text-gray-900">
              Total Experience
            </label>
          </div>
          <div className="col-span-6">
            <div className="w-full justify-start  gap-5 inline-flex">
              <div className="w-full flex-col justify-start  gap-2 inline-flex">
                <div className="w-full">
                  {removeYearText(data?.fromWorkExperience?.label)} - {data?.toWorkExperience?.label}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="mailSubject"
              className="block text-sm font-medium leading-6 text-gray-900">
              CTC
            </label>
          </div>
          <div className="col-span-6">
            <div className="w-full justify-start  gap-5 inline-flex">
              <div className="w-full flex-col justify-start  gap-2 inline-flex">
                <div className="w-full">
                  {data?.currency?.label} {data?.fromSalaryRange?.label} To {data?.toSalaryRange?.label} {data?.numberSystem?.label}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="mailSubject"
              className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </label>
          </div>
          <div className="col-span-6">
            {data?.jobLocation?.map((location: any, index: number) => <span key={index}> {(index ? ', ' : '') + location?.label}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="keySkills"
              className="block text-sm font-medium leading-6 text-gray-900">
              Key Skills
            </label>
          </div>
          <div className="col-span-6">
            {data?.keySkills?.map((skill: any, index: number) => <span key={index}>{(index ? ', ' : '') + skill?.label}</span>)}
          </div>
        </div>

        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium leading-6 text-gray-900">
              Message
            </label>
          </div>
          <div className="col-span-6" dangerouslySetInnerHTML={{ __html: data?.message?.replace(/\n/g, "<br />") }}></div>
        </div>

        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="signature"
              className="block text-sm font-medium leading-6 text-gray-900">
              Signature
            </label>
          </div>
          <div className="col-span-6" dangerouslySetInnerHTML={{ __html: data?.signature?.replace(/\n/g, "<br />") }}></div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={() => {
                closeDialog(true);
              }}>
              Close
            </button>
            <button
              form="my-form"
              type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
              onClick={updateExistingMailTemplate}>
              Update
            </button>
          </div>
        </div>
      </div >
    </>
  );
};
export default PreviewEmailTemplate;
