import { FC, Fragment, useEffect, useState } from 'react';
import { clearVerifyEmailSlice, verifyEmail } from '../../../../store/reducers/user/verifyEmail';
import { useAppDispatch, useAppSelector } from '../../../..';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';

type Parameters = {
  closeEmailVerifyDialog: () => void;
  email: string
}
const EmailVerifyForm: FC<Parameters> = ({ closeEmailVerifyDialog, email }) => {
  const dispatch = useAppDispatch()
  const { success } = useAppSelector((state) => state.verifyUserEmail)

  const [buttonText, setButtonText] = useState('Verify email ');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = () => {
    const data = {
      email
    }
    dispatch(verifyEmail(data));
    setButtonText('A verification mail has been sent to ');
    setEmailSent(true);
  }

  useEffect(() => {
    if (success) {
      dispatch((clearVerifyEmailSlice()));
      dispatch(getUserData());
    }
  }, [success, dispatch]);

  return (
    <Fragment>
      <form id="id-form">
        <div className="flex justify-center items-center mb-4 mt-8">
          {emailSent ? <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="greenTickIcon" width="40rem" /> : <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}emailVerifyIcon.svg`} alt="emailVerifyIcon" width="40rem" /> }  
        </div>
        <h1 className="flex items-center justify-center text-center font-bold text-lg  ">{buttonText} {email}</h1>
        <div className="flex items-center justify-center mt-6 ">
          {!emailSent ? <button type="button" onClick={handleSubmit} className="bg-indigo-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow">
            Request Verification Link
          </button> :
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-center">

                <span className="text-slate-400 text-sm font-normal">
                  Didn’t receive link?
                </span>
                <button type="button" onClick={handleSubmit} className="ml-2 text-right text-slate-600 text-sm font-medium underline">
                  Send again
                </button>
              </div>
            </div>
          }
        </div>
        <div className="w-full h-px border border-indigo-100 mt-8"></div>
        <h4 className="flex justify-center font-medium  text-slate-400 text-sm  mt-6">How email verification can help?
        </h4>
        <div className="flex flex-row gap-6 mt-2 mb-8">
          <div className=" flex-col justify-center items-center gap-2 inline-flex">
            <div className="w-10 h-10 rounded-3xl border border-indigo-600 flex-col justify-center items-center flex">

              <div className="text-center text-indigo-600 text-xl font-medium  leading-normal tracking-tight ">1</div>
            </div>
            <div className="self-stretch text-center text-black text-sm font-normal  leading-none tracking-tight">Recruiters trust candidates with verified Email IDs</div>
          </div>
          <div className=" flex-col justify-center items-center gap-2 inline-flex">
            <div className="w-10 h-10 rounded-3xl border border-indigo-600 flex-col justify-center items-center flex">

              <div className="text-center text-indigo-600 text-xl font-medium  leading-normal tracking-tight">2</div>
            </div>
            <div className="self-stretch text-center text-black text-sm font-normal  leading-none tracking-tight">You can apply to jobs in your inbox with just one click</div>
          </div>
          <div className=" flex-col justify-center items-center gap-2 inline-flex ">
            <div className="w-10 h-10 rounded-3xl border border-indigo-600 flex-col justify-center items-center flex">

              <div className="text-center text-indigo-600 text-xl font-medium  leading-normal tracking-tight">3</div>
            </div>
            <div className="self-stretch text-center text-black text-sm font-normal  leading-none tracking-tight">It boosts chances of the right job finding you</div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default EmailVerifyForm;