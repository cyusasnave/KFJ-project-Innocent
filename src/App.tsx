import Home from "./Components/Home";
import "./App.css";
import Services from "./Components/Services";
import MultiPallax from "./Components/MultiPallax";
import Welcome from "./Components/Welcome";
import { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import CompaniesLogo from "./Data/CompaniesLogo";
import CompanySlider from "./Components/Companies";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";




import Header from './Components/Header'; // Adjust the path accordingly

function App() {
   useEffect(() => {
     AOS.init();

     return () => {
       AOS.refresh();
     };
   }, []);
  return (
    <div className="scrollable-content text-sm">
      <Header />
      <Home />
      <MultiPallax />
      <Welcome />
      <Services />
      <CompanySlider companies={CompaniesLogo} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
