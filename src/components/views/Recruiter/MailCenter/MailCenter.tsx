import { useEffect, useState } from "react";
import { getMailerList } from "../../../utils/utils";
import Cookies from "js-cookie";
import moment from "moment";
import NoRecords from "../../../commonComponents/NoRecords";
import ReactPaginateItems from "../../../commonComponents/ReactPaginate";
import Modal from "../../../commonComponents/Modal";
import PreviewEmailTemplate from "../MailTemplate/PreviewEmailTemplate";
import { getMailTemplateDetails } from "../../../../store/reducers/RecruiterMails/getMailTemplate";
import { useAppDispatch } from "../../../..";
import Toaster from "../../../commonComponents/Toaster";
import UpdateEmailTemplate from "../MailTemplate/UpdateEmailTemplate";
import PreviewUpdateMailTemplate from "../MailTemplate/Preview_UpdateMailTemplate";
import EditMailTemplate from "../MailTemplate/EditMailTemplate";
import PreviewCreateNewMailTemplate from "../MailTemplate/Preview_CreateNewMailTemplate";
import CreateNewMailTemplate from "../MailTemplate/CreateNewEmailTemplate";
import ConfirmationPop from "../../../commonComponents/ConfirmationPop";

const MailCenter = () => {

  const dispatch = useAppDispatch();
  const recruiterUser = Number(Cookies.get("userId"));
  const [mailerList, setMailerList] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mailTemplateHeading, setMailTemplateHeading] = useState(
    "Create New Mail Template"
  );
  const [templateId, setTemplateId] = useState(0);
  const [Data, setData] = useState();

  // using for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage: number = 5;
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    (async () => {
      if (recruiterUser) {
        const mailerList = await getMailerList(recruiterUser);
        if (Object.keys(mailerList)?.length) {
          setMailerList(mailerList as any);
        }
      }
    })();
  }, [recruiterUser]);

  const OnPreviewClick = (templateId: number) => {
    setTemplateId(templateId);
    setIsOpen(true);
    setMailTemplateHeading("Preview & Update Mail Template");
  };

  useEffect(() => {
    dispatch(getMailTemplateDetails(templateId)).then((res: any) => {
      setData(res?.payload?.[0]);
    });
  }, [templateId]);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-[10%]  w-full"></div>
      <div className="w-full px-32 py-8 bg-[#F8FAFC]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold">Mail Center</h1>
            <p className="text-[#64748B]">Showing the list of emails</p>
          </div>
        </div>
        <div className="w-full h-auto py-3 bg-white rounded-xl shadow border border-indigo-100 ">
          <div className="self-stretch rounded-xl justify-start ">
            <div className="w-full">
              <div className="grid grid-cols-4">
                <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                  <div className="text-slate-900 font-bold  text-base leading-snug tracking-tight">
                    Mail Template
                  </div>
                </div>
                <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                  <div className="text-slate-900 font-bold text-base leading-snug tracking-tight">
                    Recipients
                  </div>
                </div>
                <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                  <div className="text-slate-900 font-bold text-base leading-snug tracking-tight">
                    Open
                  </div>
                </div>
                <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                  <div className="text-slate-900 font-bold text-base leading-snug tracking-tight">
                    Responses
                  </div>
                </div>
              </div>
            </div>
            {mailerList.length > 0 ? (<>

              {mailerList?.map((item: any) => (
                <>
                  <div className="w-full">
                    <div className="grid grid-cols-4 ">
                      <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                        <div className="self-stretch h-auto px-3 py-2 border-b border-slate-100 justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2 flex">
                            <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
                              <div className="self-stretch text-black text-xl font-medium  leading-normal tracking-tight">
                                {item?.jobTitle}
                              </div>
                              <div className="self-stretch text-slate-500 text-xs font-normal  leading-[14.40px] tracking-tight">
                                {item?.mailTemplate?.fromWorkExperience?.title}-
                                {item?.mailTemplate?.toWorkExperience?.title},
                                {item?.mailTemplate?.currency?.title}
                                {item?.mailTemplate?.minSalaryRange?.title}-
                                {item?.mailTemplate?.currency?.title}{item?.mailTemplate?.maxSalaryRange?.title}{" "}
                                {item?.mailTemplate?.mailTemplateNumberSystem?.title} PA
                                <br />
                                {item.mailTemplate ? <div className="font-bold my-2 content flex cursor-pointer" onClick={() => {
                                  OnPreviewClick(item?.mailTemplate?.id);
                                }}>
                                  <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}preview.svg`} style={{ width: "10%" }} alt="preview" />
                                  <div className="item-body">Preview</div>
                                </div> : (<div className="font-bold my-2 content flex">
                                  <div className="item-body">No template</div>
                                </div>)}
                                Last Mailed on{" "}
                                {moment(item?.createdAt).format("MMMM Do YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                        <div className="text-slate-900  text-base leading-snug tracking-tight">
                          {item?.applicantUser?.length}
                        </div>
                      </div>
                      <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                        <div className="text-slate-900 text-base leading-snug tracking-tight">
                          27(18%)
                        </div>
                      </div>
                      <div className="self-stretch h-auto px-3 py-2 border-b border-indigo-100 justify-start items-center gap-2 inline-flex">
                        <div className="text-slate-900 text-base leading-snug tracking-tight">
                          5(3%)
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <ReactPaginateItems itemsPerPage={itemsPerPage} items={mailerList} itemOffset={itemOffset} setItemOffset={setItemOffset} />
            </>)
              : <NoRecords />}
          </div>

        </div>
      </div>
      {/* Delete mail Template */}
      {mailTemplateHeading === "Confirmation Model" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <ConfirmationPop
              confirmationText={
                "Are you sure, you want to delete this Mail Template?"
              }
              templateId={templateId}
              recruiterUser={recruiterUser}
              closeDialog={closeDialog}
            />
          }
        />
      )}
      {/* Create Mail template */}
      {mailTemplateHeading === "Create New Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <CreateNewMailTemplate
              setData={setData}
              applicantMailId={recruiterUser}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
              mailTemplateHeading={mailTemplateHeading}
            />
          }
        />
      )}
      {/* Preview & Create Mail Template */}
      {mailTemplateHeading === "Preview & Create Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <PreviewCreateNewMailTemplate
              data={Data}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
              mailTemplateHeading={mailTemplateHeading}
            />
          }
        />
      )}
      {/* Edit & Create Mail Template */}
      {mailTemplateHeading === "Edit Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <EditMailTemplate
              data={Data}
              setData={setData}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
              mailTemplateHeading={mailTemplateHeading}
            />
          }
        />
      )}
      {/* Preview & Update Mail Template */}
      {mailTemplateHeading === "Preview & Update Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <PreviewUpdateMailTemplate
              data={Data}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
            />
          }
        />
      )}
      {/* Update Mail Template */}
      {mailTemplateHeading === "Update Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <UpdateEmailTemplate
              data={Data}
              setData={setData}
              applicantMailId={recruiterUser}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
              mailTemplateHeading={mailTemplateHeading}
            />
          }
        />
      )}
      {/* Preview Mail Template */}
      {mailTemplateHeading === "Preview Mail Template" && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={mailTemplateHeading}
          modalBody={
            <PreviewEmailTemplate
              data={Data}
              templateId={templateId}
              setmailTemplateHeading={setMailTemplateHeading}
              closeDialog={closeDialog}
            />
          }
        />
      )}
      <Toaster />
    </>
  );
};

export default MailCenter;
