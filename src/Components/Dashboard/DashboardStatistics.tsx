import DashboardHomeNav from "./DashboardHomeNav";
import { useNavigate } from "react-router-dom";


function DashboardStatistics() {
  
const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/")
  }
  return (
    <div className="flex gap-5">
      <DashboardHomeNav />
      <div>Statistics</div>
      <div>
      <button
            // data-aos="fade-up"
            data-aos-duration="3000"
            className="z-40 px-10 py-2 bg-indigo-500 border-none rounded-full hover:bg-gradient-to-br from-sky-400/55 to-slate-700/55"
            onClick={handleLogout}
          >
            Logout
          </button>
      </div>
      
    </div>
  );
}

export default DashboardStatistics;
