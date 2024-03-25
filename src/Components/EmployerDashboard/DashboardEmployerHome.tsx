import DashboardHomeNav from "./DashboardEmployerHomeNav";
import { Bell, Users } from "lucide-react";
/* import { selectedJob } from "../../Data/UserDashboardData"; */
import { useEffect, useState } from "react";
/* import SignUp from "./SignUpEmployer"; */
import { Link } from "react-router-dom";

// import BarChartComponent from "./BarChart";
// import LineChartComponent from "./LineChart";

interface WindowSize {
  width: number;
}

// interface GridItemTypes {
//   title: string;
//   children: JSX.Element;
// }
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
    return windowSize.width <= 965;
  };

  // function GridItem({ title, children }:GridItemTypes) {
  //   return (
  //     <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl h-[400px] mt-10">
  //       <h3 className="text-2xl font-semibold text-black mb-4">{title}</h3>
  //       {children}
  //     </div>
  //   );
  // }

  return (
    <div className="flex">
      {/* <SignUp /> */}
      <DashboardHomeNav />

      <div className="w-full h-max">
        {/*  Remember to enable the dark theme here(...Home header... ) */}
        <div
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.1)), url(/hand.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
          className={`relative flex flex-col items-center gap-10 w-full h-[50vh] mb-[100px] pt-10 m-auto ${
            enableBurgerMenu() ? "" : ""
          }`}
        >

          <h1 className="w-full text-center text-white">
            <span className="font-light">Good Afternoon,</span> Janet
          </h1>

          <div className="fixed top-10 right-10">
            <div className="relative w-[50px] h-[50px] shadow-lg bg-indigo-300 hover:bg-indigo-200 flex justify-center items-center rounded-full cursor-pointer">
              <div className="absolute w-[10px] h-[10px] right-0 top-0 bg-red-400 rounded-full"></div>
              <Bell size={32} />
            </div>
          </div>

          <div
            className={`w-full h-max text-2xl md:text-4xl font-bold text-center mb-4 text-white`}
          >
            Welcome to K&JF
          </div>

          <div className="absolute -bottom-1/2 md:-bottom-1/4 w-[90%] bg-white h-max grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center p-4 rounded-lg shadow-lg">
            <div className="w-full flex flex-col gap-3 lg:flex-row h-full rounded-lg bg-cyan-800 shadow-inner flex items-center justify-center p-4">
              <div className="w-full lg:w-[50%] lg:border-r h-full md:text-center text-white pl-5 flex flex-col justify-center">
                <h3 className="text-2xl">Employees</h3>
                <h1 className="text-5xl">999+</h1>
                <p className="text-sm">2 new employees</p>
              </div>
              <div className="w-full lg:w-[50%] h-full flex-1 md:text-center text-white pl-5 flex flex-col justify-center">
                <h1 className="text-5xl mb-4">102</h1>
                <p className="text-sm">Have applied for a job</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 lg:flex-row h-full rounded-lg bg-cyan-800 shadow-inner flex items-center justify-center p-4">
            <div className="w-full lg:w-[50%] lg:border-r h-full md:text-center text-white pl-5 flex flex-col justify-center">
                <h1 className="text-5xl">88</h1>
                <h3 className="text-2xl">Job available</h3>
              </div>
              <div className="w-full lg:w-[50%] h-full md:text-center text-white pl-5 flex flex-col justify-center">
                <p className="text-sm">From</p>
                <h1 className="text-5xl">102</h1>
                <p className="text-sm text-xl">Companies</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-10">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 max-w-[1400px] mt-5">

            <GridItem title="User/Interation">
              <BarChartComponent />
            </GridItem>

            <GridItem title="Blog likes and Comments">
              <LineChartComponent />
            </GridItem>
          </div> */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
            <Link to={"/dashboard/employer/list"}>
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
          {/* <div className="w-full h-max mt-5">
            <div className=" w-[90%] md:w-[80%] m-auto">
              <h3 className="text-lg md:text-xl font-semibold">
                Efficient Job Management
              </h3>
              <p className="font-thin">
                Save and Organize Preferred Listings{" "}
                <span className="text-xs">
                  (Here is a list of all your approved job)
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
                          className={`bg-green-500/20 py-1 ${
                            enableBurgerMenu()
                              ? "px-2 h-[40px]"
                              : "px-2 h-[40px]"
                          } rounded hover:bg-red-500/30`}
                        >
                          {!enableBurgerMenu() ? "Approved" : <Check />}
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
          </div> */}
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
