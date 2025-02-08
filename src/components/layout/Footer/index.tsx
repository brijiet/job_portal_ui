import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="h-[50%] bg-[#312E81] px-32 2xl:px-40 flex items-center 2xl:text-xl">
            <div className="w-full">
                <div className="grid grid-cols-3 gap-5 w-full">
                    <div className="flex flex-col items-start justify-between">
                        <Link to="/">
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}footerlogo.png`} alt="portalLogo" className="h-10 2xl:h-14" />
                        </Link>
                        <div className="text-[#A5B4FC]">
                            <p>Search and find your job now easier than ever, simply browse and find a dream job</p>
                        </div>
                        <div className="flex justify-start items-center text-white">
                            <span className="cursor-pointer">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}linkdin.svg`} alt="LinkDin" className="2xl:w-5" />
                            </span>
                            <span className="ml-8 cursor-pointer">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}facebook.svg`} alt="Facebook" className="2xl:w-5" />
                            </span>
                            <span className="ml-8 cursor-pointer">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}instagram.svg`} alt="Instagram" className="2xl:w-5" />
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-white">
                        <div className="flex flex-col items-start">
                            <Link to="/">Home</Link>
                            <Link to="/about" className="mt-3">About</Link>
                            <Link to="/allJobs" className="mt-3">Jobs</Link>
                            <Link to="/allCompanies" className="mt-3">Companies</Link>
                            <Link to="/services" className="mt-3">Services</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <h1 className="text-4xl 2xl:text-5xl font-bold  text-white mb-5">
                            <p><span className="text-[#818CF8]"> Subscribe </span>to get latest updates</p>
                        </h1>
                        <div className="flex items-center h-10 2xl:h-15 w-full">
                            <input type="text" className=" w-[90%] h-full rounded-l-lg px-3 2xl:px-5 outline-none" />
                            <button className="w-[10%] bg-[#818CF8] h-full flex justify-center items-center rounded-r-lg">
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}EmailSenderIcons.svg`} alt="EmailSenderIcons" />
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="text-[#818CF8] my-10" />
                <div className="text-white text-sm 2xl:text-base flex justify-between items-center">
                    <span>© 2023 RGT All rights reserved.</span>
                    <div className="flex space-x-6">
                        <Link to="/termsOfServices">Terms of Services</Link>
                        <Link to="/privacyPolicy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;