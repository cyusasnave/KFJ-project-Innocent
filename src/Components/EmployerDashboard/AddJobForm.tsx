import { ImageUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react"; // Import ChangeEvent from react

interface PreviewImageTypes {
  event: ChangeEvent<HTMLInputElement>; // Use ChangeEvent<HTMLInputElement> instead of Event
  imageDiv: string;
  imagePreviewed: string;
}

function AddJobForm() {
  function previewImage({
    event,
    imageDiv,
    imagePreviewed,
  }: PreviewImageTypes) {
    const input = event.target as HTMLInputElement;
    const reader = new FileReader();
    const imagePreviewDiv = document.getElementById(imageDiv);

    reader.onload = function () {
      const dataURL = reader.result as string;
      const imagePreview = document.getElementById(
        imagePreviewed
      ) as HTMLDivElement;
      imagePreview.style.backgroundImage = `url('${dataURL}')`;
      imagePreview.style.backgroundSize = "cover";
      imagePreview.style.backgroundPosition = "center";
      imagePreviewDiv!.classList.add("bg-blue-600");
    };

    const files = input.files;
    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
    }
  }

  const [jobResponsibilities, setJobResponsibilities] = useState<string[]>([
    "",
  ]);

  const handleAddAnother = () => {
    setJobResponsibilities([...jobResponsibilities, ""]);
  };

  const handleResponsibilityChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedResponsibilities = [...jobResponsibilities];
    updatedResponsibilities[index] = event.target.value;
    setJobResponsibilities(updatedResponsibilities);
  };

  const [jobExperience, setJobExperience] = useState<string[]>([
    "",
  ]);

  const handleAddAnotherExperience = () => {
    setJobExperience([...jobExperience, ""]);
  };

  const handleExperienceChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedExperience = [...jobExperience];
    updatedExperience[index] = event.target.value;
    setJobExperience(updatedExperience);
  };

  return (
    <div
      style={{
        backgroundImage: `url(/hand.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-screen flex justify-center items-center"
    >
      <form
        action=""
        method="post"
        className="relative w-[90%] bg-white h-[95vh] rounded-2xl overflow-y-scroll"
      >
        <div className="sticky top-0 z-[2000] w-full flex justify-start items-center h-max p-5">
          <Link to={"/dashboard/employer/list"}>
            <button className="border bg-cyan-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80">
              Back
            </button>
          </Link>
        </div>
        {/* <div className="w-full h-max">
          <h2 className="text-4xl font-extrabold text-center uppercase text-cyan-800">
            Add Job
          </h2>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center w-full h-max p-5">
          {/* <div
            id="logoContainer"
            className="relative flex flex-col justify-center mb-5 items-center place-items-center h-[300px] w-full max-w-[400px] border-2 rounded-xl"
          >
            <input
              type="file"
              name=""
              id=""
              className="w-full h-full opacity-0 z-50"
              onChange={(e) =>
                previewImage({
                  event: e,
                  imageDiv: "imageAddLog",
                  imagePreviewed: "logoContainer",
                })
              }
            />
            <div
              id="imageAddLog"
              className="absolute w-[100px] h-[100px] bg-blue-800 p-5 rounded-full"
            >
              <ImageUp className="w-full h-full text-white" />
            </div>
            <div className="absolute -bottom-10 text-sm font-thin">
              Add company Logo
            </div>
          </div> */}
          <div className="h-max w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 justify-start items-center">
            <input
              type="text"
              placeholder="Company Name"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <input
              type="text"
              placeholder="Job Position"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <input
              type="date"
              placeholder="Job Position"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <input
              type="number"
              min={0}
              placeholder="Vacancy per year"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <div className="w-[90%]">
              <label htmlFor="">Job type:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="">Daily</option>
                <option value="">Part-Time</option>
                <option value="">Full-Time</option>
              </select>
            </div>
          </div>
          <div className="h-max w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 justify-start items-center p-3 pt-5">
            <input
              type="text"
              placeholder="Job Location"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <input
              type="text"
              placeholder="Job Category"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <input
              type="number"
              placeholder="Year of experience required"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
            />
            <div className="w-[90%]">
              <label htmlFor="">Education:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="">BSc / PhD</option>
                <option value="">BA / JD</option>
                <option value="">BEng / MBA</option>
                <option value="">BFA / MFA</option>
                <option value="">BCom / CA</option>
                <option value="">BTech / MS</option>
                <option value="">LLB / LLM</option>
                <option value="">MBBS / MD</option>
                <option value="">BPharm / PharmD</option>
                <option value="">BArch / MArch</option>
              </select>
            </div>
            <div className="w-[90%]">
              <label htmlFor="">Gender:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="">Male</option>
                <option value="">Female</option>
                <option value="">Both</option>
              </select>
            </div>
          </div>
          <div className="h-[400px] w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 p-3 pt-5 overflow-auto">
            {jobResponsibilities.map((responsibility, index) => (
              <input
                key={index}
                type="text"
                placeholder="Add Job Responsibilities"
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
                value={responsibility}
                onChange={(event) => handleResponsibilityChange(index, event)}
              />
            ))}
            <div className="w-full">
              <button
                type="button"
                className="border bg-cyan-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80 w-full"
                onClick={handleAddAnother}
              >
                Add Another
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 p-3 pt-5 overflow-auto">
            {jobExperience.map((experience, index) => (
              <input
                key={index}
                type="text"
                placeholder="Add extra Job Experience"
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
                value={experience}
                onChange={(event) => handleExperienceChange(index, event)}
              />
            ))}
            <div className="w-full">
              <button
                type="button"
                className="border bg-cyan-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80 w-full"
                onClick={handleAddAnotherExperience}
              >
                Add Another
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full max-w-[600px] border rounded-lg">
            <textarea name="" id="" className="w-full h-full bg-black/5 resize-none font-light p-5  outline-none" placeholder="Job description here"></textarea>
          </div>
          
        </div>
        <div className="w-full h-[100px] flex justify-end items-center px-10 md:px-20">
            <button type="submit" className="border bg-green-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddJobForm;
