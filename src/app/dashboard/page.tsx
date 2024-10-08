"use client"
import { useEffect, useState } from 'react';
import { AuthContextType } from '@/context/AuthContext'; // Import the type

import { useAuth } from '@/context/AuthContext';
import { FaRegCircleUser, FaStar } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { FaHome, FaBell, FaBook, FaChartLine } from 'react-icons/fa'; // Importing React Icons

interface QuestionPaper {
  name: string;
  assignedBy: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  marks: number;
  time: number;
  questionPaperCourseDetails: CourseDetails[];
}

interface CourseDetails {
  courseName: string;
}

const Dashboard = () => {
  const { token, user } = useAuth() as AuthContextType;
  const router = useRouter();

  const [data, setData] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    router.push('/Test');
  };

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('api/questionpaper', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.baseResponse.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-1/15 bg-white border-r-2 py-9 text-white p-6 opacity-90">
        <h1 className="text-2xl font-bold mb-8"></h1>
        <ul>
        <li className="mb-4 ml-0">
        <FaRegCircleUser color='black' size={60} className="" />
            <a href="#home" className="text-lg"></a>
          </li>
          <li className="mb-4 mr- flex items-center">
            <FaHome color='green' size={40} className="mr-2" />
            <a href="#home" className="text-lg"></a>
          </li>
          <li className="mb-4 flex items-center">
            <FaBell color='green' size={40} className="mr-2" />
            <a href="#notifications" className="text-lg"></a>
          </li>
          <li className="mb-4 flex items-center">
            <FaBook color='green' size={40} className="mr-2" />
            <a href="#study-material" className="text-lg"></a>
          </li>
          <li className="mb-4 flex items-center">
            <FaChartLine color='green' size={40} className="mr-2" />
            <a href="#progress" className="text-lg"></a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-6 px-16 bg-white overflow-y-visible scrollbar-hide">
        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-5xl font-semibold">Hello,<span className='text-green-600'>Yasin!</span></h2>
          <h2 className="text-3xl font-semibold">Dy Patil University</h2>
          <p className="text-2xl text-gray-600">Welcome back! Here's a quick overview of your recent activity.</p>
        </div>
        <div>
          <span className="flex items-center">
            <span className="h-px flex- bg-green-600"></span>
            <span className="h-px flex-1 bg-green-600"></span>
          </span>
        </div>

        
        {/* Pending Work (Test) - Moved below Welcome Message */}
        <div id="home" className="bg-white shadow-md rounded-lg p-10  px-4 mb-6">
          <h2 className="text-2xl text-green-600 font-semibold mb-2">Pending Work</h2>
          {data.map((test, index) => (
            <div key={index} className="bg-white border-2 p-4 rounded-lg mb-4 shadow-lg">
              <div className="py-4 bottom-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl text-green-600">{test.name}</h3>
                  <p className="text-black">Ch: All</p>
                  <p className="text-black">By: {test.assignedBy}</p>
                </div>
                <div className="text-right">
                  <p className="text-black">Assign: {test.startDate} | {test.startTime}</p>
                  <p className="text-black">Due: {test.endDate} | {test.endTime}</p>
                  <p className="text-black">Marks: {test.marks}</p>
                  <p className="text-black">Duration: {test.time} Min(s)</p>
                </div>
                
              </div>
              
              <button
      onClick={handleClick}
      className="w-full mt-4 bg-green-600 text-white text-center py-2 rounded-md"
    >
      Start Test
    </button>
            </div>
          ))}
        </div>
        {/* Study Material with Course Listings */}
        <div id="study-material" className="mb-6">
          <h3 className="text-2xl text-green-600 font-bold mb-4">Question paper course details</h3>
          {data.length > 0 && data[0].questionPaperCourseDetails.map((course, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h4 className="font-semibold">Course: {course.courseName}</h4>
              <p className="text-gray-600">Material for {course.courseName} course.</p>
            </div>
          ))}
        </div>

        {/* Progress Tab with Graph */}
        <div id="progress" className="mb-6">
          <h3 className="text-2xl text-green-600 font-bold mb-4">Your Progress</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Placeholder for Progress Graph */}
            <p>Graph showing progress over time will be displayed here.</p>
          </div>
        </div>

        {/* Notifications */}
        <div id="notifications" className="mb-6">
          <h3 className="text-2xl text-green-600 font-bold mb-4">Notifications</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>No new notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
