import DashboardHomeNav from "./DashboardHomeNav";
import { jobData } from "../../Data/dashboardJobRequest";
import { useEffect, useState } from "react";
import { Check, Search, X } from "lucide-react";

interface WindowSize {
  width: number;
}

interface JobDataType {
  companyName: string;
  isApproved: boolean;
}

function DashboardJobRequest() {

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
    return windowSize.width <= 500; // Enable burger menu for iPad and mobile screens (less than or equal to 768px)
  };

  return (
    <div className="flex gap-0 md:gap-5">
      <DashboardHomeNav />
      <div className="w-full h-max p-3">
        <div className="h-max w-full flex justify-center items-center my-5">
          <div className="w-[80%] py-2 px-5 bg-black/10 flex gap-3 rounded-full">
            <Search className="text-indigo-500" />
            <input type="text" className="w-[95%] outline-none bg-transparent" placeholder="Search" />
          </div>
        </div>
        <table className="w-full table-collapse">
          <caption className="caption-top mb-5 font-thin text-xs">
            Table 1.1: List of all available job opportunities. (<span className="text-red-800">Tip:</span> Click on the checkbox to add a job to your Preferred list)
          </caption>
          <thead className="w-full h-max p-3">
            <tr className="w-full h-[80px] bg-indigo-200/70">
              <th className="text-sm md:text-lg font-light md:font-base">REMOVE</th>
              <th className="text-sm md:text-lg font-light md:font-base">COMPANY NAME</th>
              <th className="text-sm md:text-lg font-light md:font-base">APPROVED</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {jobData.map((item: JobDataType, index: number) => (
              <tr
                key={index}
                className="w-full h-max border-b text-center rounded-lg mb-2"
              >
                <td className={`h-max  p-1 md:p-3 pl-5  ${ !enableBurgerMenu() ? " " : " "}`}>
                <button className={`bg-red-800/20 py-1 text-sm hover:text-white font-thin ${enableBurgerMenu() ? "px-2 h-[40px]" : "px-2 h-[40px]"} rounded hover:bg-red-800/60`}>
                          {!enableBurgerMenu() ? "Remove" : <X />}
                        </button>
                </td>
                <td className="h-max  p-3 text-center text-sm font-light flex flex-col"><span className="font-light">{item.companyName}</span></td>
                <td className="h-max  p-3 text-xs font-semibold">
                  {item.isApproved ? (
                    <button className={`bg-green-300 w-max h-max ${enableBurgerMenu() ? "px-2" : "px-5"} py-2 rounded`}>{enableBurgerMenu() ? (<Check />) : "Approved"}</button>
                  ) : (
                    <button className="bg-red-300 w-max h-max px-2 py-2 rounded">{enableBurgerMenu() ? (<X />) : "Not approved"}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}

export default DashboardJobRequest;
