import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import DashboardHomeNav from "./DashboardHomeNav";
import { tableData } from "../../Data/jobAvailaibleTableData";
import { Link } from "react-router-dom";


function DashboardStatistics() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data,setData] = useState([])
  const itemsPerPage = 6;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(()=>{
    const fetchData = async() =>{
      const res = await fetch("http://localhost:8000/api/v1/jobs/data/all")
      if (res.ok) {
        const resData = await res.json()
        setData(resData)
        console.log(resData)
      }
      else{
        const resError = await res.json()
        console.log(resError.detail);
      }
    }
    fetchData()
  },[])

  return (
    <div className="flex gap-1 md:gap-5">
      <DashboardHomeNav />
      <div className="w-full h-max">
        <div className="w-full-h-full flex flex-col md:flex-col lg:flex-row gap-1 md:gap-5">
          <div className="w-full md:w-full lg:w-[60%]">
            <div className="w-full h-max">
              {/* search form */}
              <form className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center py-5">
                <input
                  type="text"
                  className="bg-black/5 px-5 py-2 text-xs h-[40px] w-max  rounded outline-none"
                  id="job-title"
                  placeholder="Job title, skills, or company"
                />
                <input
                  type="text"
                  className="bg-black/5 px-5 py-2 text-xs h-[40px] w-max  rounded outline-none"
                  id="job-title-2"
                  placeholder="City, State, or zip"
                />
                <button
                  type="submit"
                  className="flex bg-indigo-400 hover:bg-indigo-400/50 px-5 py-2 text-white gap-2 rounded text-sm items-center"
                >
                  <Search />
                  Search Jobs
                </button>
              </form>
              {/* recentand rated search */}
              <div className="w-full h-max flex flex-col md:flex-row gap-3 items-center justify-between p-3">
                <div className="text-sm px-4 p-2 w-max md:w-[200px] lg:w-[300px] border">
                  <select className="w-full text-black/50 outline-none">
                    <option value="1">Top Rated</option>
                    <option value="2">Mid Rated</option>
                    <option value="3">Low Rated</option>
                    <option value="3">Per/hour</option>
                    <option value="4">Others</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/50 font-thin">
                  <p>Show Per Page</p>
                  <div className="text-sm px-4 p-2 w-[80px] border">
                    <select className="w-full text-black/50 outline-none">
                      <option value="1" selected>
                        6
                      </option>
                      <option value="1">10</option>
                      <option value="2">20</option>
                      <option value="3">30</option>
                      <option value="4">40</option>
                      <option value="5">50</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Job card listing */}
              <div className="w-full h-max p-4">
                {data
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative p-3 w-full h-max shadow-inner border rounded-br-3xl rounded-tl-3xl rounded-bl-xl rounded-tr-xl overflow-hidden mt-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 w-full h-max">
                        <div className="w-[60%] md:w-[60%] lg:w-full h-[180px] p-10">
                          <a href="job-details.html" className="w-1/2 h-full">
                            <img
                              src={item.image}
                              alt="Image"
                              className="w-full h-full object-fit rounded-br-2xl rounded-tl-2xl"
                            />
                          </a>
                        </div>

                        <div className="p-2">
                          <div className="flex flex-col gap-3">
                            <h3 className="text-lg  text-black/80 uppercase">
                              {item.job_category}
                            </h3>
                            <span className="text-sm font-light">
                              {item.sub_category}
                            </span>
                            <ul className="text-xs font-light">
                              <li className="text-xs font-light">
                                <span className="text-black/80">
                                  Education:
                                </span>{" "}
                                {item.education}
                              </li>
                              <li className="text-xs font-light my-1">
                                <span className="text-black/80">
                                  Experience:{" "}
                                </span>
                                {item.experience}
                              </li>
                              <li className="text-xs font-light">
                                <span className="text-black/80">
                                  Location:{" "}
                                </span>
                                {item.job_location}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="p-3 flex flex-col gap-5 justify-center items-center">
                          <Link to={`/dashboard/employee/list/${item.id}`} >
                          <a
                            // href="job-details.html"
                            className="shadow-inner bg-indigo-600 hover:bg-indigo-600/50 px-2 py-2 text-white gap-3 rounded text-sm text-center"
                          >
                            Browse Job
                          </a>
                          </Link>
                          <p className="text-xs font-light">
                            <span className="text-black/80">Deadline: </span>
                            {item.deadline}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`absolute -rotate-45  top-4 -left-16 ${
                          item.status ? "bg-red-500" : "bg-indigo-600"
                        } text-white text-center text-sm py-2 w-[200px]`}
                      >
                        {item.status ? "urgent" : "Featured"}
                      </div>
                    </div>
                  ))}
              </div>
              {/* navigation buttons */}
              {totalPages > 1 && (
                <div className="flex flex-wrap gap-3 my-10 mx-5">
                  <button
                    onClick={handlePrevPage}
                    className="shadow-inner bg-red-600/70 hover:bg-red-600/50 px-5 py-2 text-white gap-3 text-sm text-center"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={currentPage === index + 1}
                      className="shadow-inner bg-indigo-600/10 hover:bg-indigo-600/50 px-5 py-2 text-black gap-3 text-sm text-center"
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    className="shadow-inner bg-indigo-600 hover:bg-indigo-600/50 px-5 py-2 text-white gap-3 text-sm text-center"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* aside cards */}
          <div className="w-full md:w-full lg:w-[40%] p-3">
            {/* job types card */}
            <div className="w-full h-max shadow-inner rounded-tl-2xl rounded-tr-2xl">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center rounded-tl-2xl rounded-tr-2xl">
                <h3 className="text-xl text-black/60 pl-3">Job Type</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      All
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Full-time
                    </div>
                    <span className="count">(8954)</span>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Part-time
                    </div>
                    <span className="count">(354)</span>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Temporary
                    </div>
                    <span className="count">(83)</span>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Contract
                    </div>
                    <span className="count">(1291)</span>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Internship
                    </div>
                    <span className="count">(954)</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Date posted arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Date Posted</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      All
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Last Hour
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Last 24 hours
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Last 7 days
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Last 14 days
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Last 30 days
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* Salary arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Salary</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      All
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Hourly
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Daily
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Weekly
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Monthly
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Yearly
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* Career level arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Career Level</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      Manager
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Officer
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Student
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Executive
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Others
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* Experience arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Experience</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      Fresh
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      1 Year
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      3 Year
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      5 Year
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      7 Year
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* Qualifications arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Qualifications</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      Certificate
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Diploma
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Bachelor Degree
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Master’s Degree
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Associate
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            {/* Gender arrangements */}
            <div className="w-full h-max shadow-inner mt-2">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center">
                <h3 className="text-xl text-black/60 pl-3">Gender</h3>
              </div>
              <ul className="w-full flex flex-col gap-2 text-sm p-5 border rounded-bl-2xl rounded-br-2xl">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" checked={true} name="radio-1" />
                      Male
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <input type="radio" name="radio-1" />
                      Female
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="w-[90%] m-auto mt-20">
          <h3 className="text-black/60 text-center font-light text-sm mb-10">
            We are here to help you
          </h3>
          <p className="px-5 text-center text-xs font-thin mb-10">
            The bridge to your dream career starts here. Discover opportunities,
            connect with employers, and navigate your path to success with our
            comprehensive job-finding platform. Empowering individuals to thrive
            in their professional journeys.
          </p>
          <hr />
          <div className="w-full h-[60px] text-center text-xs font-thin pt-4 text-black/65">
            &copy; Copyright K&amp;FJ {new Date().getFullYear()} | All right
            reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatistics;
