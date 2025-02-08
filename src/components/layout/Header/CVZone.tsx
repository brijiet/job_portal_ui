import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
const CVZoneLink = () => {
  return (
    <div className="p-5 bg-white w-screen max-w-[180px] grid grid-cols-1">
      <ul>
        <li className="text-sm mb-3 cursor-pointer">
          <Link to="cvZone/searchResumes">Search Resumes</Link>
        </li>
        <li className="text-sm mb-3 cursor-pointer">
          <Link to="cvZone/mailCenter">Mail Center</Link>
        </li>
        <li className="text-sm mb-3 cursor-pointer">
          <Link to="cvZone/emailTemplates">Email Templates</Link>
        </li >
      </ul>
    </div>
  )
}

export default CVZoneLink