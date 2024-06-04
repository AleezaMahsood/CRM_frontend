import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSpecificLead = async (leadId) => {
  if (!leadId) return null;
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  console.log("Token:", token); // Log the token to ensure it's retrieved

  const { data } = await axios.get(`http://localhost:8000/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const useSpecificLead = (leadId) => {
  return useQuery({
    queryKey: ['specificLead', leadId],
    queryFn: () => fetchSpecificLead(leadId),
    enabled: !!leadId, // Only run the query if leadId is not null
    onError: (error) => {
      console.error('Error fetching specific lead:', error);
    },
  });
};

export default useSpecificLead;
