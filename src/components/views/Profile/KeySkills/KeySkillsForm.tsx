import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../';
import { useAppSelector } from '../../../../';
import { clearKeySkillsSlice, keySkillsUpdate } from '../../../../store/reducers/jobSeekerProfile/keySkills';
import { clearGetProfileIndicator, profileIndicatorGet } from '../../../../store/reducers/jobSeekerProfile/profileIndicator';
import { GrFormClose } from 'react-icons/gr';
import Select from 'react-select'
import { toast } from 'react-toastify';
interface IFormInputs {
  jobSeekerId: string
  keySkills: number[];

}

const KeySkillsForm = ({ keySkill, profileDashboard, setDatabaseSkillSet, keySkillFetch, setKeySkillFetch, isAddDelete, setIsAddDeleted, closeDialog }: any) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [arrayId, setArrayId] = useState([] as any);
  const { success } = useAppSelector((state) => state.keySkills);
  const { success: keySkillsUpdateSuccess } = useAppSelector((state) => state.keySkills);
  const { success: keySkillsSuccess, keySkills } = useAppSelector((state) => state.getKeySkills);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
  });

  // OnSubmit button
  const onSubmit = async (data: IFormInputs) => {
    dispatch(keySkillsUpdate({
      keySkills: arrayId,
      jobSeekerId: profileDashboard?.id
    })).then(() => {
      setDatabaseSkillSet(keySkillFetch);
      closeDialog(false);
    });
  };

  // Check the item in array
  function isInArray(value: string, array: string[]) {
    return array?.indexOf(value) > -1;
  }

  // Delete and Add the item
  const handleAddDelete = (action: string, itemId: string, itemLabel: string) => {
    if (action === 'Delete') {
      var filteredData = keySkillFetch?.filter(function (filterItem: any) {
        return filterItem?.profileKeySkills?.id !== itemId
      })

      setKeySkillFetch(filteredData);
    }
    if (action === 'Add') {
      if (!isInArray(itemId, arrayId)) {
        filteredData = [...keySkillFetch, { id: '', profileKeySkills: { id: itemId, title: itemLabel, status: true } }];
        setKeySkillFetch(filteredData);
      }
    }
  }

  const handleChange = (data: any) => {
      if (!keySkillFetch.some((option:any) =>option.profileKeySkills.title === data.label)) {
        setKeySkillFetch([...keySkillFetch, { id: '', profileKeySkills: { id: data?.value, title: data?.label, status: true } }]);
      } else {
        toast.info("Key skill already selected !!")
      }
  }
  var arrayPost = new Array();
  useEffect(() => {
    keySkillFetch && keySkillFetch?.map((item: any, key: number) => {
      item?.profileKeySkills?.id && arrayPost.push(item?.profileKeySkills?.id);
    });
    setArrayId(arrayPost);
  }, [keySkillFetch])

  useEffect(() => {
    if (keySkillsUpdateSuccess) {
      dispatch(clearKeySkillsSlice());
      dispatch(clearGetProfileIndicator());
      dispatch(profileIndicatorGet());
    }
  }, [dispatch, keySkillsSuccess, keySkillsUpdateSuccess]);

  return (
    <div className="h-full mt-1">
      <div className="col-start-2 col-end-4">
        <h1 className="text-sm text-gray-500 mb-3"> Tell recruiters what you know or what you are known for e.g. Direct Marketing, Oracle, Java etc. We will send you job recommendations based on these skills. each skill is separated by a comma.
        </h1>
        <h2 className=" text-base font-semibold mb-1 col-start-1 col-end-5">Skills</h2>
        {isAddDelete.state && <p className={`font-normal text-xs text-${isAddDelete.color}-500`}> {isAddDelete.message}</p>}
        <div className="flex flex-wrap">
          {keySkillFetch && keySkillFetch?.map((item: any, key: number) =>
            <div key={key} className="text-xs border border-gray-300 rounded-3xl py-1 px-2 text-center m-1.5 ">{item?.profileKeySkills?.title}<GrFormClose className='h-4 w-4 float-right ml-2 cursor-pointer' onClick={() => handleAddDelete('Delete', item?.profileKeySkills?.id, item?.profileKeySkills?.label)} /></div>
          )}
        </div>
        <div className="col-start-1 col-end-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Select
                {...register("keySkills")}
                className="text-sm"
                options={keySkill.map(({ id, title }: any) => ({ value: id, label: title }))}
                onChange={handleChange}
                placeholder={"Select key skill"}
              />
              {errors.keySkills && <p className="font-normal text-xs text-red-500">{errors.keySkills.message}</p>}
            </div>
            <div className="mt-4 mb-4 text-sm text-gray-500">
              <h2>Or you can select from the suggested set of skills</h2>
              <div className="flex flex-wrap mt-2">
                {keySkill && keySkill.filter((items: any) => items.title?.toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(query.toLowerCase().replace(/\s+/g, ""))
                ).slice(0, 30)?.map((item: any, key: number) =>
                  <div key={key} className="text-xs border border-gray-300 rounded-3xl py-2 px-3 text-center m-1.5 cursor-pointer" onClick={() => handleAddDelete('Add', item?.id, item?.title)} >{item.title}</div>
                )}
              </div>
            </div>
            <div className='float-right'>
              <button type="button" onClick={closeDialog} className="mr-3">Cancel</button>
              <button type="submit" className="rounded-3xl bg-blue-600 text-white px-5 py-1.5">Save</button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default KeySkillsForm