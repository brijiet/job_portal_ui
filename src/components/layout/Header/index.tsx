import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { getFirstLetterOfName } from '../../utils/filterArray';
import EmployerJobLink from './EmployerJobLink';
import EmployerPopoverHover from '../../commonComponents/EmployerPopoverHover';
import PopoverHover from '../../commonComponents/PopoverHover';
import SearchFilters from './SearchFilters';
import Notification from './Notification';
import CVZoneLink from './CVZone';

const Header = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');

    const { success: loginSuccess, login } = useAppSelector((state) => state.login);
    const { success: registerSuccess, user } = useAppSelector((state) => state.register);
    const { success: logOutSuccess } = useAppSelector((state) => state.logOut);

    //let userName: string;
    const userName = Cookies.get('name');
    const userTypes = Cookies.get('userType');
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (logOutSuccess) {
            dispatch(clearLogOutSlice())
            Cookies.remove("name");
            Cookies.remove("userType");
            Cookies.remove("token");
            setName('')
            setAuth(false)
            window.location.reload()
            //navigate('/')
        }
    }, [logOutSuccess])

    useEffect(() => {
        setName(userName as any);
        setUserType(userTypes as any)
        setAuth(token as any)
    }, [loginSuccess, registerSuccess])

    const logout = () => {
        Cookies.remove('userId');
        dispatch(logOutUser() as any);
    }

    const handlePopover = () => {
        navigate("/allJobs");
    }

    const handleURL = (actionUrl: string) => {
        navigate(actionUrl);
    }

    const handleNotification = () => {
    }

    return (
        <>
            <nav className="h-[10%] w-full bg-[#fff] font-sans border-b border-[#E0E1E6] px-32 xl:px-32 2xl:px-40 flex items-center justify-between box-border fixed top-0 z-50">
                <div className="flex space-x-6 items-center h-full">
                    <Link to={`${auth}` ? `${userType === 'jobSeeker' ? "/homePage" : "/employerDashboard"}` : "/"}>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}portalLogo.png`} alt="portalLogo" className="h-10 xl:h-10 2xl:h-14"/>
                    </Link>
                    <div className="border border-gray-200 h-8 xl:h-8 2xl:h-10"></div>
                    {/* Navigation Link*/}
                    {userType === 'employer' ?
                        <div className="flex space-x-6 items-center h-full xl:text-base 2xl:text-xl">
                            <span className="text-[#312E81] h-full">
                                <EmployerPopoverHover title="Jobs & Responses" body={<EmployerJobLink />} />
                            </span>
                            <span className="text-[#312E81] h-full">
                                <EmployerPopoverHover title="CV Zone" body={<CVZoneLink />} />
                            </span>
                            {/* <Link to="#" className="text-[#312E81]">Analytics</Link> */}
                        </div>
                        :
                        <div className="flex space-x-6 items-center h-full xl:text-base 2xl:text-xl">
                            {/* <span className="text-[#312E81] h-full">
                                <PopoverHover title="Jobs" handlePopover={handlePopover} body={<JobCategory />} />
                            </span> */}
                            <Link to="/allJobs" className="text-[#312E81]">Jobs</Link>
                            <Link to="/allCompanies" className="text-[#312E81]">Companies</Link>
                            <Link to="/services" className="text-[#312E81]">Services</Link>
                        </div>
                    }
                </div>
                <div className="flex space-x-6 items-center">
                    <SearchFilters />
                    <div className="border border-gray-200 h-8 xl:h-8 2xl:h-10"></div>
                    {auth && <div className='float-left relative flex justify-center items-center'>
                        <span className='absolute -mt-2 -mr-1 top-0 right-0 bg-red-500 rounded-full text-white px-1 text-xs'>4</span>
                        <PopoverHover title={<img src={`${process.env.REACT_APP_IMAGE_BASE_URL}bellIcons.svg`} alt="image" className="2xl:w-6 m-0 p-0" />} handlePopover={handleNotification} body={<Notification />} />
                    </div>}
                    <div className="text-[#312E81]">
                        {auth ?
                            <>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                                            <div className="w-9 h-9 2xl:w-10 2xl:h-10 bg-green-600 text-lg 2xl:text-xl text-white rounded-full pt-1">{getFirstLetterOfName(name)}</div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                {userType !== 'employer' && <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm 2xl:text-base`}
                                                                onClick={() => handleURL("/settings")}>Settings
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </>}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm 2xl:text-base`}
                                                            onClick={() => handleURL("/inbox")}> Inbox
                                                        </button>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => logout()}
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm 2xl:text-base`}
                                                        >
                                                            Logout
                                                        </button>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </> : <div className="h-full flex">
                                <div className="p-3 rounded-lg justify-center items-center gap-3 flex">
                                    <Link to="/login" className="text-indigo-900 text-base xl:text-base 2xl:text-xl font-medium leading-snug tracking-tight">Log In</Link>
                                </div>
                                <div className="p-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
                                    <Link to="/registration" className="text-indigo-900 text-base xl:text-base 2xl:text-xl font-medium leading-snug tracking-tight">Sign Up</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header;