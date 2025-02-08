import React from 'react';

const NoRecords = ({height = ""}) => {
  return (
    <div className={`${height ? height : "h-[37rem]"} bg-[#FFF] flex justify-center items-center rounded-lg`}>
      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}no-record-found.png`} alt="noRecordsFound" />
    </div>
  )
}

export default NoRecords;