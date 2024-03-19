import transparent from "../assets/transparent.png";
import { useEffect, useState } from "react";
import formPhoto from "../assets/Services-Background/capacity-building.webp";
import { useNavigate  } from 'react-router-dom';
import { useFormik } from "formik";
import signupSchema from "../Components/Validations/signup"

interface WindowSize {
  width: number;
}
function MultiPallax() {
  const [showMessage, setShowMessage] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const token = sessionStorage.getItem("token");
  const [authenticated, setAuthenticated] = useState(isAuthenticated ? JSON.parse(isAuthenticated) : false);
  const [session, setSession] = useState(token ? JSON.parse(token) : false);

  

  const navigate = useNavigate();

  const {values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit(values, formikHelpers) {
      fetch("http://localhost:8000/api/v1/create_account",{
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword
      })
      })
      .then(res =>{
        if (res.ok) {
          console.log("Account created");
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
  });

  console.log(errors);

  useEffect(() => {
    if(session !== false){
      setAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", authenticated.toString());
      // navigate("/dashboard")
    }
  }, []);

  const handleOnSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        'Content-type' : 'application/x-www-form-urlencoded'
      },
      body: `username=${encodeURIComponent(loginUsername)}&password=${encodeURIComponent(loginPassword)}`
    })
    if (response.ok) {
      const token = await response.json()
      sessionStorage.setItem("token", JSON.stringify(token))
      setAuthenticated(true);
      const authenticated = true;
      sessionStorage.setItem("isAuthenticated", authenticated.toString());

      if(token.user_type == "employee"){
        navigate("/dashboard/employee")
      }
      else if(token.user_type == "employer"){
        navigate("/dashboard/employer")
      }
    }
    else{
      const errorData = await response.json()
      console.log(errorData.detail);
    }
    }
    catch (err){
      console.log(err);
    }
  }

  // Redirect on authentication
  const checkAuthentication = () => {
    const token = sessionStorage.getItem("token");
    if (token){
      const parsedToken = JSON.parse(token);
      if(parsedToken.user_type == "employee"){
        navigate("/dashboard/employee")
      }
      else if(parsedToken.user_type == "employer"){
        navigate("/dashboard/employer")
      }
    }
  }
  // const handleOnSignUp = (event: React.FormEvent<HTMLFormElement>) =>{
  //   event.preventDefault();
  //   if (password !== "" && confirmPassword !== "") {
  //     fetch("http://localhost:8000/api/v1/create_account",{
  //     method: "POST",
  //     headers: {
  //       'Content-type' : 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password
  //     })
  //     })
  //     .then(res =>{
  //       if (res.ok) {
  //         console.log("Account created");
  //       }
  //     })
  //     .catch(err=>{
  //       console.log(err);
  //     })
     
  // }}

  const toggleMessage = () => {
    setShowMessage((prevShowMessage) => !prevShowMessage);
  };

  const msgIcon = (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-chat-left-dots-fill !text-white"
      viewBox="0 0 16 16"
      onClick={toggleMessage}
    >
      {" "}
      <path
        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        fill="white"
      ></path>{" "}
    </svg>
  );
  const caretleft = (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-left-fill -mr-1.5 z-10"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
        fill="white"
      ></path>{" "}
    </svg>
  );
  const xmark = (
    <svg
      style={{
        color: "white",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className={`bi bi-x-lg !text-white font-bold`}
      viewBox="0 0 16 16"
      onClick={toggleMessage}
    >
      {" "}
      <path
        fill-rule="evenodd"
        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
      />{" "}
      <path
        fill-rule="evenodd"
        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
      />{" "}
    </svg>
  );

  const whatsappIcon = (
    <svg
      style={{
        color: "white",
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
        fill="white"
      ></path>
    </svg>
  );

  const emailIcon = (
    <svg
      style={{
        color: "white",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="currentColor"
      className="bi bi-envelope font-bold"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
        fill="white"
      ></path>{" "}
    </svg>
  );

  const [form, setForm] = useState(false);
  const toggleForm = () => {
    setForm((prevForm) => !prevForm);
  };

  const [activateform, setActivateform] = useState(true);
  const toggleActivateForm = () => {
    setActivateform((prevForm) =>!prevForm);
  };

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

  return (
    <div className="w-full h-screen overflow-hidden relative grid place-items-center">
      {/* log in and sign up forms */}
      { activateform ? " " : (
        <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
        }}
        className="fixed top-0 left-0 w-full h-screen z-[2000] flex justify-center items-center"
      >
        <div className="bg-white w-[80%] h-[80vh] rounded-lg p-3 flex">
          <div
            style={{
              backgroundImage: `url(${formPhoto})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={`${
              enableBurgerMenu() ? "w-0 hidden" : "w-[50%]"
            } h-full border`}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.5)",
              }}
              className="w-full h-full flex justify-center items-center flex-col"
            >
              <div className="flex justify-center items-end space-x-1 md:space-x-2">
                <div className="w-10 md:w-20 h-1 mb-1 bg-neutral-400"></div>
                <h2 className="font-bold text-neutral-300 text-2xl text-center md:text-3xl">
                  The Best
                </h2>
                <div className="w-10 md:w-20 h-1 mb-1 bg-neutral-400"></div>
              </div>
              <h1 className="text-3xl md:text-5xl text-center text-white mt-5">
                To Empower Your Career
              </h1>
            </div>
          </div>

          {/* form container */}

          <div className={`relative ${
                enableBurgerMenu() ? "w-[100%]" : "w-[50%]"
              } h-full flex flex-col justify-center items-center`}>
              <div onClick={toggleActivateForm} className="absolute bottom-5 right-5 px-5 py-1 bg-black/50 rounded hover:bg-black/30 cursor-pointer">Cancel</div>
            <h3 className="text-black text-2xl font-bold mb-4 text-center">
              {form ? "Create an account?" : "Welcome Back!"}
            </h3>
            <div className="w-full flex justify-center items-center mb-4">
              <div className="w-[70%] h-max text-xs text-center font-thin text-red-500"></div>
            </div>
            {form ? (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full justify-center items-center text-center mb-4 block">
                  <input
                    type="email"
                    value={values.email}
                    // onChange={(e)=>setEmail(e.target.value)}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter your email"
                    className={errors.email ? "input-error w-[70%] p-2 border bg-gray-200 outline-none rounded": "w-[70%] p-2 border bg-gray-200 outline-none rounded"}
                  />
                  {errors.email && <p className="text-red-700">{errors.email}</p>}
                </div>
                <div className="w-full justify-center items-center text-center mb-4 block">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    // onChange={(e)=>setPassword(e.target.value)}
                    onChange={handleChange}
                    placeholder="Password"
                    className={errors.password ? "input-error w-[70%] p-2 border bg-gray-200 outline-none rounded": "w-[70%] p-2 border bg-gray-200 outline-none rounded"}
                  />
                  {errors.password && <p className="text-red-700">{errors.password}</p>}
                </div>
                <div className="w-full justify-center items-center text-center mb-4 block">
                  <input
                    type="password"
                    value={values.confirmPassword}
                    // onChange={(e)=>setConfirmPassword(e.target.value)}
                    onChange={handleChange}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={errors.confirmPassword ? "input-error w-[70%] p-2 border bg-gray-200 outline-none rounded": "w-[70%] p-2 border bg-gray-200 outline-none rounded"}
                  />
                  {errors.confirmPassword && <p className="text-red-700">{errors.confirmPassword}</p>}
                </div>

                <div className="w-full flex justify-center items-center mb-4">
                  <button
                    type="submit"
                    className="w-[70%] bg-green-300 p-2 rounded border-none hover:bg-green-500"
                  >
                    Register
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOnSignIn} method="post" className="w-full">
                <div className="w-full flex justify-center items-center mb-4">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e)=>setLoginUsername(e.target.value)}
                    name="email"
                    placeholder="Email"
                    className="w-[70%] p-2 border bg-gray-200 outline-none rounded"
                  />
                </div>
                <div className="w-full flex justify-center items-center mb-4">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                    name="password"
                    placeholder="Password"
                    className="w-[70%] p-2 border bg-gray-200 outline-none rounded"
                  />
                </div>

                <div className="w-full flex justify-center items-center mb-4">
                  <button
                    type="submit"
                    className="w-[70%] bg-green-300 p-2 rounded border-none hover:bg-green-500"
                  >
                    LogIn
                  </button>
                </div>
                <div className="w-full flex justify-center items-center mb-4">
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-end text-red-700 w-[70%] underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            )}
            <div>
              {form ? "Have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={toggleForm}
                className="text-green-700 cursor-pointer"
              >
                {form ? "LogIn" : "Register now"}
              </span>
            </div>
          </div>
        </div>
      </div>
      )}
      {/* home content */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/hand.jpg)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
      <div
        className=" absolute inset-0 z-20 text-center flex flex-col items-center justify-center gap-5 text-white text-5xl md:text-7xl"
        style={{
          background: "rgba(0,0,0,0.5)",
          backgroundImage: `url()`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className="flex justify-center items-end space-x-2 mt-16 md:space-x-12">
          <div
            className="w-20 h-1 mb-1 bg-neutral-400"
            data-aos="zoom-in"
            data-aos-duration="2000"
          ></div>
          <h2
            className="font-bold text-neutral-300 text-3xl"
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            The Best
          </h2>
          <div
            className="w-20 h-1 mb-1 bg-neutral-400"
            data-aos="zoom-in"
            data-aos-duration="2000"
          ></div>
        </div>
        <h1 data-aos="zoom-in" data-aos-duration="3000">
          To Empower Your Career
        </h1>
        <div className="fixed bottom-10 left-10">
          {showMessage ? (
            <div data-aos="fade-up" data-aos-duration="10">
              <div className=" w-16 h-16 my-5 bg-green-400 hover:bg-green-600 cursor-pointer p-3.5 rounded-full z-50 flex justify-center items-center">
                {whatsappIcon}
              </div>
              <div className=" w-16 h-16 my-5 bg-red-400 hover:bg-red-500 cursor-pointer p-3.5 rounded-full z-50 flex justify-center items-center">
                {emailIcon}
              </div>
            </div>
          ) : (
            " "
          )}
          <div className="flex items-center">
            <div className=" w-16 h-16 bg-green-400 hover:bg-green-600 p-2 rounded-full z-50 flex justify-center items-center cursor-pointer">
              {showMessage ? xmark : msgIcon}
            </div>
            {/* the pop message */}
            <div className="flex items-center">
              {caretleft}
              <div className="text-sm bg-white text-black h-10 w-[100px] rounded-md flex justify-center items-center shadow-lg shadow-black">
                {showMessage ? "Hide" : "Contact Us"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${transparent})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-full h-[50vh] flex flex-col justify-center items-center"
      >
        <div
          data-aos="fade-up"
          data-aos-duration="4000"
          className="absolute bottom-[150px] z-40  text-white/40 text-base place-items-center"
        >
          We work with businesses in all aspects
        </div>
        <div onClick={toggleActivateForm} className="absolute bottom-[50px] z-40">
          {" "}
          <button
            data-aos="fade-up"
            data-aos-duration="3000"
            className="z-40 px-10 py-2 bg-indigo-500 border-none rounded-full hover:bg-gradient-to-br from-sky-400/55 to-slate-700/55"
            onClick={checkAuthentication}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiPallax;
