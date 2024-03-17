import DashboardHomeNav from "./DashboardHomeNav";
import { jobData } from "../../Data/dashboardJobRequest";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

interface WindowSize {
  width: number;
}

interface JobDataType {
  id: number;
  description: string;
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
        <table className="w-full table-collapse mt-10">
          <caption className="caption-top mb-5 font-bold uppercase text-lg">
            Jobs you applied for.
          </caption>
          <thead className="w-full h-max p-3">
            <tr className="w-full h-[80px] bg-indigo-200/70">
              <th className="text-sm md:text-lg uppercase md:font-base">
              <div className="flex justify-center items-center">
                    <div className="text-start font-extrabold p-1 md:p-3 w-2/3">
                    Job title
                    </div>
                  </div>
              </th>
              <th className="text-sm md:text-lg font-extrabold text-start uppercase md:font-base">
                COMPANY NAME
              </th>
              <th className="text-sm md:text-lg font-extrabold  uppercase md:font-base">
                control
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {jobData.map((item: JobDataType, index: number) => (
              <tr
                key={index}
                className="w-full h-max border-b text-center rounded-lg mb-2"
              >
                <td
                  className={`h-max p-1 md:p-3  ${
                    !enableBurgerMenu() ? " " : " "
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <div className={`text-start w-2/3 ${enableBurgerMenu() ? "text-sm" : " "}`}>
                      {index + 1}. {item.description}
                    </div>
                  </div>
                </td>
                <td className="h-max  p-3 text-start text-sm font-light flex flex-col">
                  <div className="flex flex-wrap gap-3 justify-start items-center">
                    <span className="text-black/50">{item.companyName}</span>{" "}
                    <Link to={`/dashboard/list/${item.id}`} >
                      <button className="text-blue-700 underline">View Job</button>
                    </Link>
                  </div>
                </td>
                <td className="h-max  p-3 text-xs font-semibold">
                  <div className="flex flex-wrap gap-2 w-full justify-center items-center">
                    {item.isApproved ? (
                      <button
                        className={`bg-green-300 h-max ${
                          enableBurgerMenu() ? "px-2 w-max" : "px-5 w-[100px]"
                        } py-2 rounded`}
                      >
                        {enableBurgerMenu() ? <Check /> : "Approved"}
                      </button>
                    ) : (
                      <button className={`bg-blue-300 ${
                        enableBurgerMenu() ? "w-max" : "w-[100px]"
                      } h-max px-2 py-2 rounded`}>
                        {enableBurgerMenu() ? <X /> : "Pending..."}
                      </button>
                    )}
                    <button
                      className={`bg-red-800/20 py-1  text-xs hover:text-white font-thin ${
                        enableBurgerMenu() ? "px-2 h-[33px] hidden" : "px-2 h-[33px] hidden"
                      } rounded hover:bg-red-800/60`}
                    >
                      {!enableBurgerMenu() ? "Remove" : <X />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default DashboardJobRequest;
