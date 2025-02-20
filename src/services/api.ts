import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Assure-toi que c'est l'URL de ton backend Laravel
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
