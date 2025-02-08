import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ReactPaginateItems from "../../../commonComponents/ReactPaginate";
import NoRecords from "../../../commonComponents/NoRecords";
import { FiEdit2, FiShare2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../../../commonComponents/Modal";
import { useAppDispatch } from "../../../..";
import { getAllMailTemplateList } from "../../../utils/utils";
import Toaster from "../../../commonComponents/Toaster";
import Cookies from "js-cookie";
import { getMailTemplateDetails } from "../../../../store/reducers/RecruiterMails/getMailTemplate";
import ConfirmationPop from "../../../commonComponents/ConfirmationPop";
import CreateNewMailTemplate from "./CreateNewEmailTemplate";
import UpdateEmailTemplate from "./UpdateEmailTemplate";
import PreviewUpdateMailTemplate from "./Preview_UpdateMailTemplate";
import PreviewCreateNewMailTemplate from "./Preview_CreateNewMailTemplate";
import PreviewEmailTemplate from "./PreviewEmailTemplate";
import EditMailTemplate from "./EditMailTemplate";

const MailTemplate = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage: number = 5;
  const endOffset = itemOffset + itemsPerPage;
  const [isOpen, setIsOpen] = useState(false);
  const [templateId, setTemplateId] = useState(0);
  const [mailTemplateList, setMailTemplateList] = useState([]);
  const [Data, setData] = useState();
  const [mailTemplateHeading, setmailTemplateHeading] = useState(
    "Create New Mail Template"
  );
  const dispatch = useAppDispatch();
  const recruiterUser = Cookies.get("userId");
  const openModal = () => {
    setIsOpen(true);
    setmailTemplateHeading("Create New Mail Template");
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  const OnPriviewClick = (templateId: number) => {
    setTemplateId(templateId);
    setIsOpen(true);
    setmailTemplateHeading("Preview & Update Mail Template");
  };
  const editMailTemplate = (templateId: number) => {
    setTemplateId(templateId);
    setIsOpen(true);
    setmailTemplateHeading("Update Mail Template");
  };
  const onDeleteMailTemplate = (templateId: number) => {
    setTemplateId(templateId);
    setIsOpen(true);
    setmailTemplateHeading("Confirmation Model");
  };
  useEffect(() => {
    (async () => {
      const allMailTemplateList = await getAllMailTemplateList(
        recruiterUser as any
      );
      if (Object.keys(allMailTemplateList)?.length) {
        setMailTemplateList(allMailTemplateList.sort().reverse() as any);
      }
    })();
  }, [isOpen]);
  useEffect(() => {
    dispatch(getMailTemplateDetails(templateId)).then((res: any) => {
      setData(res?.payload?.[0]);
    });
  }, [templateId]);
  return (
    <>
      <div className="h-[10%]  w-full"></div>
      <div className="w-full px-32 py-8 bg-[#F8FAFC]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold">Email Templates</h1>
            <p className="text-[#64748B]">
              Showing the list of Email Templates
            </p>
          </div>
          <div>
            <button
              onClick={openModal}
              className=" text-white bg-[#4F46E5] rounded-lg px-6 py-2 font-semibold">
              Create Template
            </button>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className="flex"></Tab.List>
          <Tab.Panels className="w-full">
            {mailTemplateList?.length !== 0 ? (
              Object.values(mailTemplateList).map((posts, idx) => {
                const currentItems = mailTemplateList?.slice(
                  itemOffset,
                  endOffset
                );
                return (
                  <Tab.Panel key={idx}>
                    {currentItems !== undefined &&
                    currentItems?.length !== 0 ? (
                      <>
                        <div className="bg-white rounded-xl overflow-hidden w-full border border-[#E0E7FF]">
                          <table className="w-full table-auto">
                            <thead>
                              <tr className="leading-normal border-b border-[#E0E7FF]">
                                <th className="py-3 px-6 text-left">
                                  Templates Name
                                </th>
                                <th className="py-3 px-6 text-left">Sharing</th>
                                <th className="py-3 px-6 text-left">Modify</th>
                                <th className="py-3 px-6 text-left">Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.length !== 0 ? (
                                currentItems?.map((post: any, index) => {
                                  return (
                                    <>
                                      <tr
                                        className={
                                          currentItems?.length - 1 !== index
                                            ? "border-b-2 border-[#F1F5F9]"
                                            : ""
                                        }>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                          <div
                                            className="cursor-pointer text-[#4F46E5]"
                                            onClick={() => {
                                              OnPriviewClick(post.id);
                                            }}>
                                            {post.templateName}
                                          </div>
                                          <div
                                            className="text-[#64748B] text-xs"
                                            onClick={() => {
                                              OnPriviewClick(post.id);
                                            }}>
                                            <span>Preview</span>
                                          </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                          <Link to={`/employerDashboard`}>
                                            {
                                              <button className="text-gray-500">
                                                <FiShare2 onClick={() => {}} />
                                              </button>
                                            }
                                          </Link>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                          <button className="text-gray-500">
                                            <FiEdit2
                                              onClick={() => {
                                                editMailTemplate(post.id);
                                              }}
                                            />
                                          </button>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                          <button className="text-gray-500">
                                            <FiTrash2
                                              onClick={() => {
                                                onDeleteMailTemplate(post.id);
                                              }}
                                            />
                                          </button>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={5} className="py-3 px-6">
                                    <h1 className="text-center">No record</h1>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <ReactPaginateItems
                          itemsPerPage={itemsPerPage}
                          items={mailTemplateList}
                          itemOffset={itemOffset}
                          setItemOffset={setItemOffset}
                        />
                      </>
                    ) : (
                      <NoRecords />
                    )}
                  </Tab.Panel>
                );
              })
            ) : (
              <NoRecords />
            )}
          </Tab.Panels>
        </Tab.Group>
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
              setmailTemplateHeading={setmailTemplateHeading}
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
              setmailTemplateHeading={setmailTemplateHeading}
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
              setmailTemplateHeading={setmailTemplateHeading}
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
              setmailTemplateHeading={setmailTemplateHeading}
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
              setmailTemplateHeading={setmailTemplateHeading}
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
              setmailTemplateHeading={setmailTemplateHeading}
              closeDialog={closeDialog}
            />
          }
        />
      )}
      <Toaster />
    </>
  );
};

export default MailTemplate;
