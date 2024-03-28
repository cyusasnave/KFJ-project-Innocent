import { ImageUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react"; // Import ChangeEvent from react

interface PreviewImageTypes {
  event: ChangeEvent<HTMLInputElement>; // Use ChangeEvent<HTMLInputElement> instead of Event
  imageDiv: string;
  imagePreviewed: string;
}

interface FormData {
  status: string,
  deadline: string,
  job_description: string,
  vacancy: number,
  job_type: string,
  experience: number,
  responsibility: string,
  job_location: string,
  gender: string
}
interface headData {
  job_category_id: string,
  job_sub_category_id: string,
}

function AddJobForm() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // const [jobResponsibilities, setJobResponsibilities] = useState<string[]>([
  //   "",
  // ]);


  // const handleResponsibilityChange = (
  //   index: number,
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const updatedResponsibilities = [...jobResponsibilities];
  //   updatedResponsibilities[index] = event.target.value;
  //   setJobResponsibilities(updatedResponsibilities);
  // };


  // To hande the form
  const [formData, setFormData] = useState<FormData>({
    status: "",
    deadline: "",
    job_description: "",
    vacancy: 1,
    job_type: "",
    experience: 0,
    responsibility: "",
    job_location: "",
    gender: ""
  });

  // To hande the form
  const [headData, setHeadData] = useState<headData>({
    job_category_id: "",
    job_sub_category_id: "",
  });

  // Handle change in form inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can perform validation or other actions before saving the form data
    console.log();
    
    console.log('Form submitted:', formData);
    // Reset form fields after submission
    setFormData({
      status: "",
      deadline: "",
      job_description: "",
      vacancy: 1,
      job_type: "",
      experience: 0,
      responsibility: "",
      job_location: "",
      gender: ""
    });
  };



  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/v1/jobs/category/data/all")
      .then(response => response.json()),

      fetch('http://127.0.0.1:8000/api/v1/jobs/sub_category/data/all')
      .then(response => response.json())
      ])
      .then(([response1, response2]) => {
          setCategories(response1);          
          setSubCategories(response2);
          
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }, [])

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
        onSubmit={handleSubmit}
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
        <div className="w-full h-max mb-5">
          <h2 className="text-4xl font-extrabold text-center uppercase text-cyan-800">
            Add Job
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center w-full h-max p-5">
          <div className="h-[500px] overflow-auto w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 justify-start items-center">
          <div className="w-[90%]">
              <label htmlFor="">Position:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="Manager">Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Secretaire">Secretaire</option>
                <option value="Any">Any</option>
              </select>
          </div>
          <div className="w-[90%]">
              <label htmlFor="">Job Category:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none" name="job_category_id" value={headData.job_category_id} onChange={handleInputChange}>
                <option value="">Select ...</option>
                {categories.map((item, index) => (
                  <option value={item.id}>{item.category}</option>
                ))}
              </select>
            </div>
            <div className="w-[90%]">
              <label htmlFor="">Job Sub Category:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                {subCategories.map((item, index) => (
                  <option value={item.id}>{item.sub_category}</option>
                ))}
              </select>
            </div>
          <div className="w-[90%]">
              <label htmlFor="">DeadLine:</label>
              <input
              type="date"
              placeholder="Deadline"
              name="deadline"
              className="font-light py-3 px-4 border-b-2 w-[100%] outline-none"
              value={formData.deadline}
              onChange={handleInputChange}

              />
            </div>
            
            <div className="w-[90%]">
              <label htmlFor="">Number of Employees:</label>
              <input
              type="number"
              min={1}
              placeholder="Number of Employees"
              className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleInputChange}
            />
            </div>
            
          </div>
          <div className="h-[500px] overflow-auto w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 justify-start items-center p-3 pt-5">
            <div className="w-[90%]">
              <label htmlFor="">Location:</label>
              <input
                type="text"
                min={0}
                placeholder="Province/District/Sector"
                className="font-light py-3 px-4 border-b-2 w-[100%] outline-none"
                name="job_location"
                onChange={handleInputChange}
                value={formData.job_location}
              />
            </div>
            <div className="w-[90%]">
              <label htmlFor="">Experience [Years]:</label>
              <input
                type="number"
                min={0}
                placeholder="Year of experience"
                className="font-light py-3 px-4 border-b-2 w-[100%] outline-none"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
            
            
            <div className="w-[90%]">
              <label htmlFor="">Gender:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="w-[90%]">
              <label htmlFor="">Job type:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="Daily">Daily</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>
            </div>
            <div className="w-[90%]">
              <label htmlFor="">Status:</label>
              <select className="font-light w-full py-3 px-4 border-b-2 w-[90%] outline-none">
                <option value="Urgent">Urgent</option>
                <option value="Part-Time">Featured</option>
              </select>
            </div>
          </div>
          <div className="h-[400px] w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 p-3 pt-5 overflow-auto">
            {/* {jobResponsibilities.map((responsibility, index) => ( */}
              <input
                type="text"
                placeholder="Add Job Responsibilities"
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
                value={formData.responsibility}
                onChange={handleInputChange}
                name="responsibility"
              />
            {/* ))} */}
            {/* <div className="w-full">
              <button
                type="button"
                className="border bg-cyan-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80 w-full"
                onClick={handleAddAnother}
              >
                Add Another
              </button>
            </div> */}
          </div>


          <div className="h-[400px] w-full flex flex-1 border rounded-lg">
            <textarea 
            name="job_description"
            id=""
            className="w-full h-full bg-black/5 resize-none font-light p-5  outline-none"
            placeholder="Job description includes a long text describing any further requirements, or any information a job applicant must be aware of."
            value={formData.job_description}
            onChange={handleInputChange}
            >
            </textarea>
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
