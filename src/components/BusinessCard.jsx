import { useNavigate } from "react-router-dom";

export default function BusinessCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      style={{ border: "1px solid gray", margin: "10px", padding: "10px", cursor: "pointer" }}
      onClick={() => navigate(`/business/${data.id}`)}
    >
      <h3>{data.name}</h3>
      <p>{data.category}</p>
      <p>{data.location}</p>
      <p>⭐ {data.rating}</p>
    </div>
  );
}