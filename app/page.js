import Login from "@/views/Login";
import CreateLeads from "@/views/CreateLeads";
import CreateProject from "@/views/CreateProjects";
import CreateCampaign from "@/views/CreateCampaigns";
import Navbar from "@/User/view/navbar"
import Createform from "@/User/view/CreateLead";
import CreateUsers from "@/views/CreateUsers";
import ShowChart from "@/User/view/ShowChart";
import Dashboard from "@/User/view/Dashboard";
import BarChart from "@/User/view/UserPerformance";
import Sidebar from "@/components/Sidebar"
export default function Home() {
  return (
    <main>
      {/* <CreateLeads /> */}
   {/* <CreateUsers /> */}
    <Sidebar />
    </main>
  );
}
