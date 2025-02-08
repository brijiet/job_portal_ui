import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";


const ApplicantPersonalDetails = ({profileDashboard}:any) => {

    return (
        <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center font-bold">
                    <h1>Personal details</h1>
                </div>
            </div>
            {
                profileDashboard?.personalDetails ?
                    <>
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Personal</h2>
                                    {
                                        profileDashboard?.personalDetails?.gender}, {profileDashboard?.personalDetails?.maritalStatus  }
                                </div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Date of birth</h2>
                                    {
                                        profileDashboard?.personalDetails?.birthDate 
                                    }

                                </div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Category</h2>
                                    {
                                        profileDashboard?.personalDetails?.category
                                    }
                                </div>
                                <div>
                                    <h2 className="text-slate-500">Differently abled</h2>
                                    {
                                        profileDashboard?.personalDetails?.differentlyAbled ? "Yes" :"No"
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="mb-3">
                                    <h2 className="text-slate-500">Career break</h2>
                                    {profileDashboard?.personalDetails?.careerBreak ? "Yes": "No"}
                                </div>
                                 <div className="mb-3">
                                    <h2 className="text-slate-500">Address</h2>
                                        {`${profileDashboard?.personalDetails?.permanentAddress}, 
                                        ${profileDashboard?.personalDetails?.homeTown} ,
                                        ${profileDashboard?.personalDetails?.pinCode}.`}
                                </div>
                            </div> 
                        </div>
                        {
                            profileDashboard?.personalDetails?.language?.length > 0 &&
                            <>
                                <hr className="mt-4 mb-4" />
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold">Language</span>
                                </div>
                                <table className="w-full">
                                    <tr>
                                        <th className="text-left text-gray-500 font-normal">Languages</th>
                                        <th className="text-left text-gray-500 font-normal">Proficiency</th>
                                        <th className="text-left text-gray-500 font-normal">Read</th>
                                        <th className="text-left text-gray-500 font-normal">Write</th>
                                        <th className="text-left text-gray-500 font-normal">Speak</th>
                                    </tr>
                                    {profileDashboard?.personalDetails?.language?.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="text-left">{item?.language}</td>
                                            <td className="text-left">{item?.proficiency}</td>
                                            <td className="text-left">{item?.read ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                            <td className="text-left">{item?.write ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                            <td className="text-left">{item?.speak ? <AiOutlineCheckCircle color="green" /> : <RxCrossCircled color="red" />}</td>
                                        </tr>
                                    ))}
                                </table>
                            </>

                        }
                    </>
                    : <span className="text-sm text-gray-500">Applicant not mention personal details.</span>
            }

        </div>
    )
}
export default ApplicantPersonalDetails;