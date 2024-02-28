import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

import logo from "../assets/Home-assets/logo-1 (1).png";
import homeBackgroundImage from "../assets/Home-assets/images-back.jpg";

function Home() {

  

  /* initializing AOS */

  useEffect(() => {
    AOS.init();

    return () => {
      AOS.refresh();
    }
  }, []);

  /* Setting Home background image */

  const HomeBackground: React.CSSProperties = {
    backgroundImage: `url(${homeBackgroundImage})`,
  };

  /* apply svg */

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
      if (window.scrollY > 2) {
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

  const showHideNav = `fixed transition ease-in-out delay-500 z-[1000] top-0 left-0 w-full h-[80px] flex justify-between items-center px-4 md:px-10 pt-2 ${
    isScrolled ? "bg-white" : ""
  }`;

  /* changing navigation link color on scroll */

  const changeTextColor = `font-medium ${
    isScrolled ? "text-black" : "text-white"
  }`;

  return (
    <div>
      {/* Home navigation bar */}

      <div
        className={showHideNav}
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        {/* logo */}

        <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px]">
          <img src={logo} className="w-full h-full" alt="K&FJ Ltd" />
        </div>

        {/* nav-link */}

        <div>
          <ul className="flex gap-2 md:gap-5 items-center text-sm">
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                Home
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                Contact Us
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                About Us
              </a>
            </li>
            <li className="px-3 md:px-5">
              <a href="" className={changeTextColor}>
                Get A Job
              </a>
            </li>
          </ul>
        </div>

        {/* Apply for job button */}

        <div>
          <button
            type="button"
            className=" py-2 px-3 bg-sky-700 border-none rounded text-white flex justify-center items-center gap-2"
          >
            {applySVG}
            Apply For A Job
          </button>
        </div>
      </div>

      {/* Home page */}

      <div
        className="relative flex justify-center items-center place-items-center bg-cover bg-center w-full h-[90vh] border border-black"
        style={HomeBackground}
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="absolute w-full h-full bg-black/50"></div>
        <div className=" z-10" data-aos="slide-up" data-aos-duration="1500">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[40px] md:leading-[70px] text-center">
            We Empower Your Career
          </h1>
          <p className="text-white/55 text-base md:text-xl font-light mt-3 md:mt-5 text-center">
            We work with businesses in all Aspects
          </p>
          {/* <div className="flex flex-wrap justify-center gap-10 text-white mt-8">
            <div>
              <strong>
                <span className=" text-sky-400">Companies:</span>
              </strong>{" "}
              <span className="text-xl">1,233</span>
            </div>
            <div>
              <strong>
                <span className=" text-sky-400">Vacant Jobs:</span>
              </strong>{" "}
              <span className="text-xl">2,263</span>
            </div>
          </div> */}
          <div
            className="flex justify-center items-center"
            data-aos="zoom-in"
            data-aos-duration="3000"
          >
            <button
              type="button"
              className=" py-2 px-3 bg-sky-700 border-none rounded text-white mt-5 md:mt-10 flex justify-center items-center gap-2"
            >
              {applySVG}
              Get A Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
