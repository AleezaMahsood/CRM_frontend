import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserLeads = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const token = localStorage.getItem("token");
  const response = await axios.get(`http://localhost:8000/api/user/${userId}/lead`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useUserLeads = (userId) => {
  return useQuery({
    queryKey: ['userLeads', userId],
    queryFn: fetchUserLeads,
    enabled: !!userId,
  });
};

export default useUserLeads;
