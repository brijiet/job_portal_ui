import { toast } from "react-toastify";
import { useAppDispatch } from "../..";
import { deleteMailTemplate } from "../../store/reducers/RecruiterMails/deleteMailTemplate";
const ConfirmationPop = ({
  confirmationText,
  templateId,
  recruiterUser,
  closeDialog,
}: any) => {
  const dispatch = useAppDispatch();
  const getConfiramtion = () => {
    const data = {
      templateId: templateId,
      recruiterUser: recruiterUser,
    };
    dispatch(deleteMailTemplate(data)).then((response) => {
      if (response?.payload) {
        toast.success("Mail templete delete successfully.");
      }
    });
    closeDialog(true);
  };
  const getCancelled = () => {
    closeDialog(true);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-8 mb-2 mt-2">
          <div className="col-span-12">{confirmationText}</div>
        </div>
        <div className="mt-5 flex justify-end items-center">
          <div>
            <button type="button" className="mr-3" onClick={getCancelled}>
              No
            </button>
            <button
              form="my-form"
              type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
              onClick={getConfiramtion}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPop;
