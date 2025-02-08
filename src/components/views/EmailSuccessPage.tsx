import { useNavigate } from "react-router-dom";

const EmailSuccessPage = () => {
  const navigate = useNavigate();
  const handleLoginSubmit = () => {
    navigate("/login")
  }
  return (

    <div className="flex items-center justify-center h-screen flex-col">
      <span className="mb-3">
      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}greenTickIcon.svg`} alt="greenTickIcon" width="30rem" />
      </span>
      <h1 className="font-semibold text-xl mb-4 leading-none">
        Thank you
      </h1>
      <span className="mb-4 leading-none">
        Email successfully verified
      </span>
      <button className=" text-white cursor-pointer bg-blue-600 rounded-lg px-5 py-2  font-medium" onClick={handleLoginSubmit}>Click here to login</button>
    </div>

  )
}

export default EmailSuccessPage; 