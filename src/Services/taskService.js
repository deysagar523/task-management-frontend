import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
console.log(API_URL)
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Task creation failed");
  }
};

export const updateTask = async (id, task) => {
  console.log("Updated Task", id, task);

  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Task update failed");
  }
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
