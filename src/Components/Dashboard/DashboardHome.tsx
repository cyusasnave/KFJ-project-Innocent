import DashboardHomeNav from "./DashboardHomeNav";
import { Bell, Check, X } from "lucide-react";
import { selectedJob } from "../../Data/UserDashboardData";
import { FormEvent, useEffect, useState } from "react";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";
import { tableData } from "../../Data/jobAvailaibleTableData";
import { platforms } from "../../Data/HearAboutUs";

interface WindowSize {
  width: number;
}
function DashboardHome() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const enableBurgerMenu = (): boolean => {
    return windowSize.width <= 965; // Enable burger menu for iPad and mobile screens (less than or equal to 768px)
  };

  const [activateform, setActivateform] = useState(true);
  const toggleActivateForm = () => {
    setActivateform((prevForm) => !prevForm);
  };

  const [selectedRows, setSelectedRows] = useState<boolean[]>(() =>
    tableData.map(() => false)
  );

  const toggleSelected = (index: number) => {
    setSelectedRows((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    alert("Successful Request Sent!");
    toggleActivateForm();
  }

  return (
    <div className="flex">
      <SignUp />
      <DashboardHomeNav />

      {/* request job form */}

      {!activateform ? (
        " "
      ) : (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
          className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-[2000]"
        >
          <div className="relative w-[80%] h-max bg-white rounded flex justify-center items-center">
            <div
              onClick={() => toggleActivateForm()}
              className="absolute right-5 bottom-5 px-5 py-1 bg-black/20 hover:bg-black/40 text-white rounded-lg cursor-pointer"
            >
              Cancel
            </div>

            <form
              action=""
              method="post"
              onSubmit={onSubmit}
              className="w-full h-max p-5 text-sm"
            >
              <h1 className="text-3xl font-semibold text-center text-indigo-500 my-5">APPLICATION FOR EMPLOYMENT</h1>
              <div className="w-full h-max border-2 border-indigo-500 p-5 rounded">
                <h3>How did you hear about us?</h3>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
                  {platforms.map((platform, index) => (
                    <div className="flex gap-3 items-center">
                      <div
                        onClick={() => toggleSelected(index)}
                        className={`w-[20px] h-[20px] ${
                          !selectedRows[index] ? "border-2" : " "
                        } rounded-sm cursor-pointer`}
                      >
                        {selectedRows[index] && (
                          <div className="w-full h-full flex justify-center items-center bg-indigo-500 rounded-sm">
                            <Check className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="font-thin">{platform}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-max p-5 grid justify-items gap-3 grid-cols-1 md:grid-cols-2">
                <div className="w-full flex flex-col gap-3 ">
                  <select
                    name=""
                    id=""
                    className="py-2 px-3 bg-black/10 text-black/70 font-thin text-sm rounded outline-none"
                  >
                    {tableData.map((item) => (
                      <option value="">{item.companyName}</option>
                    ))}
                  </select>
                  <p className="text-xs font-thin px-3">
                    Please select a job opportunity from the list below that
                    best aligns with your skills and interests
                  </p>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <input
                    type="file"
                    name=""
                    id=""
                    className="py-1 w-full px-3 bg-black/10 text-black/70 font-thin text-sm rounded outline-none"
                    placeholder="Cover Letter"
                  />
                  <p className="text-xs font-thin px-3">
                    Upload your cover letter providing additional information
                    about your qualifications and interest in this position,
                    witha also your previous employment history, job title,
                    responsibilities and References
                  </p>
                </div>
              </div>
              <div className="w-full h-max pl-10">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-500/80 px-10 py-1 rounded-lg text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Home content here */}

      <div className="w-full h-max">
        {/*  Remember to enable the dark theme here(...Home header... ) */}
        <div
          className={`flex items-center gap-10 w-full h-max pt-10 m-auto ${
            enableBurgerMenu() ? "mt-[80px]" : " "
          }`}
        >
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
          <div
            className={`w-full h-max text-2xl md:text-4xl font-bold text-center mb-4`}
          >
            Welcome to K&JF
          </div>
          <div className="px-8 md:px-14 lg:px-28 text-center font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur metus ac sapien fermentum, id tincidunt eros mollis. Sed
            quis turpis sed nunc elementum fermentum. Nulla facilisi. Vivamus
            sodales massa at tortor condimentum, nec eleifend libero
            condimentum.
          </div>
          <div className="flex justify-center items-center w-full h-max mt-10">
            <button
              onClick={() => toggleActivateForm()}
              className="w-max z-40 px-10 py-2 hover:bg-indigo-500 border-none rounded-full bg-gradient-to-br from-sky-400/55 to-slate-700/55"
            >
              Request a Job
            </button>
          </div>
          <div className="flex justify-center items-center w-full h-max text-2xl ">
            <div className="text-center mt-10 pt-10 border-t-2 border-indigo-400 w-1/2 md:w-1/3 text-base md:text-regular">
              Get Started
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
            <Link to={"/dashboard/list"}>
              <div className="h-max md:h-[250px] shadow-lg bg-indigo-200/20 flex justify-center items-center flex-col gap-5 p-5 hover:bg-indigo-300/20 cursor-pointer transition ease-in-out">
                <h3 className="text-lg md:text-xl font-semibold text-center">
                  View the list of available job opportunities
                </h3>
                <p className="text-center font-thin text-sm md:text-base">
                  Simple description of the job available, consectetur
                  adipiscing elit. Nullam consectetur metus ac sapien fermentum,
                  eros mollis.
                </p>
                <div>Click to view</div>
              </div>
            </Link>
            <div className="h-max md:h-[250px] shadow-lg bg-indigo-200/20 flex justify-center items-center flex-col gap-5 p-5 hover:bg-indigo-300/20 cursor-pointer transition ease-in-out">
              <h3 className="text-lg md:text-xl font-semibold text-center">
                Our Staff Members
              </h3>
              <p className="text-center font-thin text-sm md:text-base">
                Here will all contact and name of staff, elit. Nullam
                consectetur metus ac sapien fermentum, id tincidunt eros mollis.
              </p>
              <div>Click to view</div>
            </div>
          </div>
          <div className="w-full h-max mt-5">
            <div className=" w-[90%] md:w-[80%] m-auto">
              <h3 className="text-lg md:text-xl font-semibold">
                Efficient Job Management
              </h3>
              <p className="font-thin">
                Save and Organize Preferred Listings{" "}
                <span className="text-xs">
                  (Here is a list of all your saved job)
                </span>
              </p>
              <div
                className={`relative mt-5 border-l ${
                  enableBurgerMenu() ? "ml-2 pl-2" : "ml-5 pl-5"
                }`}
              >
                <div className="absolute -top-[10px] -left-[10px] w-[20px] h-[20px] bg-indigo-200 rounded-full"></div>
                <div className="w-full ml-3 h-max max-h-[400px] overflow-y-scroll p-3">
                  {selectedJob.length > 0 ? (
                    selectedJob.map((job, index) => (
                      <div
                        key={index}
                        className="w-full py-3 border-b flex justify-between items-center"
                      >
                        <h4 className="text-semibold text-black/50">
                          {index + 1}. &nbsp; {job}
                        </h4>
                        <button
                          className={`bg-red-500/20 py-1 ${
                            enableBurgerMenu()
                              ? "px-2 h-[40px]"
                              : "px-2 h-[40px]"
                          } rounded hover:bg-red-500/30`}
                        >
                          {!enableBurgerMenu() ? "Remove" : <X />}
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
            <h3 className="text-black/60 text-center font-light text-sm mb-10">
              We are here to help you
            </h3>
            <p className="px-5 text-center text-xs font-thin mb-10">
              The bridge to your dream career starts here. Discover
              opportunities, connect with employers, and navigate your path to
              success with our comprehensive job-finding platform. Empowering
              individuals to thrive in their professional journeys.
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
