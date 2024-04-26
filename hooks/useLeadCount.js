import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLeadCount = (userId) => {
  return useQuery({
    queryKey: ["LeadsCount", userId],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/user/${userId}/leads`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching lead count:", error);
      // You can update the state or handle the error in any way you want here
    },
  });
};

export default useLeadCount;
