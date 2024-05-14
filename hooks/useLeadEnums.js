import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useLeadEnums = () => {
    return useQuery({
        queryKey: ["LeadEnums"],
        queryFn: () => axios.get("http://localhost:8000/api/Leadenums").then((res) => res.data),
    });

   
}
