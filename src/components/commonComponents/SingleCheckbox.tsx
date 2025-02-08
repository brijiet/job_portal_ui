import { useState } from "react";

export default function SingleCheckbox({ singleData, register, fieldName, dbFieldName, checkData }: any) {


  let status = false;
  checkData?.map((checkItem: any) => {
    if (checkItem?.[dbFieldName]?.id === singleData?.id)
      status = true
  });

  const [statusMode, setStatusMode] = useState(status);

  return (
    <>
      <input
        type='checkbox'
        checked={statusMode}
        value={singleData.id}
        onClick={() => setStatusMode(!statusMode)}
        {...register(fieldName)}
        className='mx-3 w-4 h-4'
      />{singleData?.title}
    </>
  );
}