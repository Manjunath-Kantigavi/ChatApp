const BASE_URL = import.meta.env.MODE === "development"
  ? ""
  : "https://chatapp-backend-50p5.onrender.com";

export default BASE_URL;