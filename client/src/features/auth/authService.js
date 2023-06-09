import axios from "axios";

//const API_URL = "https://dall-e-y8h1.onrender.com/api/v1/users/";
const API_URL = "/api/v1/users/";

//Register user
const register = async (userData) => {
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_URL, userData, options);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => {
  console.log("in authser");
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
