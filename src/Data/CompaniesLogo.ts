import mtn from '../assets/Companies Logo/New-mtn-logo.jpg'
import horizon from '../assets/Companies Logo/new-horizon-tours-and-services-ltd.png'
import safaris from '../assets/Companies Logo/Neza-Safaris-Logo.jpg'
import maraphone from '../assets/Companies Logo/MaraPhone-Logo-600.jpg'
import freedom from '../assets/Companies Logo/freedom.jpeg'

const CompaniesLogo = [
  mtn,
  horizon,
  safaris,
  maraphone,
  freedom
];

const duplicatedCompaniesLogo = CompaniesLogo.concat(CompaniesLogo.slice(0, 5));

export default duplicatedCompaniesLogo;
