import { toast } from 'react-toastify';
import { IFormApplyJobsWithoutQuestionnaire } from '../../../../interface/jobSeeker/applyJobs';
import { applyJobsSchema } from '../../../../schema/applyJobs';
import { applyJobs } from '../../../../store/reducers/applyJobs/applyJobs';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../../../..';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ApplyJobReview from './ApplyJobReview';
import ApplyJobResume from './ApplyJobResume';
import QuestionnaireDescriptiveField from './QuestionnaireDescriptiveField';
import QuestionnaireMultipleChoice from './QuestionnaireMultipleChoice';
import QuestionnaireSingleChoice from './QuestionnaireSingleChoice';
import QuestionnaireNumberChoice from './QuestionnaireNumberChoice';

const ApplyJobs = ({ jobDetail, toggleJobApply, toggleResumeUpload, toggleQuestionnaire, handleDiscard, handleNext, setToggleQuestionnaire, setToggleResumeUpload }: any) => {

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [checkboxRequired, isCheckboxRequired] = useState(true);
  const [checkResume, isCheckResume] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormApplyJobsWithoutQuestionnaire>({
    resolver: yupResolver(applyJobsSchema) as any,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "questionnaire",
  });
  const onSubmit = (data: IFormApplyJobsWithoutQuestionnaire) => {

    const userId = Cookies.get("userId");
    const selectedQuestionnaireAnswer: any = [];
    const selectedMultipleChoiceQuestionnaireAnswer: any = [];

    data?.questionnaire && data?.questionnaire?.filter((item: any) => item?.questionType !== 'MultipleChoice' && selectedQuestionnaireAnswer?.push({ questionnaire: item?.question, answer: item?.numberChoice ? item?.numberChoice : item?.descriptive ? item?.descriptive : item?.singleChoice ? item?.singleChoice : undefined }));
    data?.questionnaire && data?.questionnaire?.filter((item: any) => item?.questionType === 'MultipleChoice' &&
      Array.isArray(item?.multipleChoice) ?
      item?.multipleChoice?.map((item1: any) => selectedMultipleChoiceQuestionnaireAnswer?.push({ multipleChoiceQuestionnaire: item1, answer: item1 })) :
      selectedMultipleChoiceQuestionnaireAnswer?.push({ multipleChoiceQuestionnaire: item?.multipleChoice, answer: item?.multipleChoice }));

    dispatch(applyJobs({
      "jobSeekerProfile": userId && parseInt(userId),
      "jobs": parseInt(jobDetail?.id),
      "questionnaireAnswer": selectedQuestionnaireAnswer,
      "multipleChoiceQuestionnaireAnswer": selectedMultipleChoiceQuestionnaireAnswer
    })).then((data: any) => {
      if (data?.payload?.count > 0) {
        toast.info("job already applied !!")
      } else {
        toast.success("job Applied successfully !!")
      }
    });
  }

  const handleNextMessage = () => {
    toast.info("Please upload the resume !!")
  }

  return (
    <div className="col-start-1 col-end-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-start items-center relative">
          {!toggleJobApply ?
            <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">1</span>
            :
            <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}tick_icons.svg`} alt="TickIcons" className='w-3 h-3' />
            </span>
          }
          <span className="absolute top-10 text-[#64748B] text-sm">Resume</span>
        </div>
        <hr className="w-32 bg-[#E0E7FF]" />
        <div className="flex flex-col justify-start items-center relative">
          {!toggleResumeUpload ?
            <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">2</span>
            :
            <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}tick_icons.svg`} alt="TickIcons" className='w-3 h-3' />
            </span>
          }
          <span className="absolute top-10 text-[#64748B] text-sm">Questionnaire</span>
        </div>
        <hr className="w-32 bg-[#E0E7FF]" />
        <div className="flex flex-col justify-start items-center relative">
          {!toggleQuestionnaire ?
            <span className="w-10 h-10 bg-[#F8FAFC] text-[#4F46E5] border-4 border-[#EEF2FF] rounded-full flex justify-center items-center">3</span>
            :
            <span className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center">
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}tick_icons.svg`} alt="TickIcons" className='w-3 h-3' />
            </span>
          }
          <span className="absolute top-10 text-[#64748B] text-sm">Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} >
        {!toggleResumeUpload &&
          <ApplyJobResume
            isCheckResume={isCheckResume}
          />
        }

        {toggleResumeUpload && !toggleQuestionnaire &&
          <div className="p-5 bg-white rounded-xl mt-14 mb-10 w-full">
            {jobDetail && jobDetail?.questionnaire?.map((questionSet: any, index: any) => (
              <>
                <input type='hidden' {...register(`questionnaire.${index}.question`)} value={questionSet?.id} />
                <input type='hidden' {...register(`questionnaire.${index}.questionType`)} value={questionSet?.questionType} />

                {questionSet?.questionType === 'Descriptive' &&
                  <QuestionnaireDescriptiveField
                    index={index}
                    questionSet={questionSet}
                    register={register}
                    watch={watch}
                    totalQuestion={jobDetail?.questionnaire?.length}
                  />
                }

                {questionSet?.questionType === 'MultipleChoice' &&
                  <QuestionnaireMultipleChoice
                    index={index}
                    questionSet={questionSet}
                    register={register}
                    checkboxRequired={checkboxRequired}
                    isCheckboxRequired={isCheckboxRequired}
                    totalQuestion={jobDetail?.questionnaire?.length}
                  />
                }

                {questionSet?.questionType === 'SingleChoice' &&
                  <QuestionnaireSingleChoice
                    index={index}
                    questionSet={questionSet}
                    register={register}
                    totalQuestion={jobDetail?.questionnaire?.length}
                  />
                }

                {questionSet?.questionType === 'NumberChoice' &&
                  <QuestionnaireNumberChoice
                    index={index}
                    questionSet={questionSet}
                    register={register}
                    watch={watch}
                    totalQuestion={jobDetail?.questionnaire?.length}
                  />
                }
              </>
            ))}
          </div >
        }
        {toggleQuestionnaire &&
          <ApplyJobReview
            jobDetail={jobDetail}
            setToggleResumeUpload={setToggleResumeUpload}
            setToggleQuestionnaire={setToggleQuestionnaire}
            watch={watch}
          />
        }
        <div className="grid grid-cols-2 gap-5">
          <button type="button" className="w-full bg-[#EEF2FF] text-[#312E81] rounded-lg py-2.5" onClick={handleDiscard}>Discard</button>
          {!toggleQuestionnaire ?
            checkResume ?
              <div className="w-full bg-[#4F46E5] text-white rounded-lg py-2.5 cursor-pointer text-center" onClick={handleNext}>Next</div> :
              <div className="w-full bg-[#8682d2] text-white rounded-lg py-2.5 cursor-pointer text-center" onClick={handleNextMessage}>Next</div>
            :
            <button type="submit" className="w-full bg-[#4F46E5] text-white rounded-lg py-2.5">Apply</button>
          }
        </div>
      </form>
    </div>
  )
}

export default ApplyJobs