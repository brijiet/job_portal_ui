import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../..';
import { useAppDispatch } from '../../../..';
import { clearUploadState, resumeUpload } from '../../../../store/reducers/jobSeekerProfile/uploadResume';
import { BiDownload } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { resumeDelete, clearresumeDeleteState } from '../../../../store/reducers/jobSeekerProfile/deleteResume';
import axios from 'axios';
import { clearGetProfileDashboardSlice, profileDashboardGet } from '../../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
import { FaRegFileWord } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import About from '../About/About';
import Cookies from 'js-cookie';

const ResumeUpload = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { success, errorMessage, error, formData } = useAppSelector((state) => state.jobSeekerResumeUpload);
  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumePath, setResumePath] = useState<string>('');
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { success: successProfile, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: successDelete, errorMessage: errorMessageDelete, error: errorDelete, formData: formDataDelete } =
    useAppSelector((state) => state.jobSeekerDeleteResume);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (success) {
      dispatch(profileDashboardGet());
      dispatch(clearUploadState);
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (error) {
      dispatch(clearUploadState)
    }
  }, [success, error, errorMessage, dispatch, formData]);

  useEffect(() => {
    if (successDelete) {
      dispatch(profileDashboardGet());
      dispatch(clearresumeDeleteState);
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
    if (errorDelete) {
      dispatch(clearresumeDeleteState)
    }
  }, [successDelete, errorDelete, errorMessageDelete, dispatch, formDataDelete]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (successProfile) {
      dispatch(clearGetProfileDashboardSlice);
    }
  }, [successProfile]);

  useEffect(() => {
    setResumeFile(profileDashboard?.resumeFile)
    setResumePath(profileDashboard?.resumePath)
  }, [profileDashboard]);

  const resumeFileSplit = resumeFile?.split('.');
  let resumeFilePrefix;
  let resumeFileSuffix;
  if (resumeFile) {
    resumeFilePrefix = resumeFileSplit[0];
    resumeFileSuffix = resumeFileSplit[1];
  }

  const parsedDate = parseISO(profileDashboard?.resumeLastUpdated);
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }
  }, [profileDashboard])
  const handleFileChange = async (event: ChangeEvent) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0];
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      try {
        dispatch(resumeUpload(formData))

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        };

      } catch (error) {
        console.log('error', error);
      }
    }
  }

  const downloadFile = async (e: any) => {
    e.preventDefault();
    const APL_URL = process.env.REACT_APP_API_PATH;
    try {

      const response = await axios.post(`${APL_URL}/jobSeekerProfile/downloadResume`, { fileName: resumePath },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          responseType: 'blob'
        },);
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', profileDashboard?.resumeFile); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDeleteResume = (e: any) => {
    e.preventDefault();
    const data = {
      resumeFile: profileDashboard.resumeFile,
      resumePath: profileDashboard.resumePath
    }
    dispatch(resumeDelete(data));
  }

  return (
    <>
      <div className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] w-full h-full p-7">
        <div className=" h-full">
          <form>
            <h1 className="mb-3 text-[#64748B] leading-none">Resume</h1>
            {
              errorMessage
                ? <span className="text-red-600">{errorMessage}</span>
                : (resumeFile && lastUpdatedTimestamp !== null) && (
                  <span>
                    <span className="font-thin text-sm leading-none">Resume last updated - {formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                    </span>
                  </span>
                )
            }
            <div className="border border-dashed border-[#A5B4FC] rounded-xl p-3 flex flex-col justify-center items-center mt-1">
              <span className=" text-gray-400 text-xs">Formats: .PDF and .DOC up to 2MB</span>
              <label className="cursor-pointer text-[#312E81] p-2 font-semibold text-base flex justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {resumeFile ? "Update Resume" : "Upload resume"}
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}uploadIcon.svg`} alt="uploadIcon" className="ml-2" />
              </label>
            </div>
            {resumeFile && <div className="bg-[#FFF] rounded-lg shadow-sm px-4 py-2 flex justify-between items-center w-full mt-3">
              <div className="flex justify-start items-center w-11/12">
                {(resumeFileSuffix === 'pdf' && <MdOutlinePictureAsPdf className="text-red-400 " size={28} />)}
                {(resumeFileSuffix === 'doc' || resumeFileSuffix === 'docx') && <FaRegFileWord className="text-blue-400 " size={28} />}

                <h1 className="overflow-hidden inline-block whitespace-nowrap text-ellipsis ml-2 text-sm font-semibold">{resumeFilePrefix}</h1>
              </div>
              <div className="w-1/12 flex justify-between items-center">
                <span className="border-r-2 border-[#E0E7FF] h-7 ml-1"></span>
                <div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                        <PiDotsThreeVerticalBold />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute  top-8 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button onClick={handleDeleteResume}
                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <RiDeleteBin6Line className="ml-6 text-blue-600 text-lg mr-2 cursor-pointer" />
                                <span className="ml-2">Delete</span>
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={downloadFile}
                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <BiDownload className="ml-6 text-blue-600 text-lg mr-2 cursor-pointer" />
                                <span className="ml-2">Download</span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>}
          </form>

          <hr className="bg-[#E0E7FF] w-full my-4" />
          <About />
        </div>
      </div>
    </>
  )
}

export default ResumeUpload;


