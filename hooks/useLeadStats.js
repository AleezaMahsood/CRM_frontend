import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLeadStats = () => {
  return useQuery({
    queryKey: ["LeadStats"],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/admin/stats`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching Data:", error);
      // You can update the state or handle the error in any way you want here
    },
  });
};

export default useLeadStats;
