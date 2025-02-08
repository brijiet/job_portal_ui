import { removeYearText } from "../../../utils/utils";

const PreviewUpdateMailTemplate = ({
  data,
  closeDialog,
  setmailTemplateHeading,
}: any) => {
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
          <div className="col-span-6">{data?.jobSubject}</div>
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
                  {removeYearText(data?.fromWorkExperience?.title)} - {data?.toWorkExperience?.title}
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
                  {data?.currency?.title} {data?.maxSalaryRange?.title} To {data?.minSalaryRange?.title} {data?.mailTemplateNumberSystem?.title}
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
            {data?.mailTemplateJobLocation?.map((location: any, index: number) => <span key={index}>{(index ? ', ' : '') + location?.templateLocation?.title}</span>)}
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
            {data?.mailTemplateKeySkills?.map((skill: any, index: number) => <span key={index}> {(index ? ', ' : '') + skill?.keySkills?.title}</span>)}
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
                setmailTemplateHeading("Update Mail Template");
              }}>
              Update
            </button>
            <button
              form="my-form"
              type="submit"
              onClick={() => {
                closeDialog(true);
              }}
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PreviewUpdateMailTemplate;
