import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useEnums = () => {
    return useQuery({
        queryKey: ["userEnums"],
        queryFn: () => axios.get("http://localhost:8000/api/enums").then((res) => res.data),
    });

   
}