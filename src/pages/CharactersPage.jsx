import { useState, useEffect } from "react";
import { useDragonBallApi } from "../hooks/useDragonBallApi";

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const [endpoint, setEndpoint] = useState("people?page=1&limit=10");

  const { data, loading, error } = useDragonBallApi(endpoint);

  if (loading) {
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "40px" }}>
        Cargando personajes...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "40px" }}>
        Error: {error}
      </h2>
    );
  }

  const characters = Array.isArray(data?.results)
    ? data.results
    : Array.isArray(data?.result)
    ? data.result
    : [];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "30px",
          fontSize: "2.2rem",
        }}
      >
        Personajes de Star Wars
      </h1>

      {/* FORMULARIO DE BÚSQUEDA */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const term = search.trim();

          if (term === "") {
            setEndpoint("people?page=1&limit=10");
          } else {
            setEndpoint(`people/?name=${encodeURIComponent(term)}`);
          }
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre (ej: Luke)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #555",
            minWidth: "260px",
            background: "#111",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#ffcc00",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </form>

      {/* GRID DE PERSONAJES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {characters.map((person) => (
          <CharacterCard
            key={person.uid}
            uid={person.uid}
            name={person.name}
            url={person.url}
          />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ uid, name, url }) {
  const [details, setDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function loadDetails() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDetails(json.result.properties);
      } catch (err) {
        console.error("Error cargando detalles", err);
      }
    }

    loadDetails();
  }, [url]);

  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;

  const forceLevel = (() => {
    if (!details) return "Desconocido";
    const h = parseInt(details.height, 10);
    if (isNaN(h)) return "Desconocido";
    if (h >= 190) return "Leyenda galáctica";
    if (h >= 175) return "Caballero Jedi";
    if (h >= 160) return "Padawan prometedor";
    return "Chatarrero de Tatooine";
  })();

  return (
    <div
      style={{
        width: "220px",
        background: expanded ? "#222831" : "#1a1a1a",
        borderRadius: "12px",
        boxShadow: expanded
          ? "0 0 18px rgba(255, 204, 0, 0.6)"
          : "0 4px 12px rgba(0,0,0,0.4)",
        padding: "15px",
        textAlign: "center",
        border: "1px solid #333",
        transition: "all 0.25s ease",
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "140px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "2px solid #444",
        }}
        onError={(e) => (e.target.style.display = "none")}
      />

      <h3 style={{ marginTop: "10px", color: "#fff" }}>{name}</h3>

      {!details ? (
        <p style={{ color: "#aaa", marginTop: "10px" }}>
          Cargando detalles...
        </p>
      ) : (
        <div style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "10px" }}>
          <p><strong>Altura:</strong> {details.height} cm</p>
          <p><strong>Género:</strong> {details.gender}</p>
          <p><strong>Nacimiento:</strong> {details.birth_year}</p>
          <p><strong>Color de ojos:</strong> {details.eye_color}</p>
          <p><strong>Color de pelo:</strong> {details.hair_color}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          background: "#ffcc00",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {expanded ? "Cerrar" : "Ver más"}
      </button>

      {expanded && details && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "0.85rem",
            textAlign: "left",
            color: "#ffd54f",
          }}
        >
          <p>
            ⚡ <strong>Nivel de la Fuerza:</strong> {forceLevel}
          </p>
          <p style={{ color: "#bbb" }}>ID interno: {uid}</p>
        </div>
      )}
    </div>
  );
}
