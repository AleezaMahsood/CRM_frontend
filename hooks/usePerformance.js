import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePerformance = () => {
  return useQuery({
    queryKey: ["UsersPerformance"],
    queryFn: () =>
      axios.get(`http://127.0.0.1:8000/api/admin/performance`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching lead count:", error);
      // You can update the state or handle the error in any way you want here
    },
  });
};

export default usePerformance;
