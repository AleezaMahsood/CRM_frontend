import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCampaign = () => {
  return useQuery({
    queryKey: ["Campaignsdata"],
    queryFn: () =>
      axios.get("http://127.0.0.1:8000/api/campaigns").then((res) => res.data),
  });
};
export default useCampaign;
