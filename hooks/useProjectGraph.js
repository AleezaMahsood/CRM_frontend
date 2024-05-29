import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProjectGraph = () => {
  return useQuery({
    queryKey: ["ProjectGraph"],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/admin/projects-graph`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching Data:", error);
      // You can update the state or handle the error in any way you want here
    },
  });
};

export default useProjectGraph;
