const EmailSent = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-10">
                <div className="flex justify-center items-center">
                    <span className="bg-[#02AD41] w-8 h-8 rounded-full flex justify-center items-center mr-3">
                        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}rightMark.png`} alt="rightMark" />
                    </span>
                    <h1 className=" font-semibold text-xl">Email sent</h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <div className="flex flex-col justify-center items-center">
                        <span className=" border-4 border-[#EEF2FF] rounded-full w-9 h-9 flex justify-center items-center text-[#4F46E5] mb-2">1</span>
                        <p className="text-center">Click the reset link sent to your email</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className=" border-4 border-[#EEF2FF] rounded-full w-9 h-9 flex justify-center items-center text-[#4F46E5] mb-2">2</span>
                        <p className="text-center">Create a new password</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className=" border-4 border-[#EEF2FF] rounded-full w-9 h-9 flex justify-center items-center text-[#4F46E5] mb-2">3</span>
                        <p className="text-center">Login with your new password</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <h6 className="text-[#94A3B8]">Didn’t receive link?</h6>
                    <button className="underline ml-1" type="submit">Send again</button>
                </div>
            </div>
        </div>
    )
}

export default EmailSent;