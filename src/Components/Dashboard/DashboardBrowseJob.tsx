import { useParams } from "react-router-dom";
import { tableData } from "../../Data/jobAvailaibleTableData";
import DashboardHomeNav from "./DashboardHomeNav";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

function DashboardBrowseJob() {
  const { id } = useParams<{ id: string }>();
  const [blogData,setData] = useState([]);


  if (id === undefined) {
    return <div>Invalid URL: No job id provided</div>;
  }

  // const jobId = parseInt(id);

  const job = blogData
  // console.log("This is data", data);

  // if (!job) {
  //   return <div>Job not found</div>;
  // }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/job/${id}`, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
          
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        setData(data)
        console.log("This is data", data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [])

  const facebookSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );

  const instagramSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );

  const twitterSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
      {" "}
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />{" "}
    </svg>
  );

  const linkInSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
  );

  const [activateform, setActivateform] = useState(true);
  const toggleActivateForm = () => {
    setActivateform((prevForm) => !prevForm);
  };

  const pageLoad = () => {
    window.location.reload();
  };

  const [activateSecondform, setActivateSecondform] = useState(true);
  const toggleActivateSecondForm = () => {
    setActivateSecondform((prevForm) => !prevForm);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    alert("Successful Request Sent!");
    toggleActivateForm();
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };
  return (
    <div className="flex gap-0 md:gap-5">
      <DashboardHomeNav />
      <div className="w-full">
        <div className="z-50 w-full flex flex-col md:flex-col lg:flex-row">
          {/* apply for job form  */}
          {activateform ? (
            " "
          ) : (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
              }}
              className="w-full h-full backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center z-[2000]"
            >
              <div className="relative w-[90%] md:w-[50%] bg-white rounded-2xl p-5 flex justify-center items-center">
                <div
                  onClick={() => {
                    toggleActivateForm();
                    pageLoad();
                  }}
                  className="absolute right-12 bottom-9 px-5 py-1 bg-black/20 hover:bg-black/40 text-white rounded-lg cursor-pointer z-20"
                >
                  Cancel
                </div>
                <form
                  action=""
                  method="post"
                  onSubmit={onSubmit}
                  className="relative w-full h-max p-5 text-sm"
                >
                  {activateSecondform ? (
                    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
                      <div className="bg-white border-2 border-black/30 w-[90%] h-max shadow-lg rounded-lg p-5 flex flex-col justify-center items-center">
                        <p className="text-red-800 text-xl">Attention!</p>
                        <p className="text-sm p-3 text-center">
                          Do you agree that the information going to provided
                          are true and any mismatched information may lead to
                          termination of the application / Wemeza ko amakuru
                          ugiye gutanga ariyo kandi amakuru azamenyeranya
                          nkatariyo ko azatera ihagarikwa ry'akazi
                        </p>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-5 items-center h-max">
                          <div
                            onClick={() => toggleActivateForm()}
                            className="px-5 py-2 bg-black/70 hover:bg-black/40 text-white rounded-full cursor-pointer mt-5"
                          >
                            DisAgree/Oya
                          </div>
                          <div
                            onClick={() => toggleActivateSecondForm()}
                            className="px-5 py-2 bg-green-800/80 hover:bg-black/40 text-white rounded-full cursor-pointer mt-5"
                          >
                            Agree/Yego
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    " "
                  )}
                  <h1 className="text-xl md:text-3xl font-semibold text-center text-indigo-500 my-5">
                    APPLICATION FOR EMPLOYMENT
                  </h1>
                  <div className="w-full h-max p-5 mb-5">
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-col justify-center items-center w-full h-max mb-5 gap-3">
                        <h3 className="text-xl md:text-3xl text-center">{job.companyName}</h3>
                        <p className="text-center">
                          We appreciate your interest in becoming part of our
                          organization
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          name=""
                          id=""
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <button className="h-[30px] w-full px-3 bg-black/10 text-end md:text-center text-black/70 font-thin text-sm rounded outline-none">
                          {selectedFile ? " " : "Choose File"}
                        </button>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-sm text-black/70 truncate">
                            {selectedFile
                              ? selectedFile.name
                              : "No file selected"}
                          </span>
                        </div>
                        {selectedFile && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <a
                              href={URL.createObjectURL(selectedFile)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 hover:underline hidden md:block"
                            >
                              View
                            </a>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center md:text-normal font-thin px-3">
                        Shyira ibaruwa isaba akazi mu mwanya watanzwe ivuga
                        kukazi ugashaka nimpamvu ugashak, ndetse nakazi
                        warusanzwe ukora/ Upload your cover letter providing
                        additional information about your qualifications and
                        interest in this position, with a also your previous
                        employment history, job title, responsibilities and
                        References
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-3 mt-5">
                    <p className="text-xs font-thin text-center">
                      Remember to check your email to fill the form required! /
                      Ibuka kureba imeyili zawe murwego rwo kuzuza igice
                      cy'igisubizo woherejwe.
                    </p>
                    <a className="text-xs font-thin text-center text-indigo-700 underline cursor-pointer mb-5">
                      Privacy policy and condition
                    </a>
                  </div>
                  <div className="w-full h-max pl-1 md:pl-10">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-500/80 px-5 md:px-10 py-1 rounded-lg text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* job information */}
        <div className="w-full md:w-full lg:w-[60%] p-5">
            <div className="relative p-4 w-full h-max shadow-inner border rounded-br-3xl rounded-tl-3xl rounded-bl-xl rounded-tr-xl overflow-hidden mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-4 w-full h-max">
                <div className="p-2 w-max">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl text-black/80 uppercase">{job.category}</h3>
                    <span className="text-sm font-light">
                      {job.sub_category}
                    </span>
                    <ul className="text-sm font-light">
                      <li className="text-sm font-light">
                        <span className="text-black/80">Education:</span>{" "}
                        {job.education}
                      </li>
                      <li className="text-sm font-light">
                        <span className="text-black/80">Experience: </span>
                        {job.experience}
                      </li>
                      <li className="text-sm font-light">
                        <span className="text-black/80">Location: </span>
                        {job.job_location}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-4 justify-center items-center ">
                  <button
                    onClick={() => toggleActivateForm()}
                    className="shadow-inner bg-indigo-600 hover:bg-indigo-600/50 px-5 py-2 text-white gap-3 rounded text-sm text-center"
                  >
                    Apply now
                  </button>
                  <p className="text-sm font-light">
                    <span className="text-black/80">Deadline: <br /></span>
                    {job.deadline}
                  </p>
                </div>
              </div>
              <div
                className={`absolute -rotate-45  top-4 -left-16 ${
                  job.status == "urgent" ? "bg-red-500" : "bg-indigo-600"
                } text-white text-center text-sm py-2 w-[200px]`}
              >
                {job.status}
              </div>
            </div>
            {/* job contents */}
            <div className="w-full h-max p-5">
              <h3 className="text-3xl my-4">Job description</h3>
              <p className="text-sm text-black/70 font-thin leading-6 text-justify my-4">
                {job.job_description}
              </p>
              <div className="w-full p-3">
                <h3 className="text-2xl my-4">Responsibilities:</h3>
                <ul className="p-3">
                  {/* {job.responsibilities.map((item) => ( */}
                    <li className="text-sm text-black/70 mb-4 font-thin w-max flex items-center gap-3">
                      <div className="w-[10px] h-[10px] bg-black rounded-full text-black"></div>
                      {job.responsibility}
                    </li>
                  {/* ))} */}
                </ul>
              </div>
              <div className="w-full p-3">
                <h3 className="text-2xl my-4">Experinces requirements:</h3>
                <ul className="p-3">
                  {/* {job.experienceList.map((item) => ( */}
                    <li className="text-sm text-black/70 mb-4 font-thin w-max flex items-center gap-3">
                      <div className="w-[10px] h-[10px] bg-black rounded-full text-black"></div>
                      {job.experience}
                    </li>
                  {/* ))} */}
                </ul>
              </div>
            </div>
          </div>
          {/* more information of the job */}
          <div className="w-full md:w-full lg:w-[40%] p-5">
            {/* job websites */}
            <div className="w-full h-max shadow-inner rounded-2xl mb-5">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center rounded-tl-2xl rounded-tr-2xl">
                <h3 className="text-xl text-black/60 pl-3">More about us</h3>
              </div>
              {/* <div className="h-[100px] flex justify-center items-center gap-5 border rounded-bl-2xl rounded-br-2xl">
                <a
                  href={job.socialMedia.facebook}
                  target="blank"
                  className="w-[40px] h-[40px] p-2 flex justify-center items-center bg-indigo-300/10 border rounded"
                >
                  {facebookSVG}
                </a>
                <a
                  href={job.socialMedia.instagram}
                  target="blank"
                  className="w-[40px] h-[40px] p-2 flex justify-center items-center bg-indigo-300/10 border rounded"
                >
                  {instagramSVG}
                </a>
                <a
                  href={job.socialMedia.linkedin}
                  target="blank"
                  className="w-[40px] h-[40px] p-2 flex justify-center items-center bg-indigo-300/10 border rounded"
                >
                  {linkInSVG}
                </a>
                <a
                  href={job.socialMedia.twitter}
                  target="blank"
                  className="w-[40px] h-[40px] p-2 flex justify-center items-center bg-indigo-300/10 border rounded"
                >
                  {twitterSVG}
                </a>
              </div> */}
            </div>
            {/* job types card */}
            <div className="w-full h-max shadow-inner rounded-2xl">
              <div className="bg-indigo-200 w-full h-[50px] flex items-center rounded-tr-2xl rounded-tl-2xl">
                <h3 className="text-xl text-black/60 pl-3">Job Overview</h3>
              </div>
              <ul className="w-full flex flex-col gap-4 text-sm p-5 border rounded-bl-2xl rounded-br-2xl">
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">
                        Published date:{" "}
                      </h5>
                      {job.published_date}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Places Available: </h5>
                      {job.vacancy}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Job type: </h5>
                      {job.job_type}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Experience: </h5>
                      {job.experience}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">
                        Job location:{" "}
                      </h5>
                      {job.job_location}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Category: </h5>
                      {job.category}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Sub Category: </h5>
                      {job.sub_category}
                    </div>
                  </label>
                </li>
                <li className="w-full">
                  <label className="w-full flex justify-between">
                    <div className="flex gap-2 font-light">
                      <h5 className="font-bold text-black/60">Gender: </h5>
                      {job.gender}
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="w-[90%] m-auto mt-20">
          <h3 className="text-black/60 text-center font-light text-sm mb-10">
            We are here to help you
          </h3>
          <p className="px-5 text-center text-xs font-thin mb-10">
            The bridge to your dream career starts here. Discover opportunities,
            connect with employers, and navigate your path to success with our
            comprehensive job-finding platform. Empowering individuals to thrive
            in their professional journeys.
          </p>
          <hr />
          <div className="w-full h-[60px] text-center text-xs font-thin pt-4 text-black/65">
            &copy; Copyright K&amp;FJ {new Date().getFullYear()} | All right
            reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBrowseJob;
