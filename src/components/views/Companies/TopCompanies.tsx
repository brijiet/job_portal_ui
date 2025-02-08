import { useEffect, useState } from "react"
import { getallCompaniesFilter } from '../../utils/utils'

const TopCompanies = () => {
    const [allCompanies, setAllCompanies] = useState<any>([])
    useEffect(() => {
        (async () => {
            const Companies = await getallCompaniesFilter()
            setAllCompanies(Companies)
        })();
    }, [])

    
    return (
        <>
            <div className="grid grid-rows-5 grid-flow-col gap-4">
                {

                    allCompanies?.slice(0, 10).map((topCompany: any) => (
                        <div className="flex justify-center items-center" key={topCompany.id}>
                            <p>
                                <img
                                    className="w-14 h-14 rounded-lg"
                                    src={topCompany?.companyImage
                                        ? `${process.env.REACT_APP_COMPANY_PICTURE_FILE_LOCATION}/${topCompany?.companyImage}`.replace(/"/g, '')
                                        : `${process.env.REACT_APP_IMAGE_BASE_URL}companyLogoDefault.svg`} alt="no img"
                                />
                            </p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default TopCompanies
