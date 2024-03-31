import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const useLeads = () => {
    return useQuery({
        queryKey: ["leadsData"],
        queryFn: () => axios.get("http://localhost:8000/api/leads").then((res) => res.data),
    });
}
export default useLeads;