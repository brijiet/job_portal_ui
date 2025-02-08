import axios from "axios";
import Cookies from "js-cookie";

export const getCourseList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/course/get`).then((res: any) => res.data.data)
}

export const getSpecializationList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/specialization/get`).then((res: any) => res.data.data)
}

export const getEducationTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/educationtype/get`).then((res: any) => res.data.data)
}

export const getBoardList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/board/get`).then((res: any) => res.data.data)
}

export const getInstituteList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/universityInstitute/get`).then((res: any) => res.data.data)
}

export const getPassOutYearList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/passOutYear/get`).then((res: any) => res.data.data)
}

export const getTotalYearsExpList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/totalExpYear/get`).then((res: any) => res.data.data)
}

export const getTotalMonthsExpList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/totalExpMonth/get`).then((res: any) => res.data.data)
}

export const getJoiningDateYearList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/joiningDateYear/get`).then((res: any) => res.data.data)
}

export const getJoiningDateMonthList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/joiningDateMonth/get`).then((res: any) => res.data.data)
}

export const getCurrencyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/currency/get`).then((res: any) => res.data.data)
}

export const getNoticePeriodList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/noticePeriod/get`).then((res: any) => res.data.data)
}

export const getLocationList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/location/get`).then((res: any) => res.data.data)
}

export const getDayList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/days/get`).then((res: any) => res.data.data)
}

export const getMaritalStatusList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/maritalStatus/get`).then((res: any) => res.data.data)
}

export const getCategoryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/category/get`).then((res: any) => res.data.data)
}

export const getGenderList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/gender/get`).then((res: any) => res.data.data)
}

export const getProficiencyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/proficiency/get`).then((res: any) => res.data.data)
}

export const getCompanyList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/company/get`).then((res: any) => res.data.data)
}

export const getjobTitleList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobTitle/get`).then((res: any) => res.data.data)
}

export const getDepartmentList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/department/get`).then((res: any) => res.data.data)
}

export const getEmployeeTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/employeeType/get`).then((res: any) => res.data.data)
}

export const getKeySkillsList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/keySkills/get`).then((res: any) => res.data.data)
}

export const getRoleCategoryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/roleCategory/get`).then((res: any) => res.data.data)
}

export const getJobRoleList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobRole/get`).then((res: any) => res.data.data)
}

export const getWorkModeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/workMode/get`).then((res: any) => res.data.data)
}

export const getLocalityList = async (locationList: string) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/locality/get/${locationList}`).then((res: any) => res.data.data)
}

export const getSalaryRangeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/salaryRange/get`).then((res: any) => res.data.data)
}

export const getNumberSystemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/numberSystem/get`).then((res: any) => res.data.data)
}

export const getRecurrenceList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/recurrence/get`).then((res: any) => res.data.data)
}

export const getIndustryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/industry/get`).then((res: any) => res.data.data)
}

export const getHighestQualificationList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/highestQualification/get`).then((res: any) => res.data.data)
}

export const getCompanyTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/companyType/get`).then((res: any) => res.data.data)
}

export const getJobTypeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobType/get`).then((res: any) => res.data.data)
}

export const getJobExpiryList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobExpiry/get`).then((res: any) => res.data.data)
}

export const getJobStatusList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobStatus/get`).then((res: any) => res.data.data)
}

export const getJobApplicantCount = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/countApplicant/${data}`).then((res: any) => res.data.data.count)
}

export const getCheckJobApplicant = async (userId: number, jobId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/checkJobApplicant/${userId}/${jobId}`).then((res: any) => res.data.data.count)
}

export const getCheckJobToSave = async (userId: number, jobId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/saveJob/checkJobToSave/${userId}/${jobId}`).then((res: any) => res.data.data.count)
}

export const getSaveJobList = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/saveJob/saveJobList/${data}`).then((res: any) => res.data.data)
}

export const getApplyJobList = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/applyJobList/${data}`).then((res: any) => res.data.data)
}

export const getApplicantList = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/applyJob/applicantList/${data}`).then((res: any) => res.data.data)
}

export const getMailerList = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/composeMail/get/${data}`).then((res: any) => res.data.data)
}
export const getAllMailTemplateList = async (data: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/mailTemplate/get/${data}`).then((res: any) => res.data.data)
}
export const getallCompaniesFilter = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/companies/topCompanies`).then((res: any) => res.data.data)
}

export const getAllJobSeekerProfile = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getAllProfileDashboard`).then((res: any) => res.data.data)
}

export const getSaveResumeList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/searchResume/getSaveResumeResult`).then((res: any) => res.data.data)
}

export const postSaveCommunications = async (communicationsData: any) => {
  return await axios.post(`${process.env.REACT_APP_API_PATH}/jobSeekerToRecruiterCommunication/post`
    , communicationsData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }).then((res: any) => res.data.data)
}

export const postBlockedCompanies = async (communicationsData: any) => {
  return await axios.post(`${process.env.REACT_APP_API_PATH}/settings/post`
    , communicationsData,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }).then((res: any) => res.data.data)
}

export const listBlockedCompanies = async (userId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/settings/get/${userId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const listBlockedApplicant = async (companyId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/settings/applicant/${companyId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const deleteBlockedCompanies = async (companyId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/settings/delete/${companyId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const getSaveCommunications = async (dataString: any) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerToRecruiterCommunication/get/${dataString.userId}/${dataString.userType}`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  }).then((res: any) => res.data.data)
}

export const appliedDateForJob = async (jobSeekerProfileId: number, jobId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerToRecruiterCommunication/applyJobs/${jobSeekerProfileId}/${jobId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const updateIsReadStatus = async (communicationsId: string, receiverId: string) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerToRecruiterCommunication/read/${communicationsId}/${receiverId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const calculateWorkedTime = (startYear: any, startMonth: any) => {
  const months: any = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'June', 'July', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const today = new Date();
  const startDate = new Date(startYear, months.indexOf(startMonth) - 1); // Note that months are 0-indexed in JavaScript

  let yearDiff = today.getFullYear() - startDate.getFullYear();
  let monthDiff = today.getMonth() - startDate.getMonth();

  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  return { years: yearDiff, months: monthDiff };
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const addLabel = (limit: any) => {
  if (!limit) {
    return undefined;
  }
  let label = '';
  let crores = Math.round(limit / 10000000);
  let lakhs = Math.round(limit / 100000);
  let thousands = Math.round(limit / 1000);
  if (limit / 10000000 >= 1) {
    limit / 10000000 > 1 ? label = crores + 'Crores+' : label = crores + 'Crore+';
  } else if (limit / 100000 >= 1) {
    limit / 100000 > 1 ? label = lakhs + 'Lakhs+' : label = lakhs + 'Lakh+';
  } else if (limit / 1000 >= 1) {
    label = thousands + 'k+';
  } else label = limit + '+'
  return label;
}

export const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random()
    * (max - min + 1)) + min;
};

export const getAllCityJobsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/location/getAllCityJobsCount`).then((res: any) => res.data.data);
}

export const capitalizeFirstLetter = (string: string) => {
  const middleString = string?.toLocaleLowerCase();
  return string !== undefined ? middleString.charAt(0).toUpperCase() + middleString.slice(1) : '';
}

export const applicantShortListReject = (jobApplicantCard: any, statusInput: string) => {
  if (statusInput !== '') {
    const data = [] as any;
    const shortListed = jobApplicantCard?.filter((item: any) => {
      item?.jobSeekerProfile?.applicantId?.filter((item1: any) => item1.applicantStatus === statusInput && data.push(item))
    });
    return data;
  } else {
    return jobApplicantCard?.filter((item: any) => item?.jobSeekerProfile?.applicantId.length === 0)
  }
}

export const resetPassword = async (data: { email: string }) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/resetPassword`, { data });
    return res?.data;
  } catch (error) {
    return error;
  }
}

export const updatePassword = async (requestData: { password: string | null }, token: string) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_PATH}/auth/updatePassword`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res?.data;
  } catch (error) {
    return error;
  }
}

export const updateEmailAddress = async (requestData: any) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_PATH}/user/updateEmailAddress`, requestData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res?.data;
  } catch (error) {
    return error;
  }
}

export const updateMobileNumber = async (requestData: any) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_PATH}/user/updateMobileNumber`, requestData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res?.data;
  } catch (error) {
    return error;
  }
}

export const updateUserPassword = async (requestData: any) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_PATH}/user/updatePassword`, requestData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res?.data;
  } catch (error) {
    return error;
  }
}

export const removeClassOrId = (sel: any) => document.querySelectorAll(sel).forEach(el => el.remove());

export const getExtension = (filename: string) => {
  return filename.split('.').pop()
}

export const postEmailNotificationPrivacy = async (notificationData: any) => {

  return await axios.post(`${process.env.REACT_APP_API_PATH}/settings/postEmailNotification`
    , notificationData,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }).then((res: any) => res.data.data)
}

export const postEmailAndMobileNotification = async (notificationData: any) => {

  return await axios.post(`${process.env.REACT_APP_API_PATH}/settings/updateEmailAndMobileNotification`
    , notificationData,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }).then((res: any) => res.data.data)
}

export const getEmailNotificationPrivacy = async (userId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/settings/getEmailNotification/${userId}`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const emailDurationListing = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/emailDuration/get`).then((res: any) => res.data.data)
}

export const singleSaveSearch = async (reqId: number) => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/searchResume/getSingleSaveResumeResult/${reqId}`).then((res: any) => res.data.data)
}

export const userBasedJobList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_PATH}/jobs/userJobList`,
    {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  ).then((res: any) => res.data.data)
}

export const removeYearText = (input: string) => {
  if (input)
    return input.split(' ')[0];
}

