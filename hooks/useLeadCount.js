import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLeadCount = (userId) => {
  return useQuery({
    queryKey: ["LeadsCount", userId], // Include userId in the queryKey
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/user/${userId}/leads`).then((res) => res.data), // Pass userId in the API URL
  });
};
export default useLeadCount;
