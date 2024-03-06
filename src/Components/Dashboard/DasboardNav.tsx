import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavChild {
  children: ReactNode;
}

interface Item {
  icon: JSX.Element;
  title: string;
  alert?: boolean;
  link: string;
}

interface SidebarContextType {
  expanded: boolean;
  setActiveItem: (title: string) => void;
  activeItem: string | null;
}

interface WindowSize {
  width: number;
}

const defaultSidebarContextValue: SidebarContextType = {
  expanded: true,
  setActiveItem: () => {},
  activeItem: null,
};

const sidebarContext = createContext<SidebarContextType>(
  defaultSidebarContextValue
);


export default function DashboardNav({ children }: NavChild) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

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

  useEffect(() => {
    if (windowSize.width <= 965) { // Adjust the threshold based on your requirement
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [windowSize]);

  return (
    <aside className="h-screen w-max">
      <nav className="h-full flex flex-col bg-white border-r shadow-md">
        <div className="p-4 pb-3 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all text-3xl font-extrabold text-indigo-800 pl-3 ${
              expanded ? "w-52" : "w-0"
            }`}
          >{'Welcome'.toUpperCase()}</div>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <sidebarContext.Provider
          value={{ expanded, setActiveItem, activeItem }}
        >
          <ul className="flex-1 p-3">{children}</ul>
        </sidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            className="w-10 h-10 rounded-md"
            alt=""
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Snave Cyusa</h4>
              <span className="text-xs text-gray-600">
                snavecyusa@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function NavItem({ icon, title, alert, link }: Item) {
  const { expanded, setActiveItem, activeItem } = useContext(sidebarContext);

  return (
    <Link to={link}>
      <li
        onClick={() => setActiveItem(title)}
        className={`relative flex items-center py-2 px-3 my-1 
                    font-medium rounded-md cursor-pointer 
                    transition-colors group
                    ${
                      activeItem === title
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                        : "hover:bg-indigo-50 text-gray-600"
                    }
                  `}
      >
        {icon}
        <span
          className={`overflow-hidden transition all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {title}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              !expanded ? "top-2" : ""
            }`}
          />
        )}

        {!expanded && activeItem === title && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6
                        bg-indigo-100 text-indigo-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {title}
          </div>
        )}
      </li>
    </Link>
  );
}
