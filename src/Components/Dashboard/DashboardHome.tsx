import DashboardHomeNav from "./DashboardHomeNav";
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import profileImage from '../../assets/Services-Background/language-proficiency.jpeg'

function DashboardHome() {
  return (
    <div className="flex">
      <DashboardHomeNav />
      <div className="w-full h-max">
        {/*  Remember to enable the dark theme here(...Home header... ) */}

        <div
          style={{
            backgroundImage: `url(/hand.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
          }}
          className="w-full h-[40vh]"
        >
          <div
            style={{
              background: `rgba(0,0,0,0.4)`,
            }}
            className="w-full h-full"
          >
            <div className="flex items-center gap-10 w-full h-max pt-10 m-auto">
              <h1 className="w-full text-center text-white text-3xl">
                <span className="font-light">Good Afternoon,</span> Snave
              </h1>
              <div className="fixed top-10 right-10">
                <div className="relative w-[50px] h-[50px] shadow-lg bg-indigo-300 hover:bg-indigo-200 flex justify-center items-center rounded-full cursor-pointer">
                  <div className="absolute w-[10px] h-[10px] right-0 top-0 bg-red-400 rounded-full"></div>
                  <Bell size={32} />
                </div>
              </div>
            </div>
            <div className="w-full my-10">
              <p className="text-center text-white/70 text-lg">
                <span className="font-light">
                  Mobilizing Opportunity: Connecting Careers, Transforming Lives
                </span>
              </p>

              <div className="flex justify-center items-center mt-20">
                <Link to={"/signUp"}>
                  <button className="z-40 px-10 py-1.5 bg-indigo-500/90 text-white/55 border-none rounded-full hover:bg-gradient-to-br from-sky-400/55 to-slate-700/55">
                    Request for Job
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Home contents here */}

        <div className="relative w-full h-max flex items-start">
          <div className="absolute shadow-lg -top-[50px] left-[20px] md:-top-[60px] md:left-[30px] lg:-top-[120px] lg:left-[50px] w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] bg-white p-3 rounded-full">
            <img src={profileImage} alt="" className="w-full h-full rounded-full object-cover" />
          </div>
          {/* Home explore */}
          <div className="w-[75%] ">
            <div className="w-full h-[130px] flex justify-end items-center">
              <div className="w-1/2 flex justify-between items-center gap-3 bg-gray-200 py-2 px-5 mr-10 rounded-full">
                <input type="text" className="w-full bg-transparent outline-none" placeholder="Search for Job available" />
                <Search size={25} color="blue" />
              </div>
            </div>
            <div className="h-[100vh]"></div>
          </div>
          {/* home ads */}
          <div className="w-[25%] border-2 border-indigo-400">ads</div>
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;
