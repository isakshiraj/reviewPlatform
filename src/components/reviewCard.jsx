export default function ReviewCard({ data }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <p>{data.text}</p>
      <p>⭐ {data.rating}</p>
    </div>
  );
}