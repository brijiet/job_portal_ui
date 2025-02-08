import React from 'react'

const CategoryItem = ({ item, count }: any) => {
  return (
    <div className="p-5 shadow-sm rounded-lg bg-[#FFF] flex justify-between items-center" key={item?.id}>
      <h1 className="text-base 2xl:text-lg font-semibold">{item?.title}</h1>
      <span className="text-xs 2xl:text-sm m-0 px-3 py-2 rounded-full bg-[#F1F5F9]">{count}</span>
    </div>
  )
}

export default CategoryItem