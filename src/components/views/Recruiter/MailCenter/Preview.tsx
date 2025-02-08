import { useEffect, type FC, useState, useRef } from "react";
import { useAppDispatch } from "../../../../";
import { composeMailUpdate } from "../../../../store/reducers/RecruiterMails/composeMail";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { MailTemplateUpdate } from "../../../../store/reducers/RecruiterMails/mailTemplate";
import { removeYearText } from "../../../utils/utils";

const ComposePreview = ({
  profileDashboard,
  applicantMailId,
  formSubmitData,
  closeDialog,
  composePreviewTitle,
  mulitUser
}: any) => {
  const [mailLinkPath, setMailLinkPath] = useState([{
    sendReply: "",
    applyConfirmation: "",
  }]);

  // creating URL

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onComposeMailSubmit = () => {
    const recruiterUser = Cookies.get("userId");
    if (formSubmitData.saveAsTemplate) {
      dispatch(
        MailTemplateUpdate({
          templateName: "Default Template",
          fromEmailId: formSubmitData?.id,
          subject: formSubmitData?.mailSubject,
          jobTitle: formSubmitData?.jobTitle,
          jobSubject: formSubmitData?.mailSubject,
          message: formSubmitData?.message,
          signature: formSubmitData?.signature,
          fromWorkExperience: {
            id: Number(formSubmitData?.fromWorkExperience?.value),
          },
          toWorkExperience: {
            id: Number(formSubmitData?.toWorkExperience?.value),
          },
          recruiterUser: {
            id: Number(recruiterUser),
          },
          currency: {
            id: Number(formSubmitData?.currency?.value),
          },
          minSalaryRange: {
            id: Number(formSubmitData?.fromSalaryRange?.value),
          },
          maxSalaryRange: {
            id: Number(formSubmitData?.toSalaryRange?.value),
          },
          mailTemplateNumberSystem: {
            id: Number(formSubmitData?.numberSystem?.value),
          },
          mailTemplateJobLocation:
            formSubmitData?.location &&
            formSubmitData?.location?.map((item: any) => {
              return { templateLocation: item.value };
            }),
          mailTemplateKeySkills:
            formSubmitData?.keySkills &&
            formSubmitData?.keySkills?.map((item: any) => {
              return { keySkills: item.value };
            }),
          applicantUser: [],
        })
      ).then(() => {
        dispatch(
          composeMailUpdate({
            recruiterUser: {
              id: Number(recruiterUser),
            },
            mailTemplate: formSubmitData?.selectTemplate && { id: Number(formSubmitData?.selectTemplate) },
            fromEmailId: formSubmitData.fromEmailId,
            subject: formSubmitData.mailSubject,
            jobTitle: formSubmitData.jobTitle,
            jobSubject: formSubmitData.jobSubject,
            message: formSubmitData.message,
            signature: formSubmitData.signature,
            fromWorkExperience: formSubmitData?.fromWorkExperience?.value,
            toWorkExperience: formSubmitData?.toWorkExperience?.value,
            currency: formSubmitData?.currency?.value,
            minSalaryRange: formSubmitData?.fromSalaryRange?.value,
            maxSalaryRange: formSubmitData?.toSalaryRange?.value,
            composeNumberSystem: formSubmitData?.numberSystem?.value,
            composeJobLocation: formSubmitData?.location.map((item: any) => { return ({ composeLocation: item.value }) }),
            composeMailKeySkills: formSubmitData?.keySkills.map((item: any) => { return ({ composeKeySkills: item.value }) }),
            composeMailJobs: [{ composeJob: formSubmitData.selectJob }],
            applicantUser:
              applicantMailId &&
              applicantMailId
                ?.filter((items: any) => items?.composeJobSeekerProfile)
                ?.map((item: any) => {
                  return {
                    composeJobSeekerProfile: Number(
                      item?.composeJobSeekerProfile
                    ),
                  };
                }),
          })
        ).then(() => {
          navigate("/cvZone/mailCenter");
        });
      });
    } else {
      dispatch(
        composeMailUpdate({
          recruiterUser: {
            id: Number(recruiterUser),
          },
          mailTemplate: formSubmitData?.selectTemplate && { id: Number(formSubmitData?.selectTemplate) },
          fromEmailId: formSubmitData.fromEmailId,
          subject: formSubmitData.mailSubject,
          jobTitle: formSubmitData.jobTitle,
          jobSubject: formSubmitData.jobSubject,
          message: formSubmitData.message,
          signature: formSubmitData.signature,
          fromWorkExperience: formSubmitData?.fromWorkExperience?.value,
          toWorkExperience: formSubmitData?.toWorkExperience?.value,
          currency: formSubmitData?.currency?.value,
          minSalaryRange: formSubmitData?.fromSalaryRange?.value,
          maxSalaryRange: formSubmitData?.toSalaryRange?.value,
          composeNumberSystem: formSubmitData?.numberSystem?.value,
          composeJobLocation: formSubmitData?.location.map((item: any) => { return ({ composeLocation: item.value }) }),
          composeMailKeySkills: formSubmitData?.keySkills.map((item: any) => { return ({ composeKeySkills: item.value }) }),
          composeMailJobs: [{ composeJob: formSubmitData.selectJob }],
          applicantUser:
            applicantMailId &&
            applicantMailId
              ?.filter((items: any) => items)
              ?.map((item: any) => {
                return {
                  composeJobSeekerProfile: Number(
                    item
                  ),
                };
              }),
        })
      ).then(() => {
        navigate("/cvZone/mailCenter");
      });
    }
  };

  useEffect(() => {
    setMailLinkPath([{
      ...mailLinkPath,
      sendReply: `${process.env.REACT_APP_PATH}/sendReply/${btoa(
        `jobId=${profileDashboard?.jobs?.id}&seekerId=${profileDashboard?.jobSeekerProfile?.user?.id}`
      )}`,
      applyConfirmation: `${process.env.REACT_APP_PATH
        }/applyConfirmation/${btoa(
          `jobId=${profileDashboard?.jobs?.id}&seekerId=${profileDashboard?.jobSeekerProfile?.user?.id}`
        )}`,
    }]);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-8 mb-4 mt-2 p-2 font-semibold bg-slate-200">
        <div className="col-span-2">
          <label
            htmlFor="mailSubject"
            className="block text-sm font-medium leading-2 text-gray-900">
            Subject
          </label>
        </div>
        <div className="col-span-6">{formSubmitData?.mailSubject}</div>
      </div>
      <div className="col-span-full p-2">
        <div className="content flex py-2">
          <div className="item-body px-2 ">
            <h1 className="text-xl font-bold">{formSubmitData?.jobTitle}</h1>
            <span className="font-bold">Job Subject: </span>{removeYearText(formSubmitData?.jobSubject)}
            <br />
            <span className="font-bold">Experience: </span>
            {removeYearText(formSubmitData?.fromWorkExperience?.label)} -{" "}
            {formSubmitData?.toWorkExperience?.label}
            <br />
            <span className="font-bold">Annual salary: </span>
            {formSubmitData?.currency?.label}
            {formSubmitData?.fromSalaryRange?.label} -{" "}
            {formSubmitData?.toSalaryRange?.label}{" "}
            {formSubmitData?.numberSystem?.label}

            <br />
            <span className="font-bold">Job Location: </span>
            {formSubmitData?.location?.map((item: any, index: number) => <span key={index}>{(index ? ', ' : '') + item.label}</span>)}
            <br />
            <span className="font-bold">Key Skills: </span>
            {formSubmitData?.keySkills?.map((item: any, index: number) => <span key={index}>{(index ? ', ' : '') + item.label}</span>)}
            <br />
          </div>
        </div>
      </div>
      <div className="col-span-full mb-4 p-2">
        <div className="content flex py-2">
          <div className="item-body px-2 ">
            <span className="font-bold">Message: </span>
            <span dangerouslySetInnerHTML={{ __html: formSubmitData?.message?.replace(/\n/g, "<br />") }}></span>
            <p className="py-2"></p>
            <span className="font-bold">Signature: </span>
            <span dangerouslySetInnerHTML={{ __html: formSubmitData?.signature?.replace(/\n/g, "<br />") }}></span>
            <br />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end items-center">
        <div>
          <button
            form="my-form"
            type="button"
            onClick={onComposeMailSubmit}
            className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposePreview;
