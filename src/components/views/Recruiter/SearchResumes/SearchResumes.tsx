import { useEffect, useState } from 'react';
import SearchResumeResult from './SearchResumeResult';
import SearchResumesForm from './SearchResumesForm';
import { singleSaveSearch } from '../../../utils/utils';

const SearchResumes = () => {

  const [resumeSearchFormData, setResumeSearchFormData] = useState<any>([]);
  const [actionFill, setActionFill] = useState(false);
  const [showAllSaveSearch, setShowAllSaveSearch] = useState(false);
  const [saveSingleId, setSaveSingleId] = useState<any>('');
  const [savedStatus, setSavedStatus] = useState<any>();

  useEffect(() => {
    if (saveSingleId)
      (async () => {
        const singleList = await singleSaveSearch(saveSingleId)
        if (Object.keys(singleList)?.length) {
          const selectedSearchKeyWord: any = [];
          singleList[0]?.resumeSearchKeywords?.filter((item: any) => item && selectedSearchKeyWord.push({ resumeSearchKeywords: { id: item?.resumeKeySkills?.id } }));
          setResumeSearchFormData({
            resumeSearchKeywords: selectedSearchKeyWord,
            minExperience: singleList[0]?.minExperience,
            maxExperience: singleList[0]?.maxExperience,
            minSalary: singleList[0]?.minSalary,
            maxSalary: singleList[0]?.maxSalary,
          })
        }
      })();
  }, [saveSingleId]);

  const viewAllSaveSearch = (status: boolean) => {
    setShowAllSaveSearch(status)
    setActionFill(false)
  }

  const handleSingleSaveSearch = (id: number) => {
    setSaveSingleId(id)
    setActionFill(true)

  }
  return (
    <>
      {actionFill ?
        <SearchResumeResult
          resumeSearchFormData={resumeSearchFormData}
          setResumeSearchFormData={setResumeSearchFormData}
          setShowAllSaveSearch={setShowAllSaveSearch}
          setActionFill={setActionFill}
          viewAllSaveSearch={viewAllSaveSearch}
          handleSingleSaveSearch={handleSingleSaveSearch}
          savedStatus={savedStatus}
          setSavedStatus={setSavedStatus}
        /> :
        <SearchResumesForm
          resumeSearchFormData={resumeSearchFormData}
          setResumeSearchFormData={setResumeSearchFormData}
          setActionFill={setActionFill}
          showAllSaveSearch={showAllSaveSearch}
          viewAllSaveSearch={viewAllSaveSearch}
          handleSingleSaveSearch={handleSingleSaveSearch}
          savedStatus={savedStatus}
          setSavedStatus={setSavedStatus}
        />
      }
    </>
  )
}

export default SearchResumes;