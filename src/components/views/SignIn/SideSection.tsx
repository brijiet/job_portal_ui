import { Link } from 'react-router-dom';

const SideSection = () => {
    return (
        <div className="overflow-hidden col-start-1 col-end-8 relative">
            <div className="bg-gradient-to-r from-[#FFF] to-[#ffffff1e] to-60% backdrop-blur-[6px] w-full h-20 absolute top-8 flex justify-start items-center px-8">
               <Link to="/">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}portalLogo.png`} alt="portalLogo" className="h-10 2xl:h-11"/>
               </Link>
            </div>
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}signup_logo.png`} alt="signUp logo" className="h-full w-full" />
        </div>
    )
}

export default SideSection