import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdminGraph = () => {
  return useQuery({
    queryKey: ["AdminGraph"],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/admin/leads-graph`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching Data:", error);
      // You can update the state or handle the error in any way you want here
    },
  });
};

export default useAdminGraph;
