import DashboardHomeNav from "./DashboardHomeNav";
import { ImageUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react"; // Import ChangeEvent from react

interface PreviewImageTypes {
  event: ChangeEvent<HTMLInputElement>; // Use ChangeEvent<HTMLInputElement> instead of Event
  imageDiv: string;
  imagePreviewed: string;
}
interface FormData1 {
  created_at: string;
  email: string;
  id: string;
  is_active: string;
  password: string;
  role: string;
}

interface FormData2 {
  cell: string;
  created_at: string;
  cv_url: string;
  district: string;
  first_name: string;
  id: string;
  last_name: string;
  phone: string;
  profile_url: string;
  province: string;
  sector: string;
  user_id: string;
  user_specialization: string;
  village: string;
}



function getAuth(){
  // Get current user
  const token = sessionStorage.getItem('token');
  if (token){
    const parsedTokenValue = JSON.parse(token).access_token;
    return parsedTokenValue;
  }
}

function DashboardSettings() {
  const navigate = useNavigate();
  
  // To preview the Profile picture
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

  // To handle the form
  
  const [formData1, setFormData1] = useState<FormData1>({
    created_at: "",
    email: "",
    id: "",
    is_active: "",
    password: "",
    role: "",
  });

  const [formData2, setFormData2] = useState<FormData2>({
    cell: "",
    created_at: "",
    cv_url: "",
    district: "",
    first_name: "",
    id: "",
    last_name: "",
    phone: "",
    profile_url: "",
    province: "",
    sector: "",
    user_id: "",
    user_specialization: "",
    village: "",
  });



  // Uploading the CV
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('cv_file', selectedFile);

    // Get Toekn first
    const parsedToken = getAuth();
      if (parsedToken){
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/employee/add/cv_file', {
          method: 'POST',
          headers: {
            // "Content-type": "multipart/form-data",
            'Authorization': `Bearer ${parsedToken}`
          },
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          window.location.reload();
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };



  useEffect(() => {
    // const access_token = getAuth();
    // if (access_token){
    //   setParsedToken(access_token);
      
    // }
    // else{
    //   navigate('/');
    // }

    
      const parsedToken = getAuth();
      if (parsedToken){

          Promise.all([
            fetch("http://127.0.0.1:8000/api/v1/account/get_user", {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${parsedToken}`
              }
            }).then(response => response.json()),

            fetch('http://127.0.0.1:8000/api/v1/account/get_employee_profile', {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${parsedToken}`
              }
            }).then(response => response.json())
            ])
            .then(([response1, response2]) => {
                setFormData1(response1);
                setFormData2(response2);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
        else{
          navigate('/');
        }
  }, [])

  return (
    <div
      // style={{
      //   backgroundImage: `url(/hand.jpg)`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
      className="flex"
    >
      <DashboardHomeNav />

      {/* <form
        action=""
        method="post"
        className="relative w-[90%] bg-white h-[95vh] rounded-2xl overflow-y-scroll md:px-5"
      > */}
      <div
      className="relative w-[90%] bg-white h-[95vh] rounded-2xl overflow-y-scroll md:px-5"
      >
        <div className="sticky top-0 z-[2000] w-full flex justify-end items-center h-max p-5">
          <Link to="">
            <button className="border bg-cyan-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80">
              Change Password
            </button>
          </Link>
        </div>
        {/* <div className="w-full h-max">
          <h2 className="text-4xl font-extrabold text-center uppercase text-cyan-800">
            Add Job
          </h2>
        </div> */}
        <div className="flex gap-8 justify-center w-full h-max p-5">
          <div
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
                Profile Picture
              </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-max p-5">
          <div className="h-[700px] w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 p-3 pt-5 overflow-auto">
            <h2 className="uppercase">Personal Information</h2>
            <label htmlFor="" className="italic">First Name</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.first_name}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Last Name</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.last_name}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Email</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData1.email}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Province</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.province}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">District</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.district}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Sector</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.sector}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Cell</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.sector}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <label htmlFor="" className="italic">Village</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData2.sector}
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
              />
            <div className="w-full h-[100px] flex md:justify-end justify-around items-center px-10 md:px-20 gap-5">
                <button type="submit" className="border bg-green-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80">Update</button>
            </div>
              
          </div>
          <div className="h-[700px] w-full max-w-[600px] border p-5 rounded-lg flex flex-col gap-5 p-3 pt-5 overflow-auto">
            <label htmlFor="" className="italic">Curiculum Vitae</label>
              <input
                type="file"
                className="font-light py-3 px-4 border-b-2 w-[90%] outline-none"
                onChange={handleFileChange}
              />
            <div className="w-full h-[100px] flex md:justify-end justify-around items-center px-10 md:px-20 gap-5">
                <button onClick={handleUpload} className="border bg-green-800 text-white px-10 py-2 rounded-lg hover:bg-cyan-800/80">Upload</button>
            </div>
              
          </div>
        </div>
        </div>
      {/* </form> */}
    </div>
  );
}

export default DashboardSettings;
