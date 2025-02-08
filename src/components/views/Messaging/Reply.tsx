import { useForm } from 'react-hook-form'
import { postSaveCommunications } from '../../utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import Editor from '../../commonComponents/Editor';

interface IFormInputs {
  messaging: string;
}

const ReplySchema = yup
  .object({
    messaging: yup.string().label("message").required().test(
      'len', 'Please enter message between 100 and 1000 characters',
      (data) => {
        if (data.length < 100 || data.length > 1000) {
          return false
        } else {
          return true
        }
      }
    ),
  })
  .required();

const Reply = ({ setSendMessage, detailedCommunication, userType, inbox, setIsReplyOpen }: any) => {

  const formData = new FormData();
  const userId = Cookies.get("userId");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [messagingState, setMessagingState] = useState<any>();

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(ReplySchema),
    defaultValues: {
      messaging: messagingState,
    }
  });

  const handleFileChange = (event: ChangeEvent) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0];
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
  }

  // OnSubmit button
  const onSubmit = (data: IFormInputs) => {
    const receiverId = userType === 'jobSeeker' ? detailedCommunication?.recruiterUser?.id : detailedCommunication?.jobSeekerUser?.id

    formData.append('messageBody', messagingState);
    formData.append('receiverId', receiverId);
    userId && formData.append('senderId', userId);
    formData.append('messageType', inbox);
    formData.append('isRead', "1");
    formData.append('communications', detailedCommunication?.id);

    postSaveCommunications(formData).then(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      };
      setIsReplyOpen(false);
      setSendMessage(messagingState);
      toast.success("Message sent ")
    });
  };

  useEffect(() => {
    setValue("messaging", messagingState)
  }, [setValue, messagingState]);
  const watchMessaging = watch('messaging')?.length;

  return (
    <>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pt-4 pb-2">Type your reply here...</div>
        <div className="w-full">
          <Editor
            messagingState={messagingState}
            setMessagingState={setMessagingState}
            errors={errors}
            watchMessaging={watchMessaging}
          />
        </div>
        <div className='w-full grid grid-cols-2 gap-4 pt-5'>
          <div>
            <label className="cursor-pointer px-3 py-1 mb-1 rounded-3xl border-2 border-blue-600 bg-blue-600 text-white font-md">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.gif,.pdf"
                onChange={handleFileChange}
              />
              Attachment
            </label>
            <p className="text-gray-400 text-xs font-light pt-2">Supported file format: png, jpg, jpeg, gif, pdf, msword, xls - upto 2MB</p>
          </div>
          <div className='text-right'>
            <button type='submit' className="w-38 px-6 py-1.5 bg-green-600 rounded-lg shadow justify-center items-center gap-3" ><span className="text-white text-xl font-medium  leading-normal tracking-tight">Send</span></button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default Reply