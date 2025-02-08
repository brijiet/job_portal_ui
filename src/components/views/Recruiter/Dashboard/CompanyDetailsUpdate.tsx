import { useState, useEffect } from 'react';
import Modal from '../../../commonComponents/Modal';
import CompanyDetailsUpdateform from './CompanyDetailsUpdateform';
import { useAppDispatch, useAppSelector } from '../../../..';
import Cookies from 'js-cookie';
import { getEmployerCompanyList } from '../../../../store/reducers/companies/employerCompanyList';

const CompanyDetailsUpdate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { success } = useAppSelector((state) => state.updateCompanyProfile);
  const { companyDetails } = useAppSelector((state) => state.getEmployerCompanyList);
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (success) {
      dispatch(getEmployerCompanyList({ data: { user: { id: userId } } }));
      setIsOpen(false);
    }
  }, [success]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  return (
    <>
    
        {
          !companyDetails
            ?
            <h1 className="text-blue-600 font-medium cursor-pointer"
              onClick={openModal}>
              Company Logo
            </h1> :
            <span className="text-blue-600 hover:scale-125 cursor-pointer" onClick={openModal}>
              <span>Company Logo</span>
              <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}ArrowRight.svg`} alt="ArrowRight" className="inline-block ml-2" />
            </span>
        }
      <Modal
       title={"Company Logo"}    
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={
            <CompanyDetailsUpdateform
            id={companyDetails && companyDetails[0] ? companyDetails[0].id : null}
            company={companyDetails && companyDetails[0] ? companyDetails[0] : null}
            closeDialog={closeDialog} />
        }
      />
    </>
  )
}

export default CompanyDetailsUpdate;