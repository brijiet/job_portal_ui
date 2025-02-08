import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const ApplicantResumePreview = ({ resumePath, data }: any) => {
  const extenstion = resumePath?.split('.');
  const downloadFile = async (e: any) => {
    e.preventDefault();
    try {
      if (resumePath) {
        const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/downloadResume`, { fileName: data?.resumePath }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          responseType: 'blob', // Specify the response type as 'blob'
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', data?.user?.name + '.' + data?.resumePath.split('.')[1]); // Replace with the desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Resume Downloaded Successfully.');
      } else {
        toast.info("No resume uploaded by applicant")
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <>
      <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between font-bold">
            <h1>Resume</h1>

          </div>
          <div className="w-6 h-6 justify-center items-center flex-col cursor-pointer"><img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={downloadFile} /></div>
        </div>
        {extenstion && extenstion[1] === 'pdf' &&
          <div className="flex items-center justify-between mb-4">
            <iframe src={resumePath} width="100%" height="1500" />
          </div>}
      </div>
    </>
  )
}
export default ApplicantResumePreview;