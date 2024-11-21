import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export default api;
