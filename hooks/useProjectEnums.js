import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useProjectEnums = () => {
    return useQuery({
        queryKey: ["ProjectEnums"],
        queryFn: () => axios.get("http://localhost:8000/api/Projectenums").then((res) => res.data),
    });

   
}
