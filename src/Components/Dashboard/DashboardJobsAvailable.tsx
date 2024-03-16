import { useEffect, useState } from "react";
import DashboardHomeNav from "./DashboardHomeNav";
import { Check, Search } from "lucide-react";
import { tableData } from "../../Data/jobAvailaibleTableData";

interface WindowSize {
  width: number;
}

interface TableRow {
  companyName: string;
  name: string;
  contact: string;
  email: string;
}

function DashboardStatistics() {
  const [selectedRows, setSelectedRows] = useState<boolean[]>(() => tableData.map(() => false));

  const toggleSelected = (index: number) => {
    setSelectedRows((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

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

  return (
    <div className="flex gap-5">
      <DashboardHomeNav />
      <div className="w-full h-max p-3">
        <div className="h-max w-full flex justify-center items-center my-5">
          <div className="w-[80%] py-2 px-5 bg-black/10 flex gap-3 rounded-full">
            <Search className="text-indigo-500" />
            <input type="text" className="w-[95%] outline-none bg-transparent" placeholder="Search" />
          </div>
        </div>
        <table className="w-full table-auto">
          <caption className="caption-top mb-5 font-thin text-xs">
            Table 1.1: List of all available job opportunities. (<span className="text-red-800">Tip:</span> Click on the checkbox to add a job to your Preferred list)
          </caption>
          <thead className="w-full h-max p-3">
            <tr className="w-full h-[80px] bg-indigo-200/70">
              <th className={!enableBurgerMenu() ? " " : "hidden"}>{" "}</th>
              <th className="text-sm md:text-lg font-light md:font-base">{enableBurgerMenu() ? "JOB DESCRIPTION, CONDITIONS & CONTACTS" : "JOB DESCRIPTION & CONDITIONS"}</th>
              <th className={`text-sm md:text-lg border-l-2 border-black/20 font-light md:font-base ${!enableBurgerMenu() ? " " : "hidden"}`}>CONTACTS</th>
              <th className={`text-sm md:text-lg border-l-2 border-black/20 font-light md:font-base ${!enableBurgerMenu() ? " " : "hidden"}`}>APPLY</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {tableData.map((item: TableRow, index: number) => (
              <tr
                key={index}
                className="w-full h-max border-b text-center rounded-lg mb-2"
              >
                <td className={`h-max  p-1 md:p-3 pl-5 md:pl-10 ${ !enableBurgerMenu() ? " " : "hidden"}`}>
                  <div
                    onClick={() => toggleSelected(index)}
                    className={`w-[23px] h-[23px] ${
                      !selectedRows[index] ? "border-2" : " "
                    } rounded-sm cursor-pointer`}
                  >
                    {selectedRows[index] && (
                      <div className="w-full h-full flex justify-center items-center bg-indigo-500 rounded-sm">
                        <Check className="text-white" />
                      </div>
                    )}
                    
                  </div>
                </td>
                <td className="h-max p-3 text-justify text-sm font-light flex flex-col"><span>{item.companyName}</span> <span className="font-light">{item.name}</span></td>
                <td className={`h-max p-3 border-l-2 ${!enableBurgerMenu() ? " " : "flex flex-col gap-3 justify-center"}`}> <span className="text-sm font-light"><strong className="font-bold">Email:</strong> {item.email}</span> <span className="text-sm font-light"><strong className="font-bold"> Tel:</strong>  {item.contact}</span></td>
                <td>
                  
                  <div className="w-full h-max pl-10">
                    <a href=""
                      className="bg-green-500 hover:bg-green-500/80 px-10 py-1 rounded-lg text-white"
                    >
                      Apply
                    </a>
                  </div>
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

export default DashboardStatistics;
