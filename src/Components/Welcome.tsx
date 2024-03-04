import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProfilePicture from "../assets/steve-jobs.jpg";

function Welcome() {
  useEffect(() => {
    AOS.init({});
    AOS.refresh();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className="w-[90%] m-auto p-10 bg-[#E6935C]/15"
    >
      <p className="leading-6 text-[#252525] text-justify">
        <span className="text-xl font-semibold italic text-indigo-500 mr-2">
          "
        </span>{" "}
        Welcome to our website dedicated to helping individuals find their ideal
        job opportunities! Whether you're a seasoned professional seeking a
        career change or a recent graduate eager to kickstart your professional
        journey, you've come to the right place. Our platform is designed to
        connect talented individuals with diverse job openings across various
        industries and sectors. With user-friendly features and advanced search
        capabilities, navigating through job listings has never been easier. We
        understand the importance of finding a job that not only matches your
        skills and qualifications but also aligns with your passions and
        aspirations. Our team is committed to supporting you throughout your job
        search journey, providing valuable resources, insights, and personalized
        recommendations to help you succeed in today's competitive job market.
        Start exploring now and take the next step towards achieving your career
        goals! Welcome aboard!
        <span className="text-xl font-semibold italic text-indigo-500 mr-2">
          "
        </span>
      </p>
      <div className="flex gap-5 items-center mt-5">
        <img src={ProfilePicture} className="w-[70px] h-[70px] rounded-full" />
        <div>
          <h3 className="font-semibold text-[#252525] text-2xl">Steve Jobs</h3>
          <p>KFJ President</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
