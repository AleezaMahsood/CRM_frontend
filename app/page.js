import Login from "@/views/Login";
import CreateLeads from "@/views/CreateLeads";
import CreateProject from "@/views/CreateProjects";
import CreateCampaign from "@/views/CreateCampaigns";
import Createform from "@/User/view/CreateLead";
import CreateUsers from "@/views/CreateUsers";
import UserSidebar from "@/components/UserSidebar";
import Dashboard from "@/User/view/Dashboard";
import TypebotInitializer from "@/components/typebot";
import Sidebar from "@/components/Sidebar"
import AdminGraph from "@/views/AdminGraph";
export default function Home() {
  return (
    <main>
      {/* <CreateLeads /> */}
   {/* <CreateUsers /> */}
   <div id="typebot-container"></div> {/* Target div for the script */}
   <TypebotInitializer />
      <Login />
    </main>
  );
}
