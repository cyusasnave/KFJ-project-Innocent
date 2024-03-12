import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Settings,
  UserCircle,
} from "lucide-react";
import DasboardNav, { NavItem } from "./DasboardNav";

function DashboardHomeNav() {
  return (
      <DasboardNav>
        <NavItem icon={<LayoutDashboard size={20} />} title="Home" link='/dashboard' />
        <NavItem icon={<BarChart3 size={20} />} title="Job available" alert link='/dashboard/list' />
        <NavItem icon={<UserCircle size={20} />} title="Messages" link='/dashboard/messages' />
        <NavItem icon={<Package size={20} />} title="Job Requests" link='/dashboard/jobrequests' />
        <hr className="my-3" />
        <NavItem icon={<Settings size={20} />} title="Settings" link='/dashboard/settings' alert />
        <NavItem icon={<LifeBuoy size={20} />} title="Help" link='/dashboard/help' />
      </DasboardNav>
  );
}

export default DashboardHomeNav;
