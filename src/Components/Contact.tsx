
function Contact() {
  const phoneIcon = (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-telephone"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
        fill="white"
      ></path>{" "}
    </svg>
  );
  const emailIcon = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="IconChangeColor"
    >
      <path
        d="M44 24V9H24H4V24V39H24"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="mainIconPathAttribute"
      ></path>
      <path
        d="M44 34L30 34"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="mainIconPathAttribute"
      ></path>
      <path
        d="M39 29L44 34L39 39"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="mainIconPathAttribute"
      ></path>
      <path
        d="M4 9L24 24L44 9"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        id="mainIconPathAttribute"
      ></path>
    </svg>
  );
  const addressIcon = (
    <svg
      style={{ color: "white" }}
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 14L24 42"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="24"
        cy="10"
        r="4"
        fill="none"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const iconsStyle =
    "w-[40px] md:w-[50px] h-[40px] md:h-[50px] p-3 md:p-0 bg-green-700 flex items-center justify-center rounded-full";
  return (
    <div className="w-full h-max mt-10">
      <h3
        data-aos="fade-up"
        data-aos-duration="1000"
        className="text-[#252525] font-bold  text-3xl lg:text-4xl text-center my-10"
      >
        Get in Touch: Reach Out to Us Today
      </h3>
      <p
        data-aos="fade-up"
        data-aos-duration="2000"
        className="w-[90%] m-auto px-10 pb-10 text-center text-black/75"
      >
        We're dedicated to helping you find a job that fulfills your potential
        and aligns with your career goals. Reach out to us today to receive
        personalized support and expert guidance on your job search journey
      </p>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          animation: "changePhotos 16s linear infinite",
        }}
        className=" w-full h-full"
      >
        <div
          style={{ background: "rgba(0,0,0,0.7)" }}
          className=" w-full h-full !grid grid-cols-1 md:grid-cols-2 gap-20 justify-items-center items-center p-10 pt-20"
        >
          <div
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="relative bg-white min-w-[70%] max-w-[400px] h-[300px] rounded-xl flex items-center justify-center p-3"
          >
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-[20px] md:w-[30px] h-[20px] md:h-[30px] bg-white rounded-full"></div>
            <div className="absolute -left-3 md:-top-0 md:-left-7 h-full border"></div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-[20px] md:w-[30px] h-[20px] md:h-[30px] bg-white rounded-full"></div>
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-[20px] md:w-[30px] h-[20px] md:h-[30px] bg-white rounded-full"></div>
            <div className="absolute -right-3 md:-top-0 md:-right-7 h-full border"></div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-[20px] md:w-[30px] h-[20px] md:h-[30px] bg-white rounded-full"></div>
            <div>
              {/* Phone */}
              <div className="flex items-center gap-3 font-extrabold">
                <div className={iconsStyle}>{phoneIcon}</div>
                <div>
                  <h4 className="text-sm font-extrabold">Phone</h4>
                  <div className="text-xs">(+250) 785 555 555</div>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3 font-extrabold mt-5">
                <div className={iconsStyle}>{emailIcon}</div>
                <div>
                  <h4 className="text-sm font-extrabold">Email</h4>
                  <div className="text-xs">dwaynejohnson@gmail.com</div>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-center gap-3 font-extrabold mt-5">
                <div className={iconsStyle}>{addressIcon}</div>
                <div>
                  <h4 className="text-sm font-extrabold">Address</h4>
                  <div className="text-xs">
                    Camp Kigali, Nyarugenge, Kigali, Rwanda
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="text-7xl font-extrabold max-w-[500px] w-full h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.48868695616!2d30.057815073961383!3d-1.9580599980241946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42ca15f487f%3A0x46ee37d84568682!2sCamp%20Kigali!5e0!3m2!1sen!2srw!4v1709449715076!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
