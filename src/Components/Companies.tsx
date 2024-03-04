import React, { useEffect, useRef } from "react";

interface CompanySliderProps {
  companies: string[]; // Array of company logo URLs
}

const CompanySlider: React.FC<CompanySliderProps> = ({ companies }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clonedCompanies = companies.concat(companies); // Append the companies array to itself to create a clone for infinite scrolling

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const startScrolling = () => {
      let scrollAmount = 1; // Adjust the scrolling speed by adjusting the value here
      const scrollDelay = 30; // Adjust the scrolling interval here

      const scroll = () => {
        container.scrollLeft += scrollAmount;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0; // Reset scroll position to the beginning when it reaches half of the container width
        }
      };

      const scrollInterval = setInterval(scroll, scrollDelay);

      return () => clearInterval(scrollInterval);
    };

    startScrolling();
  }, []);

  return (
    <div className="relative w-[90%] h-max m-auto overflow-hidden bg-darkblue py-6 mt-5">
      <h2
        data-aos="fade-right"
        data-aos-duration="1000"
        className="text-[#252525] font-bold  text-3xl lg:text-4xl text-center my-10"
      >
        Top Hiring Companies
      </h2>
      <div
        ref={containerRef}
        className="flex items-center gap-5 space-x-4 px-4 md:px-0 "
        style={{
          overflowX: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)",
        }}
      >
        {clonedCompanies.map((company, index) => (
          <img
            key={index}
            src={company}
            className="h-16 md:h-24 object-contain ml-10"
            alt={`Company ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanySlider;
