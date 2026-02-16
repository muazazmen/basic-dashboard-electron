import { BASE_URL, ENDPOINTS } from "../constant/api.constant";

export const logIn = async (data: any) => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  return res.json();
};