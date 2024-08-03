// hooks/useApi.js

import { useState } from "react";

const useApi = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTokenPromise, setRefreshTokenPromise] = useState(null);

  // JWT 토큰을 로컬 스토리지에서 가져옵니다.
  const getAccessToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");

  // JWT 토큰을 로컬 스토리지에 저장합니다.
  const setAccessToken = (token) => localStorage.setItem("access_token", token);
  const setRefreshToken = (token) =>
    localStorage.setItem("refresh_token", token);

  // API 요청을 보내는 함수
  const request = async (url, options = {}) => {
    try {
      const token = getAccessToken();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      if (response.ok) return response;

      if (response.status === 401) {
        return handleExpiredAccessToken(url, options);
      }

      throw new Error("Network response was not ok.");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 토큰 만료시 토큰 재발급 후 기존 요청을 재시도하는 함수
  const handleExpiredAccessToken = async (url, options) => {
    try {
      if (!isRefreshing) {
        setIsRefreshing(true);
        const token = getRefreshToken();
        const response = await fetch("/refresh", {
          method: "POST",
          body: JSON.stringify({ refresh_token: token }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to refresh token");

        const data = await response.json();
        setAccessToken(data.access_token);

        setIsRefreshing(false);
      } else if (refreshTokenPromise) {
        await refreshTokenPromise;
      }

      return request(url, options); // Retry the request after refreshing the token
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { request };
};

export default useApi;
