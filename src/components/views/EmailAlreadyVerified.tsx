import { useNavigate } from "react-router-dom";

const EmailAlreadyVerifiedPage = () => {
  const navigate = useNavigate();
  const handleLoginSubmit = () => {
    navigate("/login")
  }
  return (

    <div className="flex items-center justify-center h-screen flex-col">
      <span className="mb-4 leading-none">
        Email Already verified
      </span>
      <button className=" text-white cursor-pointer bg-blue-600 rounded-lg px-5 py-2  font-medium" onClick={handleLoginSubmit}>Click here to login</button>
    </div>

  )
}

export default EmailAlreadyVerifiedPage; 