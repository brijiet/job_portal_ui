const JobCategory = () => {
    return (
        <div className="p-5 bg-white w-screen max-w-sm grid grid-cols-2">
            <ul>
                <li className="font-bold mb-1">
                    Jobs in demand
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Fresher jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    MNC jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Remote jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Work from home jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Walk-in jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Part-time jobs
                </li>
            </ul>
            <ul>
                <li className="font-bold mb-1">
                    Popular categories
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    IT jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Sales jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Marketing jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Data Science jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    HR jobs
                </li>
                <li className="text-sm mb-1 cursor-pointer">
                    Engineering jobs
                </li>
            </ul>
        </div>
    )
}

export default JobCategory;