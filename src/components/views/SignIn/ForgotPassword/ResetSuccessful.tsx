import { Link } from 'react-router-dom';

const ResetSuccessful = () => {
    return (
        <div>
            <div className="flex justify-center items-center py-10">
                <span className="bg-[#02AD41] w-8 h-8 rounded-full flex justify-center items-center mr-2">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}rightMark.png`} alt="rightMark" />
                </span>
                <h1 className="font-bold text-2xl text-[#0F172A]">Password reset successful</h1>
            </div>
            <div className="grid grid-cols-1 gap-10">
                <div>
                    <p className="text-center">You can login again to the RGT Job Portal using your new password.</p>
                </div>
                <div>
                    <Link to="/login" className="bg-indigo-600 text-white font-bold rounded-lg w-full h-12 flex justify-center items-center text-lg">Login</Link>
                </div>
            </div>
        </div >
    )
}

export default ResetSuccessful;