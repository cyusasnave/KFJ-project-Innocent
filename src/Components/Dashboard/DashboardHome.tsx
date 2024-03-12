import DashboardHomeNav from "./DashboardHomeNav";
import { Bell, X } from "lucide-react";
import { selectedJob } from "../../Data/UserDashboardData";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";

function DashboardHome() {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number }>({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      var a = windowSize;
      a;
      setWindowSize({ width: window.innerWidth });
      if (window.innerWidth <= 565) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeButton]);
  return (
    <div className="flex">
      <SignUp />
      <DashboardHomeNav />
      <div className="w-full h-max">
        {/*  Remember to enable the dark theme here(...Home header... ) */}
        <div className="flex items-center gap-10 w-full h-max pt-10 m-auto">
          <h1 className="w-full text-center">
            <span className="font-light">Good Afternoon,</span> Janet
          </h1>
          <div className="fixed top-10 right-10">
            <div className="relative w-[50px] h-[50px] shadow-lg bg-indigo-300 hover:bg-indigo-200 flex justify-center items-center rounded-full cursor-pointer">
              <div className="absolute w-[10px] h-[10px] right-0 top-0 bg-red-400 rounded-full"></div>
              <Bell size={32} />
            </div>
          </div>
        </div>
        <div className="w-full my-10">
          {/* <div className="flex justify-center items-center mt-20">
                <Link to={"/signUp"}>
                  <button className="z-40 px-10 py-1.5 bg-indigo-500/90 text-white/55 border-none rounded-full hover:bg-gradient-to-br from-sky-400/55 to-slate-700/55">
                    Apply for Job
                  </button>
                </Link>
              </div> */}

          <div className="w-full h-max text-4xl font-bold text-center mb-4">
            Welcome to K&JF
          </div>
          <div className="px-8 md:px-14 lg:px-28 text-center font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur metus ac sapien fermentum, id tincidunt eros mollis. Sed
            quis turpis sed nunc elementum fermentum. Nulla facilisi. Vivamus
            sodales massa at tortor condimentum, nec eleifend libero
            condimentum.
          </div>
          <div className="flex justify-center items-center w-full h-max text-2xl ">
            <div className="text-center mt-20 pt-10 border-t-2 border-indigo-400 w-1/3">
              Get Started
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
            <div className="h-max md:h-[250px] shadow-lg bg-indigo-200/20 flex justify-center items-center flex-col gap-5 p-5 hover:bg-indigo-300/20 cursor-pointer transition ease-in-out">
              <h3 className="text-xl font-semibold text-center">
                View the list of available job opportunities
              </h3>
              <p className="text-center font-thin">
                Simple description of the job available, consectetur adipiscing
                elit. Nullam consectetur metus ac sapien fermentum, eros mollis.
              </p>
              <div>Click to view</div>
            </div>
            <div className="h-max md:h-[250px] shadow-lg bg-indigo-200/20 flex justify-center items-center flex-col gap-5 p-5 hover:bg-indigo-300/20 cursor-pointer transition ease-in-out">
              <h3 className="text-xl font-semibold text-center">
                Our Staff Members
              </h3>
              <p className="text-center font-thin">
                Here will all contact and name of staff, elit. Nullam
                consectetur metus ac sapien fermentum, id tincidunt eros mollis.
              </p>
              <div>Click to view</div>
            </div>
          </div>
          <div className="w-full h-max mt-5">
            <div className=" w-[90%] md:w-[80%] m-auto">
              <h3 className="text-xl font-semibold">
                Efficient Job Management
              </h3>
              <p className="font-thin">
                Save and Organize Preferred Listings{" "}
                <span className="text-xs">
                  (Here is a list of all your saved job)
                </span>
              </p>
              <div className="relative mt-5 border-l ml-5 pl-5">
                <div className="absolute -top-[10px] -left-[10px] w-[20px] h-[20px] bg-indigo-200 rounded-full"></div>
                <div className="w-full ml-3 h-max max-h-[400px] overflow-y-scroll p-3">
                  {selectedJob.length > 0 ? (
                    selectedJob.map((job, index) => (
                      <div
                        key={index}
                        className="w-full py-3 border-b flex justify-between"
                      >
                        <h4 className="text-semibold text-black/50">
                          {index + 1}. &nbsp; {job}
                        </h4>
                        <button className={`bg-red-500/20 py-1 ${activeButton ? "px-5" : "px-2"} rounded hover:bg-red-500/30`}>
                          {!activeButton ? "Remove" : <X />}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-semibold text-black/50">
                      No selected jobs
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[90%] m-auto mt-20">
            <h3 className="text-black/60 text-center font-light text-sm mb-10">We are here to help you</h3>
            <p className="px-5 text-center text-xs font-thin mb-10">
            The bridge to your dream career starts here. Discover opportunities, connect with employers, and navigate your path to success with our comprehensive job-finding platform. Empowering individuals to thrive in their professional journeys.
            </p>
            <hr />
            <div className="w-full h-[60px] text-center text-xs font-thin pt-4 text-black/65">
              &copy; Copyright K&amp;FJ {new Date().getFullYear()} | All right
              reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
