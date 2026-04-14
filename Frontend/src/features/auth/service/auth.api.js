import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const registerUser = async ({email, password, contact, fullname}) => {
  const response = await authApiInstance.post("/register", {email, password, contact, fullname});
  return response.data;
};
