import {FC} from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../../utils/utils';
import { toast } from 'react-toastify';

interface Props {
    email: string;
  }

const LinkExpired:FC<Props> = ({email}) => {
    let data={email};
    const handleSubmit = async()=>{
        const res = await resetPassword(data);
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center py-10">
                <span className="w-9 h-9 flex justify-center items-center bg-[#ED0A34] shadow-red-900 rounded-full mr-3">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}errorIcon.png`} alt="errorIcon" />
                </span>
                <h1 className="font-bold text-2xl text-[#0F172A]">Reset link expired</h1>
            </div>
            <div className="grid grid-cols-1 gap-10">
                <div>
                    <p className="text-center">To receive the reset link again, please click the ‘send link’ button</p>
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
                <div>
                    <button className="bg-indigo-600 text-base text-white font-bold rounded-lg w-full h-12" onClick={handleSubmit}>Send link</button>
                    <div className="flex justify-center items-center mt-1">
                        <Link to="/login" className="text-[#475569] underline">Log in</Link>
                      </div>
                </div>
            </div>
        </div>
    )
}

export default LinkExpired;