import { Link } from "react-router-dom";
import CompanyDetailsUpdate from "./CompanyDetailsUpdate";
import { useAppSelector, useAppDispatch } from "../../../..";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { deleteCompanyDetailsState, } from '../../../../store/reducers/companies/deleteCompanyProfile';
import { getEmployerCompanyList } from "../../../../store/reducers/companies/employerCompanyList";
import { clearCompanyDetailsState } from '../../../../store/reducers/companies/updateCompanyProfile';

const LeftSection = () => {
    const dispatch = useAppDispatch();
    const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
    const [companyLogo, setCompanyLogo] = useState();
    const [companyDescription, setCompanyDescription] = useState();

    const { companyBasicDetails, error, errorMessage } = useAppSelector((state) => state.updateCompanyProfile);
    const { success: successDelete, error: errorDelete, formData: formDataDelete } = useAppSelector((state) => state.deleteCompanyProfilePicture);
    const userId = Cookies.get('userId');

    useEffect(() => {
        if (companyDetails[0]) {
            if (companyDetails[0]?.companyImage) {
                setCompanyLogo(`${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyDetails[0]?.companyImage}`.replace(/"/g, '') as any)
            }
            setCompanyDescription((companyDetails?.[0]?.companyDescription)?.replace(/"/g, '') as any);
        }
    }, [companyDetails])

    useEffect(() => {
        if (companyBasicDetails) {
            if (companyBasicDetails.companyImage) {
                setCompanyLogo(`${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${companyBasicDetails.companyImage}`.replace(/"/g, '') as any);
            }
            setCompanyDescription((companyBasicDetails.companyDescription)?.replace(/"/g, '') as any);
        }
        if (error) {
            dispatch(clearCompanyDetailsState)
        }
    }, [companyBasicDetails, errorMessage, error]);

    useEffect(() => {
        if (successDelete) {
            setCompanyLogo(`${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg` as any);
            setCompanyDescription(null as any);
            dispatch(deleteCompanyDetailsState(companyDetails?.[0]?.id as any));
            dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
        }
        if (errorDelete) {
            dispatch(deleteCompanyDetailsState)
        }
    }, [successDelete, errorDelete]);

    return (
        <div className="col-start-1 col-end-3">
            <div className="bg-[#FFF] rounded-lg shadow-sm w-full sticky top-[13%] ">
                <div className="w-full h-40 relative">
                    <div className="w-full h-2/3 bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] rounded-t-lg">
                    </div>
                    <div className="w-full h-1/3 bg-[#FFF]">
                    </div>
                    <div className="absolute bg-[#FFF] top-2/3 left-[50%] -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full p-1">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}defaultProfilePic.svg`} alt="profile" className="rounded-full w-full h-full" />
                    </div>
                </div>
                <div className="px-5 py-5">
                    <h1 className="text-xl font-bold mb-1">{companyDetails?.[0]?.user?.[0]?.name}</h1>
                    <div>
                        <h1 className="mb-1 overflow-hidden whitespace-nowrap text-ellipsis ">HR Recruiter
                        </h1>
                        <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.title && `@ ${companyDetails?.[0]?.title}`}
                        </h1>
                    </div>
                    <div className="mt-5 text-sm text-[#64748B]">
                        {
                            companyDetails?.[0]?.user?.[0]?.email &&
                            <div className="flex justify-start items-center mb-1">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Email.svg`} alt="EmailIcon" width="12rem" height="12rem" />
                                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.user?.[0]?.email}</span>
                            </div>
                        }
                        {
                            companyDetails?.[0]?.user?.[0]?.mobileNumber &&
                            <div className="flex justify-start items-center mb-1">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}Phone.svg`} alt="PhoneIcon" width="12rem" height="12rem" />
                                <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{companyDetails?.[0]?.user?.[0]?.mobileNumber}</span>
                            </div>
                        }
                        {companyDetails?.[0]?.location?.length ? <div className="flex justify-start items-center">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}LocationIcon.svg`} alt="LocationIcon" width="12rem" height="12rem" />
                            {companyDetails?.[0]?.location?.map((loc: any) => <span className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{loc?.title}, </span>)}
                        </div> : <></>}
                    </div>
                    <hr className="mt-5 mb-5" />
                    <div className="flex justify-start items-center mb-4">
                        <img height={60} width={50} className=" rounded-xl" src={companyLogo ? companyLogo : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="CompanyIcon" />
                        <h1 className="ml-2 line-clamp-2 list-inside font-bold">{companyDetails?.[0]?.title && `@ ${companyDetails?.[0]?.title}`}</h1>
                    </div>
                    <button className="bg-[#EEF2FF] text-[#312E81] px-3 py-1 rounded-lg flex justify-start items-center">
                        <span className="mr-2">
                            <CompanyDetailsUpdate />
                        </span>
                    </button>
                    <hr className="mt-5 mb-5" />
                    <div className="flex justify-start items-center mb-3">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ExperienceIcon.svg`} alt="ExperienceIcon" width="15rem" height="15rem" />
                        <Link to="/recruiterJobList"><span className="ml-2">Manage Jobs</span></Link>
                    </div>
                    <div className="flex justify-start items-center">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}applications.svg`} alt="Applications" />
                        <span className="ml-2">Applications</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSection