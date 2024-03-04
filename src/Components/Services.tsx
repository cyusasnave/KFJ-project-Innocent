import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceCard from "./ServiceCard";

function Services() {
  useEffect(() => {
    AOS.init({});
    AOS.refresh();
  }, []);

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className=" h-max mt-5 bg-[#E6935C]/15 p-10"
    >
      <h1
        data-aos="fade"
        data-aos-duration="1000"
        className="text-[#252525] font-bold  text-3xl lg:text-4xl text-center"
      >
        How can we help you?
      </h1>
      <p
        data-aos="fade"
        data-aos-duration="1000"
        className="p-5 text-[#252525]/55 text-center  "
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus
        risus eu erat consectetur, vel dignissim nulla tincidunt. Vivamus
        tristique, quam ac commodo sagittis, eros risus tincidunt velit, vitae
        vehicula odio eros sed urna.
      </p>
      <ServiceCard />
    </div>
  );
}

export default Services;
