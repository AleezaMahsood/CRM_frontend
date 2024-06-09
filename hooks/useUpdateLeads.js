import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

const updateLead = async ({ id, formData }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axiosInstance.put(`/leads/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      // Invalidate and refetch leads data after successful update
      queryClient.invalidateQueries({ queryKey: ['userLeads'] });
      queryClient.invalidateQueries({ queryKey: ['specificLead'] });
    },
    onError: (error) => {
      console.error('Error updating lead:', error);
    },
  });
};

export default useUpdateLead;
