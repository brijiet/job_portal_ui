import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getExtension } from '../utils/utils';
import Modal from './Modal';
import DocumentPreview from '../views/Messaging/DocumentPreview';

const DownloadMessagingAttachment = ({ itemMessage }: any) => {

  const [isDocumentPreviewOpen, setIsDocumentPreviewOpen] = useState(false);
  const [resumePath, setResumePath] = useState('');

  const previewFile = (e: any, resumeCompletePath: string) => {
    setResumePath(resumeCompletePath)
    setIsDocumentPreviewOpen(true)
  }

  const downloadFile = async (e: any, resumeCompletePath: string) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_UPLOAD_MESSAGE_ATTACHMENT_FILE_LOCATION}/${resumeCompletePath}`, {
        responseType: 'blob', // Specify the response type as 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resumeCompletePath); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      {itemMessage?.messagesAttachment && itemMessage?.messagesAttachment?.map((itemAttachment: any) => <div className="justify-start items-center gap-2 inline-flex">
        {itemAttachment?.attachment && (getExtension(itemAttachment?.attachment)?.toLowerCase() === "pdf" || getExtension(itemAttachment?.attachment)?.toLowerCase() === "msword" || getExtension(itemAttachment?.attachment)?.toLowerCase() === "xls") && <div className="w-full self-stretch p-2 bg-white rounded-lg border border-indigo-100 justify-start items-center gap-1 flex">
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-1 flex cursor-pointer">
            <div className="w-6 h-6 bg-orange-50 rounded justify-center items-center flex" onClick={(e) => previewFile(e, itemAttachment.attachment)}>
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}messagePdf.svg`} />
            </div>
            <div className="grow shrink basis-0 text-black text-xs font-normal leading-[14.40px] tracking-tight" onClick={(e) => previewFile(e, itemAttachment.attachment)}>{itemAttachment.attachment}</div>
            <div className="w-6 h-6  rounded justify-center items-center flex cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={(e) => downloadFile(e, itemAttachment.attachment)} /></div>
          </div>
        </div>}
        {(itemAttachment?.attachment && getExtension(itemAttachment?.attachment)?.toLowerCase() === "png" || itemAttachment?.attachment && getExtension(itemAttachment?.attachment)?.toLowerCase() === "jpg" || itemAttachment?.attachment && getExtension(itemAttachment?.attachment)?.toLowerCase() === "jpeg" || itemAttachment?.attachment && getExtension(itemAttachment?.attachment)?.toLowerCase() === "gif") && <div className="w-full self-stretch p-2 bg-white rounded-lg border border-indigo-100 justify-start items-center gap-1 flex" >
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-1 flex">
            <div className="w-6 h-6 bg-orange-50 rounded justify-center items-center flex cursor-pointer" onClick={(e) => previewFile(e, itemAttachment.attachment)}>
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}messageImage.svg`} />
            </div>
            <div className="grow shrink basis-0 text-black text-xs font-normal leading-[14.40px] tracking-tight cursor-pointer" onClick={(e) => previewFile(e, itemAttachment.attachment)}>{itemAttachment.attachment}</div>
            <div className="w-6 h-6  rounded justify-center items-center flex cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={(e) => downloadFile(e, itemAttachment.attachment)} /></div>
          </div>
        </div>}
      </div>)}
      <Modal
        isOpen={isDocumentPreviewOpen}
        setIsOpen={setIsDocumentPreviewOpen}
        title={'Document Preview'}
        modalBody={
          <DocumentPreview
            resumePath={resumePath}
          />
        }
      />
    </>
  )
}

export default DownloadMessagingAttachment