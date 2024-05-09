import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useUsers = () => {
    return useQuery({
        queryKey: ["usersData"],
        queryFn: () => axios.get("http://localhost:8000/api/users").then((res) => res.data),
    });

   
}
