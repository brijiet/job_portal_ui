import React, { useEffect, useState } from 'react';

const CommunicationCard = ({ heading, description, settings, optionValue, register, errors, optionsChange, openModal, options, setOptions, databaseOptions }: any) => {

  const [handleChangeValue, setHandleChangeValue] = useState<boolean>(false)

  const handleChange = (event: any) => {
    setOptions(event.target.value);
  };

  useEffect(() => {
    if (options === optionValue) {
      setHandleChangeValue(true)
    }
  }, [options, optionValue]);

  return (
    <>
      <div className="w-full rounded-2xl bg-white p-4 mt-4 border border-[#E0E7FF]" >
        <div className="flex items-left justify-between mb-4 align-middle">
          <div className="flex items-start justify-between">
            <div className="flex font-bold align-middle">
              <div>{heading}
              </div>
            </div>
          </div>
          {settings && databaseOptions?.length > 0 && <span className="ml-2  text-gray-400 hover:scale-125 cursor-pointer">
            <svg className="w-5 h-5 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" onClick={openModal}>
              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
          </span>}
        </div>
        <span className="text-sm text-gray-500">
          {description}
        </span>
        <div className={databaseOptions[0]?.privacy == optionValue ? `w-full rounded-2xl p-2 pt-3 mt-3 flex items-start justify-between bg-blue-400` : `w-full rounded-2xl p-2 pt-3 mt-3 flex items-start justify-between bg-blue-200`}>
          <div className="flex font-bold align-middle">
            <div className="pr-2 ">
              <input
                type="radio"
                id={optionValue}
                value={optionValue}
                {...register("communicationAndPrivacy")}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={handleChangeValue}
                onChange={handleChange}
              />
            </div>
            <div><label htmlFor={optionValue}>{databaseOptions[0]?.privacy == optionValue ? 'Selected' : 'Select'}</label></div>
            {
              errors.communicationAndPrivacy
              &&
              <div className="pl-4 pt-1 font-normal text-xs text-red-500">
                {errors.communicationAndPrivacy?.message}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default CommunicationCard