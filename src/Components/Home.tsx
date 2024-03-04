import { useEffect, useState } from "react";

import logo from "../assets/Home-assets/changed-logo.png";
import anotherLogo from "../assets/Home-assets/logo (1).png";
import categoryBackground from "../assets/categories.jpg";
import categories from "../Data/categories";
import { Link } from "react-router-dom";

interface WindowSize {
  width: number;
}

function Home() {

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

  const applySVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-envelope-check-fill"
      viewBox="0 0 16 16"
    >
      {" "}
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />{" "}
      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />{" "}
    </svg>
  );

  /* handling on scroll */

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScrolling = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  /* changing navigation background color on scroll */

  const showHideNav = `fixed  z-[1000] top-0 left-0 w-full h-[80px] flex justify-between items-center px-4 md:px-10 pt-2 ${
    isScrolled ? "bg-indigo-500 shadow-lg" : "bg-white"
  }`;

  /* changing navigation link color on scroll */

  const changeTextColor = `font-medium font-semibold cursor-pointer  ${
    isScrolled
      ? "text-white hover:text-green-300"
      : "text-black hover:text-green-800"
  }`;

  const dropDownIcon = (
    <svg
      style={{ color: `${isScrolled ? "white" : "black"}` }}
      width="16"
      height="16"
      onClick={(e) => {
        e.preventDefault();
        toggleCategories();
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
        fill={isScrolled ? "white" : "black"}
      ></path>
    </svg>
  );
  const dropUpIcon = (
    <svg
      style={{ color: `${isScrolled ? "white" : "black"}` }}
      width="16"
      height="16"
      onClick={(e) => {
        e.preventDefault();
        toggleCategories();
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
        fill={isScrolled ? "white" : "black"}
      ></path>
    </svg>
  );

  const [showCategories, setShowCategories] = useState(false);
  function toggleCategories() {
    setShowCategories((previousdrop) => !previousdrop);
  }

  const categoryLogo = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="28"
        width="36"
        height="14"
        rx="4"
        stroke="#333"
        stroke-width="1"
      />
      <path
        d="M20 7H10C7.79086 7 6 8.79086 6 11V17C6 19.2091 7.79086 21 10 21H20"
        stroke="#333"
        stroke-width="1"
        stroke-linecap="round"
      />
      <circle
        cx="34"
        cy="14"
        r="8"
        fill="none"
        stroke="#333"
        stroke-width="1"
      />
      <circle cx="34" cy="14" r="3" fill="#333" />
    </svg>
  );

  const arrowTop = (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"
        fill="white"
      ></path>
    </svg>
  );

  const scrollToHeading = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling animation
    });
  }

  return (
    <div className="w-full relative" id="home">
      {/* Home navigation bar */}

      <div className={showHideNav}>
        {/* logo */}

        <div className="w-[130px] h-[60px] p-2 flex justify-center items-center">
          <img
            src={!isScrolled ? logo : anotherLogo}
            className="w-full h-full"
            alt="K&FJ Ltd"
          />
        </div>

        {/* nav-link */}

        <div className={enableBurgerMenu() ? "hidden" : " "}>
          <ul className="flex gap-2 md:gap-5 items-center text-sm">
            <li className="px-3 md:px-5">
              <a onClick={scrollToHeading} className={changeTextColor}>
                HOME
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                ABOUT US
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                BLOGS
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a
                href="#"
                className={`flex justify-center items-center gap-3 ${changeTextColor}`}
              >
                EXPLORE JOB CATEGORIES{" "}
                {showCategories ? dropUpIcon : dropDownIcon}
              </a>
            </li>
          </ul>
        </div>

        {/* Apply for job button */}

        <div>
          <Link to="signUp">
            <button
              type="button"
              className=" py-2 px-3 bg-sky-700 border-none rounded text-white flex justify-center items-center gap-2"
            >
              {applySVG}
              Apply For A Job
            </button>
          </Link>
        </div>
      </div>
      {showCategories ? (
        <div
          data-aos="fade-up"
          data-aos-duration="10"
          className="fixed transition ease-in-out delay-300 top-[80px] w-full h-[70vh] z-50 bg-[aliceblue]"
          style={{
            backgroundImage: `url(${categoryBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className="w-full h-full flex items-center pl-5"
            style={{ background: `rgba(0,0,0,0.4)` }}
          >
            <div className="scroll-container !transition !ease-in-out !delay-1500 w-[60%] h-[90%] rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-5 justify-items-center items-center overflow-auto">
              {categories.map((category: string, index: number) => (
                <div
                  key={index}
                  className="relative border hover:text-white border-black/25 w-[200px] h-[100px] hover:!scale-[1.1] bg-[aliceblue] hover:bg-gradient-to-br from-green-400/55 to-slate-700/55 flex items-center gap-5 justify-center cursor-pointer"
                >
                  {categoryLogo} {category}
                  <div className="absolute -top-4 -left-5 bg-white w-[15px] h-[15px] rounded-full"></div>
                  <div className="absolute top-2 -left-3 h-[90%] border-l-2 border-white/65"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
      {isScrolled && (
        <div
          onClick={scrollToHeading}
          className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-sky-900 rounded-full z-50 border border-black/20 cursor-pointer"
        >
          {arrowTop}
        </div>
      )}
    </div>
  );
}

export default Home;
