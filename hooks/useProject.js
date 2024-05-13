import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useproject = () => {
  return useQuery({
    queryKey: ["Projectsdata"],
    queryFn: () =>
      axios.get("http://localhost:8000/api/projects").then((res) => res.data),
  });
};
export default useproject;
