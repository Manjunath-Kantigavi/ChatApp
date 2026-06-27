const BASE_URL = import.meta.env.MODE === "development"
  ? ""
  : "https://chatapp-backend-50p5.onrender.com";

export const fetchWithCredentials = (url, options = {}) => {
  return fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};

export default BASE_URL;