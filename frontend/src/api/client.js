import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 10000,
})

export const fetchRecommendations = (userId, model) =>
  api.get(`/api/recommend/${userId}`, { params: { model } }).then((r) => r.data)

export const fetchAbResults = () =>
  api.get("/api/ab-results").then((r) => r.data)

export const fetchRandomUser = () =>
  api.get("/api/users/random").then((r) => r.data)

export default api