import { useEffect, useState } from "react";
import CommunicationCard from "./CommunicationCard";
import Cookies from 'js-cookie';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getEmailNotificationPrivacy, postEmailNotificationPrivacy, randomNumberInRange } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../commonComponents/Modal";
import ImmediateSettings from "./ImmediateSettings";

interface IFormInputs {
  communicationAndPrivacy: string;
}

const ReplySchema = yup
  .object({
    communicationAndPrivacy: yup.string().required("options is required")
  })
  .required();

const CommunicationAndPrivacy = () => {

  const userId = Cookies.get("userId");
  const [isOpen, setIsOpen] = useState(false);
  const [optionsChange, setOptionsChanges] = useState<any>()
  const [databaseOptions, setDatabaseOptions] = useState<any>([])
  const [mobileNotificationOptions, setMobileNotificationOptions] = useState<string>('')
  const [options, setOptions] = useState<string>('')

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (userId)
      (async () => {
        const optionsList = await getEmailNotificationPrivacy(Number(userId))
        if (Object?.keys(optionsList)?.length) {
          setDatabaseOptions(optionsList)
          setOptions(optionsList[0]?.privacy);
        }
      })();
  }, [userId, optionsChange, mobileNotificationOptions]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(ReplySchema),

  });

  const onSubmit = (data: IFormInputs) => {
    postEmailNotificationPrivacy(
      {
        "notificationPrivacy": Number(userId),
        "privacy": data.communicationAndPrivacy
      }).then((data) => {
        toast.success("Notification changed")
        setOptionsChanges(randomNumberInRange(1, 50))
      });
  }

  return (
    <>
      <div className="w-full p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg ">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Communication and Privacy</h1>
        <p className="mb-2">To easily customize your email, notification, and privacy options, simply let us know how quickly you're seeking for work.</p>
      </div>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <CommunicationCard
          heading={'Immediately looking for a job'}
          description={'Candidates who are actively looking for job.'}
          settings={true}
          register={register}
          optionValue={'Immediately'}
          errors={errors}
          optionsChange={optionsChange}
          openModal={openModal}
          options={options}
          setOptions={setOptions}
          databaseOptions={databaseOptions}
        />
        <CommunicationCard
          heading={'Not looking for a job'}
          description={'Candidates who are not looking for job.'}
          settings={false}
          register={register}
          optionValue={'NotLooking'}
          errors={errors}
          optionsChange={optionsChange}
          openModal={openModal}
          options={options}
          setOptions={setOptions}
          databaseOptions={databaseOptions}
        />
        <div className="mt-5 flex justify-end items-center">
          <button
            form='my-form' type="submit"
            className="rounded-3xl bg-blue-500 text-white px-5 py-1.5"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={
          <ImmediateSettings
            closeModal={closeModal}
            databaseOptions={databaseOptions}
            setMobileNotificationOptions={setMobileNotificationOptions}
            setIsOpen={setIsOpen} />
        }
      />
    </>
  )
}

export default CommunicationAndPrivacy