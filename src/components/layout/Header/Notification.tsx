const Notification = () => {
    return (
        <div className="p-5 bg-white w-screen max-w-[300px] grid grid-cols-1">
            <ul>
                <div className="relative">
                    <li className="my-2 mb-1 border-b border-gray-200 p-2">
                        <div className="font-bold" title="Recommended jobs">Recommended jobs</div>
                        <span className="block">
                            <div className="text-sm" title="Related to jobSeeker">Related to jobSeeker</div>
                        </span>
                    </li>
                    <li className="my-2 mb-1 border-b border-gray-200 p-2">
                        <div className="flex space-x-6">
                            <div className="font-bold" title="Pending Actions">Pending Actions</div>
                            <div className="text-sm" title="2-3 Actions">2-3 Actions</div>
                        </div>
                        <span className="block">
                            <div className="text-sm" title="Update Profile">Update Profile</div>
                        </span>
                    </li>
                    <li className="my-2 mb-1 border-b border-gray-200 p-2">
                        <div className="flex space-x-6">
                            <div className="font-bold" title="Promotional Offer">Promotional Offer</div>
                            <div className="text-sm" title="1 Offer">1 Offer</div>
                        </div>
                        <span className="block">
                            <div className="text-sm" title="Discount Code">Discount Code</div>
                        </span>
                    </li>
                    <li className="my-2 mb-1 p-2">
                        <div className="font-bold" title="Recruiter Searches">Recruiter Searches</div>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Notification;