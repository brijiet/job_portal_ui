import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const DocumentPreview = ({ resumePath }: any) => {

  const extension = resumePath?.split('.');

  const downloadFile = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_UPLOAD_MESSAGE_ATTACHMENT_FILE_LOCATION}/${resumePath}`, {
        responseType: 'blob', // Specify the response type as 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resumePath); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Document downloaded successfully.')
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between font-bold">
            Document preview, Click here to download
          </div>
          <div className="w-6 h-6 justify-center items-center flex-col cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={downloadFile} /></div>
        </div>
        {extension && extension[1] === 'pdf' &&
          <div className="flex items-center justify-between mb-4">
            <iframe src={`${process.env.REACT_APP_UPLOAD_MESSAGE_ATTACHMENT_FILE_LOCATION}/${resumePath}`} width="100%" height="1500" />
          </div>}
      </div>
      <ToastContainer />
    </>
  )
}
export default DocumentPreview;