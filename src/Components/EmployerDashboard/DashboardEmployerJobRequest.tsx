import DashboardHomeNav from "./DashboardEmployerHomeNav";
import { jobData } from "../../Data/dashboardJobRequest";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";


const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
]



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

  // return (
  //   <div className="flex gap-0 md:gap-5">
  //     <DashboardHomeNav />
  //     <div className="w-full h-max p-3">
  //       <table className="w-full table-collapse mt-10">
  //         <caption className="caption-top mb-5 font-bold uppercase text-lg">
  //           People who applied on your jobs
  //         </caption>
  //         <thead className="w-full h-max p-3">
  //           <tr className="w-full h-[80px] bg-indigo-200/70">
  //             <th className="text-sm md:text-lg uppercase md:font-base">
  //             <div className="flex justify-center items-center">
  //                   <div className="text-start font-extrabold p-1 md:p-3 w-2/3">
  //                   Names
  //                   </div>
  //                 </div>
  //             </th>
  //             <th className="text-sm md:text-lg font-extrabold text-start uppercase md:font-base">
  //               Job
  //             </th>
  //             <th className="text-sm md:text-lg font-extrabold  uppercase md:font-base">
  //               Actions
  //             </th>
  //             <th className="text-sm md:text-lg font-extrabold  uppercase md:font-base">
  //               Actions
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody className="w-full">
  //           {jobData.map((item: JobDataType, index: number) => (
  //             <tr
  //               key={index}
  //               className="w-full h-max border-b text-center rounded-lg mb-2"
  //             >
  //               <td
  //                 className={`h-max p-1 md:p-3  ${
  //                   !enableBurgerMenu() ? " " : " "
  //                 }`}
  //               >
  //                 <div className="flex justify-center items-center">
  //                   <div className={`text-start w-2/3 ${enableBurgerMenu() ? "text-sm" : " "}`}>
  //                     {index + 1}. {item.description}
  //                   </div>
  //                 </div>
  //               </td>
  //               <td className="h-max  p-3 text-start text-sm font-light flex flex-col">
  //                 <div className="flex flex-wrap gap-3 justify-start items-center">
  //                   <span className="text-black/50">{item.companyName}</span>{" "}
  //                   <Link to={`/dashboard/list/${item.id}`} >
  //                     <button className="text-blue-700 underline">View Job</button>
  //                   </Link>
  //                 </div>
  //               </td>
  //               <td className="h-max  p-3 text-xs font-semibold">
  //                 <div className="flex flex-wrap gap-2 w-full justify-center items-center">
  //                   {item.isApproved ? (
  //                     <button
  //                       className={`bg-green-300 h-max ${
  //                         enableBurgerMenu() ? "px-2 w-max" : "px-5 w-[100px]"
  //                       } py-2 rounded`}
  //                     >
  //                       {enableBurgerMenu() ? <Check /> : "Approved"}
  //                     </button>
  //                   ) : (
  //                     <button className={`bg-blue-300 ${
  //                       enableBurgerMenu() ? "w-max" : "w-[100px]"
  //                     } h-max px-2 py-2 rounded`}>
  //                       {enableBurgerMenu() ? <X /> : "Pending..."}
  //                     </button>
  //                   )}
  //                   <button
  //                     className={`bg-red-800/20 py-1  text-xs hover:text-white font-thin ${
  //                       enableBurgerMenu() ? "px-2 h-[33px] hidden" : "px-2 h-[33px] hidden"
  //                     } rounded hover:bg-red-800/60`}
  //                   >
  //                     {!enableBurgerMenu() ? "Remove" : <X />}
  //                   </button>
  //                 </div>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //       <div className="w-[90%] m-auto mt-20">
  //         <h3 className="text-black/60 text-center font-light text-sm mb-10">
  //           We are here to help you
  //         </h3>
  //         <p className="px-5 text-center text-xs font-thin mb-10">
  //           The bridge to your dream career starts here. Discover opportunities,
  //           connect with employers, and navigate your path to success with our
  //           comprehensive job-finding platform. Empowering individuals to thrive
  //           in their professional journeys.
  //         </p>
  //         <hr />
  //         <div className="w-full h-[60px] text-center text-xs font-thin pt-4 text-black/65">
  //           &copy; Copyright K&amp;FJ {new Date().getFullYear()} | All right
  //           reserved
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex gap-0 md:gap-5">
      <DashboardHomeNav />
      <div className="w-full h-max py-5 px-10">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Employ People</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">People who wants your jobs</p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Click a name for more details ...
        </p>

        <div className="mt-5">
          <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
              <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                  </div>
                </div>
                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                  {person.lastSeen ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default DashboardJobRequest;
