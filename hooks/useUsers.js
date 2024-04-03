<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useUsers = () => {
    return useQuery({
        queryKey: ["usersData"],
        queryFn: () => axios.get("http://localhost:8000/api/users").then((res) => res.data),
    });

   
}
=======
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export const useUsers = () => {
    return useQuery({
        queryKey: ["usersData"],
        queryFn: () => axios.get("http://localhost:8000/api/users").then((res) => res.data),
    });

   
}
>>>>>>> 14d90a37be51f1ac8359f96d7da8fc37f5e8e9bd
