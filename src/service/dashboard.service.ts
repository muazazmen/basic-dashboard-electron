import { BASE_URL, ENDPOINTS } from "../constant/api.constant";

export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.DASHBOARD}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  });

  return res.json();
};