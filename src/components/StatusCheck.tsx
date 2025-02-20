import React, { useEffect, useState } from "react";
import API from "@/services/api"; // 👈 Importation correcte

const StatusCheck = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    API.get("/status")
      .then((response) => setStatus(response.data.status))
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  return <h2>Statut du serveur : {status || "Chargement..."}</h2>;
};

export default StatusCheck;
