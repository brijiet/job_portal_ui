import { useAppDispatch } from "../../../..";
import { MailTemplateUpdate } from "../../../../store/reducers/RecruiterMails/mailTemplate";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const PreviewCreateNewMailTemplate = ({
  applicantMailId,
  closeDialog,
  data,
  setmailTemplateHeading,
}: any) => {
  const dispatch = useAppDispatch();
  const onMailTempaleteSubmit = () => {
    const recruiterUser = Cookies.get("userId");
    dispatch(
      MailTemplateUpdate({
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
      toast.success("Mail template created successfully.");
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
                  From {data?.fromWorkExperience?.label} To {data?.toWorkExperience?.label}
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
                  In {data?.currency?.label} {data?.fromSalaryRange?.label} To {data?.toSalaryRange?.label} {data?.numberSystem?.label}
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
            {data?.jobLocation?.map((location: any) => {
              return location?.label + ", ";
            })}
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
            {data?.keySkills?.map((skill: any) => {
              return skill?.label + ", ";
            })}
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
          <div className="col-span-6" dangerouslySetInnerHTML={{ __html:data?.message?.replace(/\n/g, "<br />") }}></div>
        </div>

        <div className="grid grid-cols-8 mb-2">
          <div className="col-span-2">
            <label
              htmlFor="signature"
              className="block text-sm font-medium leading-6 text-gray-900">
              Signature
            </label>
          </div>
          <div className="col-span-6" dangerouslySetInnerHTML={{ __html:data?.signature?.replace(/\n/g, "<br />") }}></div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={() => {
                setmailTemplateHeading("Edit Mail Template");
              }}>
              Edit
            </button>
            <button
              form="my-form"
              type="submit"
              onClick={onMailTempaleteSubmit}
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCreateNewMailTemplate;
