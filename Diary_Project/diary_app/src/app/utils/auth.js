import React from "react";

export const login = async (username, email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response.result) throw new Error("Login failed");

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default login;
