import { FormEvent, useState, useEffect } from "react";
import { AddressForm } from "../AddressForm";
import { useMultistepForm } from "../../Data/MultiStepForm";
import { UserForm } from "../UserForm";
import signUpBackground from "../../assets/signUpBackground.png";
import signFrame from "../../assets/Frame 331.png";

type FormData = {
  phoneNumber: string;
  age: string;
  birthDate: string;
  NId: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
};

const INITIAL_DATA: FormData = {
  phoneNumber: "",
  age: "",
  birthDate: "",
  NId: "",
  province: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
};

interface WindowSize {
  width: number;
}

function SignUp() {

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


  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />
    ]);

  

  const [activateform, setActivateform] = useState(true);
  const toggleActivateForm = () => {
    setActivateform((prevForm) =>!prevForm);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
    toggleActivateForm();
  }
  return (
    <>
      {!activateform ? " " : (
        <div style={{
          background: "rgba(0, 0, 0, 0.5)"
        }} className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-[2000]">
          <div className="w-[80%] h-[80vh] flex p-3 bg-white rounded">
            {/* {signUp Signup: username, password, confrim password, birth_date, province,
            district, sector, sector, cell. village, phone, national_id,
            specialization */}
            <div
              className={`relative w-[50%] h-full z-20 flex justify-start items-center p-5 ${
                enableBurgerMenu() ? "hidden" : " "
              }`}
            >
              <img
                src={signUpBackground}
                alt=""
                className="absolute inset-0 w-full h-full"
              />
              <h3 className="text-3xl md:text-6xl font-bold text-white overflow-hidden z-10 ">
                <div className=" overflow-hidden">
                  We <span className=" text-purple-800">Empower</span>
                </div>{" "}
                <div className="pt-3 overflow-hidden">
                  <span className=" text-purple-800">Your</span> Skills
                </div>
              </h3>
            </div>
            <div
              className={`relative ${
                enableBurgerMenu() ? "w-[100%]" : "w-[50%]"
              } h-full flex justify-center items-center z-50 bg-white`}
            >
              <img
                src={signFrame}
                alt=""
                className="absolute inset-0 w-full h-full -z-10 object-cover"
              />
              <form
                className="w-[70%] h-[80%]  flex flex-col items-center justify-center"
                onSubmit={onSubmit}
              >
                <div className={`absolute -top-10 -left-10 !z-[100] text-2xl font-bold w-[200px] h-[200px] rounded-full flex justify-center items-center`}>
                  {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className=" w-full h-20 flex justify-center items-center gap-5 mt-5">
                  {isFirstStep ?
                    " " : (
                    <button
                      className="bg-indigo-500 w-[45%] py-2 text-xs rounded font-medium text-white"
                      type="button"
                      onClick={back}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={
                      isLastStep
                        ? " bg-green-700 w-[45%] py-2 text-xs rounded font-medium text-white"
                        : `bg-amber-700/25 ${isFirstStep ? "w-full" : "w-[45%]"} py-2 text-xs rounded font-medium`
                    }
                    type="submit"
                  >
                    {isLastStep ? 
                      "Finish"
                     : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
