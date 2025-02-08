import React, { useEffect, useState } from 'react'
import JSZip from 'jszip';
import moment from 'moment';
import { toast } from 'react-toastify';
import Toaster from './Toaster';
import axios from 'axios';
import Cookies from 'js-cookie';
var zip = new JSZip();
const DownloadResumeAsZip = ({ searchResumeResult, isCheck }: any) => {

  const [images, setImages] = useState<any>([]);
  const checkedArray = [] as any;
  useEffect(() => {
    if (isCheck?.length > 0) {
      for (var i = 0; i < isCheck?.length; i++) {
        const filteredData = searchResumeResult?.filter((item: any) => item.id === isCheck[i])[0]
        // checkedArray.push(`${process.env.REACT_APP_RESUME_FILE_LOCATION}/${filteredData?.resumePath}`)
        checkedArray.push(filteredData?.resumePath)
      }
      setImages(checkedArray)
    }
  }, [isCheck])

  // Function for make zip file and download it

  async function downloadAsZip() {
    // Add Images to the zip file
    if (isCheck?.length > 0) {
      for (var i = 0; i < images.length; i++) {
        const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/downloadResume`, {fileName:images[i]}, {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          responseType: 'blob', // Specify the response type as 'blob'
        });
        const data = response.data
        // const response = await fetch(images[i]);
        // const blob = await response.blob();
        zip.file(images[i]?.split("/").pop(), data);

      }
      const zipData = await zip.generateAsync({
        type: "blob",
        streamFiles: true,
      });
      // Create a download link for the zip file
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(zipData);
      link.download = `resumeDownload-${moment().format('MMMM Do YYYY, h:mm:ss a')}.zip`;
      link.click();
    } else {
      toast.success("Please check at least one ")
    }
  }
  return (
    <>
      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}downloadResume.svg`} onClick={downloadAsZip} alt='downloadResume'/>
      <Toaster />
    </>
  )
}

export default DownloadResumeAsZip