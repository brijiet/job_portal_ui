import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Toaster from './Toaster';


const DownloadResume = ({ data }: any) => {

  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumePath, setResumePath] = useState<string>('');

  useEffect(() => {
    setResumeFile(data?.jobSeekerProfile?.resumeFile)
    setResumePath(data?.jobSeekerProfile?.resumePath)
  }, [data]);

  const downloadFile = async (e: any) => {
    e.preventDefault();
    try {
      if (resumePath) {
        const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/downloadResume`, { fileName: resumePath }, {
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
        link.setAttribute('download', data?.jobSeekerProfile?.user?.name + '.' + resumePath.split('.')[1]); // Replace with the desired filename
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

  return (<>
    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={downloadFile} alt='downloadResume' />
    <Toaster />
  </>
  )
}

export default DownloadResume