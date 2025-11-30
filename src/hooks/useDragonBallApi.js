// src/hooks/useDragonBallApi.js
import { useState, useEffect } from "react";

const API_BASE_URL = "https://www.swapi.tech/api";

export function useDragonBallApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_BASE_URL}/${endpoint}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Error al obtener datos");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error en useDragonBallApi:", err);
        // si el error es Error("Error al obtener datos") mostramos ese mensaje
        setError(err.message || "Error al obtener datos");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
