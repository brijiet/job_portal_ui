import React, { useEffect, useState } from 'react'
import TickRecruiter from '../../../commonComponents/TickRecruiter'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const JobLeftPanel = ({ jobTitle, status }: any) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postBack, setPostBack] = useState({ jobDetailsURL: "", requirementsURL: "", companyURL: "", recruiterURL: "", questionnaireURL: "", responseURL: "", previewURL: "" });

  const location = useLocation();
  const [pageStatus, setPageStatus] = useState({ jobDetails: "", requirements: "", company: "", recruiter: "", questionnaire: "", response: "", preview: "" })
  const pageName = { jobDetails: "pending", requirements: "pending", company: "pending", recruiter: "pending", questionnaire: "pending", response: "pending", preview: "pending" }

  if (location.pathname === '/postJob/jobDetails/' || location.pathname === '/postJob/jobDetails' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/jobDetails') {
    pageName.jobDetails = "working";
  } else if (location.pathname === '/postJob/requirements/' || location.pathname === '/postJob/requirements' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/requirements') {
    pageName.jobDetails = "done";
    pageName.requirements = "working";
  } else if (location.pathname === '/postJob/company/' || location.pathname === '/postJob/company' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/company') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "working";
  } else if (location.pathname === '/postJob/recruiter/' || location.pathname === '/postJob/recruiter' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/recruiter') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "working";

  } else if (location.pathname === '/postJob/response/' || location.pathname === '/postJob/response' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/response') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "done";
    pageName.response = "working";
  } else if (location.pathname === '/postJob/questionnaire/' || location.pathname === '/postJob/questionnaire' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/questionnaire') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "done";
    pageName.response = "done";
    pageName.questionnaire = "working";
  } else if (location.pathname === '/postJob/preview/' || location.pathname === '/postJob/preview' || location.pathname.substring(0, location.pathname.lastIndexOf('/')) === '/postJob/preview') {
    pageName.jobDetails = "done";
    pageName.requirements = "done";
    pageName.company = "done";
    pageName.recruiter = "done";
    pageName.response = "done";
    pageName.questionnaire = "done";
    pageName.preview = "working";


  }
  useEffect(() => {
    setPageStatus(pageName);
    if (Number(postId)) {
      setPostBack({ jobDetailsURL: `/postJob/jobDetails/${postId}`, requirementsURL: `/postJob/requirements/${postId}`, companyURL: `/postJob/company/${postId}`, recruiterURL: `/postJob/recruiter/${postId}`, questionnaireURL: `/postJob/questionnaire/${postId}`, responseURL: `/postJob/response/${postId}`, previewURL: `/postJob/preview/${postId}` })
    }
  }, []);

  const returnBack = (returnURL: string) => {
    if (returnURL !== '#')
      navigate(returnURL);
  }

  return (
    <>
      <div className="border border-[#E0E7FF] rounded-lg bg-white px-10 py-10 sticky top-[13%]">
        <div className=" text-black text-xl font-medium mb-4  leading-normal tracking-tight">{jobTitle ? jobTitle : "Job Title"}{status?.title ? ' - ' + status?.title : ""}</div>
        <div className=" text-slate-500 text-base font-normal  leading-snug tracking-tight">Please enter the details precisely to get best talent for the job</div>

        <hr className="my-10" />
        <ul className="max-w-md list-inside">

          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="1" tickStatus={pageStatus.jobDetails} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Job Details</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.jobDetailsURL)} >Edit</u>}
            </div>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="2" tickStatus={pageStatus.requirements} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Requirements</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.requirementsURL)} >Edit</u>}
            </div>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="3" tickStatus={pageStatus.company} />
            <div className="text-sm  w-full flex justify-between">
              <span className="font-semibold">Company</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.companyURL)} >Edit</u>}
            </div>

          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="4" tickStatus={pageStatus.recruiter} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Recruiter</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.recruiterURL)} >Edit</u>}
            </div>
          </li>

          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="5" tickStatus={pageStatus.response} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Response</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.responseURL)} >Edit</u>}
            </div>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="6" tickStatus={pageStatus.questionnaire} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Questionnaire</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.questionnaireURL)} >Edit</u>}
            </div>
          </li>
          <li className="flex items-center  mb-8">
            <TickRecruiter tickNumber="7" tickStatus={pageStatus.preview} />
            <div className="text-sm w-full flex justify-between">
              <span className="font-semibold">Preview</span></div>
            <div className="text-sm justify-between cursor-pointer">
              {!Number.isNaN(Number(postId)) && <u className="text-[#475569]" onClick={() => returnBack(postBack.previewURL)} >View</u>}
            </div>
          </li>
        </ul>

      </div>
    </>
  )
}

export default JobLeftPanel