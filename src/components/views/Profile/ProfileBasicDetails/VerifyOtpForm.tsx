import React, { FC, Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { clearSendUserOtpSlice, sendUserOtp } from '../../../../store/reducers/user/sendUserOtp';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyMobileOtp, clearVerifyMobileOtpSlice } from '../../../../store/reducers/user/verifyMobileOtp';
import { getUserData } from '../../../../store/reducers/user/getUserDetails';

type Parameters = {
  closeOtpDialog: () => void;
  mobileNumber: any
}

interface IFormInputs {
  mobileOtp1: string
  mobileOtp2: string
  mobileOtp3: string
  mobileOtp4: string
}

const verifySchema = yup.object({
  mobileOtp1: yup.string().required(),
  mobileOtp2: yup.string().required(),
  mobileOtp3: yup.string().required(),
  mobileOtp4: yup.string().required(),
});

const VerifyOtpForm: FC<Parameters> = ({ closeOtpDialog, mobileNumber }) => {

  const [counter, setCounter] = useState(60);
  const dispatch = useAppDispatch();
  const { success: successSendOtp } = useAppSelector((state) => state.jobSeekerSendOtp);
  const { success: successVerifyOtp, errorMessage } = useAppSelector((state) => state.jobSeekerVerifyMobile);

  useEffect(() => {
    dispatch(sendUserOtp())
  }, [dispatch]);

  useEffect(() => {
    if (successSendOtp) {
      dispatch(clearSendUserOtpSlice());
    }
  }, [successSendOtp]);

  useEffect(() => {
    if (successVerifyOtp) {
      dispatch(clearVerifyMobileOtpSlice());
      dispatch(getUserData());
      closeOtpDialog();
    }
  }, [dispatch, successVerifyOtp])

  //react hook form controls
  const { control, formState: { errors }, handleSubmit, watch, setValue, getValues, } = useForm<IFormInputs>({
    resolver: yupResolver(verifySchema)
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000)
    return () => clearInterval(intervalId);

  }, [counter]);

  console.log('message ', errorMessage);
  const onSubmit = (data: IFormInputs) => {
    const mobileOtp = data.mobileOtp1 + data.mobileOtp2 + data.mobileOtp3 + data.mobileOtp4;
    const dataObj = {
      mobileOtp: mobileOtp
    }
    dispatch(verifyMobileOtp(dataObj));
  };

  const handleResendOtp = (event: any) => {
    dispatch(sendUserOtp());
    setCounter(60);
  };

  useEffect(() => {
    setValue('mobileOtp1', '');
    setValue('mobileOtp2', '');
    setValue('mobileOtp3', '');
    setValue('mobileOtp4', '');

  }, [setValue]);

  // useEffect(() => {
  //   toast.error(errorMessage);
  //   dispatch(clearVerifyMobileOtpSlice());
  // },[errorMessage]);
  return (
    <div className="mt-10 mb-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-black text-xl ">  Enter the code sent on +91 {mobileNumber}</h1>
        <div className="flex flex-row ">
          <span className="text-slate-400">Expires in </span>
          <span className="ml-1">{counter}</span>
          <span className="ml-1 text-slate-400">secs</span>
        </div>
      </div>
      <form id="my-form" className="mx-2" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-8 flex items-center justify-center flex-col ">
          <div className="flex flex-row  gap-7 items-center justify-center  w-64">
            <span>
              <Controller
                name="mobileOtp1"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    id="mobileOtp1"
                    {...field}
                    readOnly={false}
                    type="text"
                    value={watch("mobileOtp1")}
                    maxLength={1}
                    pattern="\d"
                    className={`w-10 text-center border  outline-none rounded-lg focus:border-blue-500 py-2 ${fieldState.error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder=" "
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const currentId = target.id;
                      if (target.value.length === 1) {
                        const currentDigit = parseInt(currentId[currentId.length - 1]);
                        if (currentDigit >= 1 && currentDigit < 4) {
                          const nextDigit = currentDigit + 1;
                          const nextId = `mobileOtp${nextDigit}`;
                          const nextInput = document.getElementById(nextId) as HTMLInputElement; // Use HTMLInputElement here
                          if (nextInput) {
                            nextInput.focus();
                          }
                        }
                      }
                    }}
                  />
                )}
              />
            </span>
            <span>
              <Controller
                name="mobileOtp2"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    id="mobileOtp2"
                    {...field}
                    readOnly={false}
                    type="text"
                    value={watch("mobileOtp2")}
                    maxLength={1}
                    pattern="\d"
                    className={`w-10 text-center border  outline-none rounded-lg focus:border-blue-500 py-2 ${fieldState.error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder=" "
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const currentId = target.id;
                      if (target.value.length === 1) {
                        const currentDigit = parseInt(currentId[currentId.length - 1]);
                        if (currentDigit >= 1 && currentDigit < 4) {
                          const nextDigit = currentDigit + 1;
                          const nextId = `mobileOtp${nextDigit}`;
                          const nextInput = document.getElementById(nextId)
                          if (nextInput) {
                            nextInput.focus();
                          }
                        }
                      }
                    }}
                  />
                )}
              />
            </span>
            <span>
              <Controller
                name="mobileOtp3"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    id="mobileOtp3"
                    {...field}
                    readOnly={false}
                    type="text"
                    value={watch("mobileOtp3")}
                    maxLength={1}
                    pattern="\d"
                    className={`w-10 text-center border  outline-none rounded-lg focus:border-blue-500 py-2 ${fieldState.error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder=" "
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const currentId = target.id;
                      if (target.value.length === 1) {
                        const currentDigit = parseInt(currentId[currentId.length - 1]);
                        if (currentDigit >= 1 && currentDigit < 4) {
                          const nextDigit = currentDigit + 1;
                          const nextId = `mobileOtp${nextDigit}`;
                          const nextInput = document.getElementById(nextId)
                          if (nextInput) {
                            nextInput.focus();
                          }
                        }
                      }
                    }}
                  />
                )}
              />
            </span>
            <span>
              <Controller
                name="mobileOtp4"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    id="mobileOtp4"
                    {...field}
                    readOnly={false}
                    type="text"
                    value={watch("mobileOtp4")}
                    maxLength={1}
                    pattern="\d"
                    className={`w-10 text-center border  outline-none rounded-lg focus:border-blue-500 py-2 ${fieldState.error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                    placeholder=" "
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const currentId = target.id;
                      if (target.value.length === 1) {
                        const currentDigit = parseInt(currentId[currentId.length - 1]);
                        if (currentDigit >= 1 && currentDigit < 4) {
                          const nextDigit = currentDigit + 1;
                          const nextId = `mobileOtp${nextDigit}`;
                          const nextInput = document.getElementById(nextId)
                          if (nextInput) {
                            nextInput.focus();
                          }
                        }
                      }
                    }}
                  />
                )}
              />
            </span>
          </div>
          <button form="my-form" className={(watch("mobileOtp1")?.length === 0 || watch("mobileOtp2") === null || watch("mobileOtp2")?.length === 0 || watch("mobileOtp2") === null || watch("mobileOtp3")?.length === 0 || watch("mobileOtp3") === null || watch("mobileOtp4")?.length === 0 || watch("mobileOtp4") === null) ? " px-28 py-3 rounded-lg bg-blue-100 text-white mt-8" : " px-20 py-3 rounded-lg bg-indigo-600 text-white mt-8"}
          >Verify
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center mt-2">
        <span className="text-sm text-gray-400"> Didn’t receive OTP?</span>
        <button className="text-sm text-slate-600 ml-1 font-medium underline" onClick={handleResendOtp}>Send again</button>
      </div>
    </div>
  )
}

export default VerifyOtpForm