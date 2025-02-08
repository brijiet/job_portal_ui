import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../..';

const ApplyJobReview = ({ watch, jobDetail, setToggleResumeUpload, setToggleQuestionnaire }: any) => {

  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumeCompletePath, setResumeCompletePath] = useState<string>('');
  const [completeData, setCompleteData] = useState([]);
  const { success: successProfile, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  useEffect(() => {
    setResumeFile(profileDashboard?.resumeFile)
    setResumeCompletePath(`${process.env.REACT_APP_RESUME_FILE_LOCATION}/${profileDashboard?.resumePath}`)
  }, [profileDashboard]);

  const resumeFileSplit = resumeFile?.split('.');
  let resumeFilePrefix;
  let resumeFileSuffix;
  if (resumeFile) {
    resumeFilePrefix = resumeFileSplit[0];
    resumeFileSuffix = resumeFileSplit[1];
  }

  const handleNextReviewToResume = () => {
    setToggleResumeUpload(false);
    setToggleQuestionnaire(false);
  }

  return (
    <>
      <div className="p-5 bg-white rounded-xl border border-[#E0E7FF] mt-14 mb-10 w-full">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="font-bold leading-none">Resume</h1>
          <span className="border-b border-[#475569] text-[#475569] leading-none cursor-pointer" onClick={handleNextReviewToResume}>Edit</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="border-2 border-[#E0E7FF] rounded-lg shadow-sm py-3 px-3 flex justify-start items-center w-full">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}PDFIcon.svg`} alt="PDFIcon" />
            <h1 className="ml-2">{resumeFilePrefix}</h1>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white rounded-xl mb-10 w-full  border border-[#E0E7FF] relative">
        <span className="border-b border-[#475569] text-[#475569] leading-none absolute right-0 mr-5 cursor-pointer" onClick={() => setToggleQuestionnaire(false)}>Edit</span>
        {watch("questionnaire").map((item: any, index: number) => <>
          {item.questionType === "Descriptive" && <div className="flex flex-col mb-10">
            <label><span className="mr-2">{index + 1}/10</span><span className="font-bold">
              {jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.question}</span></label>
            <h1 className="mt-3">{item.descriptive}</h1>
          </div>}
          {item.questionType === "NumberChoice" && <div className="flex flex-col mb-10">
            <label><span className="mr-2">{index + 1}/10</span><span className="font-bold">{jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.question}</span></label>
            <h1 className="mt-3">{item.numberChoice}</h1>
          </div >}
          {item.questionType === "SingleChoice" && <div className="flex flex-col mb-10">
            <p><span className="mr-2">{index + 1}/10</span>
              <span className="font-bold mr-2">{jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.question}</span>
              {/* {item.singleChoice && <span className="text-[#94A3B8] text-sm">(Optional)</span>} */}
            </p>
            <h1 className="mt-3">
              {jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0].singleSelection.filter(((itemSubSub: any) => itemSubSub.id === Number(item?.singleChoice)))[0]?.option}
            </h1>
          </div>}
          {item.questionType === "MultipleChoice" && <div className="flex flex-col mb-10">
            <p><span className="mr-2">{index + 1}/10</span><span className="font-bold">{jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.question}</span></p>
            <div className="mt-3 flex flex-col gap-2">
              {Array.isArray(item?.multipleChoice) ? item?.multipleChoice?.map((itemOption: any, key: any) => (<h1>
                {jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.multipleSelection.filter(((itemSubSub: any) => itemSubSub?.id === Number(itemOption))).map((itemSuperSub: any) => itemSuperSub?.option)}
              </h1>
              )) : <h1>{jobDetail?.questionnaire?.filter((itemSub: any) => itemSub?.id === Number(item?.question))[0]?.multipleSelection.filter(((itemSubSub: any) => itemSubSub?.id === Number(item?.multipleChoice))).map((itemSuperSub: any) => itemSuperSub?.option)}</h1>}
            </div>
          </div>}
        </>)}
      </div >
    </>
  )
}

export default ApplyJobReview