import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  UserCircle,
} from "lucide-react";
import DasboardNav, { NavItem } from "./DasboardEmployerNav";

function DashboardHomeNav() {
  return (
      <DasboardNav>
        <NavItem icon={<LayoutDashboard size={20} />} title="Home" link='/dashboard/employer' />
        <NavItem icon={<BarChart3 size={20} />} title="Job available" alert link='/dashboard/employer/list' />
        <NavItem icon={<UserCircle size={20} />} title="Messages" link='/dashboard/employer/messages' />
        <NavItem icon={<Package size={20} />} title="Job Requests" link='/dashboard/employer/jobrequests' />
        <hr className="my-3" />
        <NavItem icon={<Settings size={20} />} title="Settings" link='/dashboard/employer/settings' alert />
        <NavItem icon={<LifeBuoy size={20} />} title="Help" link='/dashboard/employer/help' />
        <NavItem icon={<LogOut size={20} />} title="Help" link='/dashboard/employer/help' />
      </DasboardNav>
  );
}

export default DashboardHomeNav;
