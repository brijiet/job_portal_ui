const CardListSkeleton = () => {
    return (
        <div className=" shadow rounded-xl py-5 px-5 w-full mb-5 bg-[#FFF]">
            <div className="animate-pulse space-y-3">
                <div className="flex space-x-4">
                    <div className="bg-slate-300 h-16 w-16 rounded-lg"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                                <div className="h-4 bg-slate-300 rounded col-span-1"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-300 rounded"></div>
                    </div>
                </div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                </div>
            </div>
        </div>
    )
}
export default CardListSkeleton;