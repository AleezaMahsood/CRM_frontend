/*import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useproject = () => {
  return useQuery({
    queryKey: ["Projectsdata"],
    queryFn: () =>
      axios.get("http://localhost:8000/api/projects").then((res) => res.data),
  });
};
export default useproject;*/
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjects = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:8000/api/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export default useProjects;
