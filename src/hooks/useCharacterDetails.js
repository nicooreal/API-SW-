import { useEffect, useState } from "react";

export function useCharacterDetails(id) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
      const json = await res.json();
      setDetails(json.result.properties);
    }

    fetchDetails();
  }, [id]);

  return details;
}
