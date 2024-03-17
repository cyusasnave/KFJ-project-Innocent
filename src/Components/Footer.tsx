import logo from "../assets/Home-assets/changed-logo.png";
import companyNames from "../Data/CompanyNames";

function Footer() {
  const facebookIcon = (
    <svg style={{ color: "white" }} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
    </svg>
  );
  const twitterIcon = (
    <svg style={{ color: "white" }} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
      {" "}
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />{" "}
    </svg>
  );
  const instagramIcon = (
    <svg style={{ color: "white" }} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
  return (
    <div className="bg-indigo-400/30 p-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 py-5 justify-items-center">
        {/* company info */}
        <div className="flex flex-col gap-3 justify-center items-center">
          {/* logo */}
          <div className=" flex justify-center items-center w-full m-auto">
            <img src={logo} alt="" /* className="w-full h-full" */ />
          </div>
          <div className=" text-lg md:text-2xl font-bold text-black/65">
            K&FJ ALL CONSULTANTS LTD
          </div>
          <div className="text-xs text-start w-[70%] m-auto pl-1 md:pl-2 text-black/65">
          To set up a conducive working environment to 
          defend the economic and social interests for 
          both employers and employees.
          </div>
          {/* Social media */}
          <div className="flex items-center gap-3">
            <div className="transition ease-in-out w-[40px] h-[40px] p-3 bg-yellow-500/50 rounded-full flex items-center justify-center hover:bg-yellow-500/80 hover:scale-[1.1]">
              {facebookIcon}
            </div>
            <div className="transition ease-in-out w-[40px] h-[40px] p-3 bg-yellow-500/50 rounded-full flex items-center justify-center hover:bg-yellow-500/80 hover:scale-[1.1]">
              {twitterIcon}
            </div>
            <div className="transition ease-in-out w-[40px] h-[40px] p-3 bg-yellow-500/50 rounded-full flex items-center justify-center hover:bg-yellow-500/80 hover:scale-[1.1]">
              {instagramIcon}
            </div>
          </div>
        </div>
        {/* menu bar */}
        <div>
          <h4 className="text-xl font-bold mb-3">Menu</h4>
          <ul className="flex flex-col gap-2">
            <li className="transition ease-in-out  text-black/65 hover:text-black hover:scale-[1.1] cursor-pointer">
              Home
            </li>
            <li className="transition ease-in-out  text-black/65 hover:text-black hover:scale-[1.1] cursor-pointer">
              About Us
            </li>
            <li className="transition ease-in-out  text-black/65 hover:text-black hover:scale-[1.1] cursor-pointer">
              Blog
            </li>
          </ul>
        </div>
        {/* partner companies */}
        <div>
          <h4 className="text-xl font-bold mb-3">Partners</h4>
          <ul className="flex flex-col gap-2">
            {companyNames.map((name) => (
              <li className="transition ease-in-out  text-black/65 hover:text-black hover:scale-[1.1] cursor-pointer">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr style={{
        borderColor: "rgba(0,0,0,0.30)"
      }} />
      <div className="w-full h-[60px] text-center pt-4 text-black/65">
        &copy; Copyright K&amp;FJ {new Date().getFullYear()} | All right
        reserved
      </div>
    </div>
  );
}

export default Footer;
