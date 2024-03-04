import { useState } from "react";
import ServicesData from "../Data/Services";

function ServiceCard() {
  const [hoverStates, setHoverStates] = useState(Array(6).fill(false));

  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  const theCard = `transition ease-in-out delay-1500 h-[200px] min-w-full max-w-[370px] shadow-lg shadow-black flex justify-center items-center hover:!scale-[1.1]`;
  const cardStyle =
    "transition ease-in-out delay-1500 h-full w-full  flex justify-center pb-4  item-center flex-col transition ease-in-out cursor-pointer ";
  const logoCardStyle =
    "transition ease-in-out delay-1500 w-full h-[50%] flex justify-center item-center p-4 hover:none";
  const cardText =
    "transition ease-in-out delay-1500 w-full h-[10%]   text-white text-xl md:text-xl font-bold flex item-center justify-center text-center px-5";

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 h-max place-items-center mt-10">
      {ServicesData.map((card, index) => (
        <div
          key={index}
          className={theCard}
          style={{
            backgroundImage: `url(${card.background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-duration="500"
            className={cardStyle}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {hoverStates[index] ? null : (
              <div className={logoCardStyle}>
                <img src={card.icon} alt="" />
              </div>
            )}
            <h3 className={cardText}>{card.title}</h3>
            {hoverStates[index] && (
              <div className=" w-full text-center h-[50%] text-white/55 mt-5 text-xs px-7 flex flex-col justify-center items-center gap-4">
                <span>{card.description}</span>
                <a
                  href=""
                  className="text-white font-medium hover:text-green-400"
                >
                  See more &gt;{" "}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceCard;
