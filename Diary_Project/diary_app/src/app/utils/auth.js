import axios from "axios";
import axiosInstance from "./axiosSet";

const login = async (username, email, password) => {
  const data = { username: username, email: email, password: password };
  const response = await axiosInstance
    .post("/login", data)
    .catch((error) => console.log(error));
  if (response.data.result) {
    onLoginSuccess(response);
  }
  return response.data;
};

const onSilentRefresh = () => {
  axiosInstance
    .post("/refresh", data)
    .then(onLoginSuccess)
    .catch((error) => console.log(error));
};

const onLoginSuccess = (response) => {
  const accessToken = response.data.access_token;
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

export { login, onSilentRefresh };
