import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserLeads = async (token) => {
  const { data } = await axios.get('http://127.0.0.1:8000/api/auth/user/leads', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const useUserLeads = (token) => {
  return useQuery({
    queryKey: ['userLeads'],
    queryFn: () => fetchUserLeads(token),
    onError: (error) => {
      console.error('Error fetching user leads:', error);
    },
  });
};

export default useUserLeads;
