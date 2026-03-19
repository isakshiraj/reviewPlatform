import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";

export default function BusinessDetail() {
  const reviews = [
    { id: 1, text: "Great service!", rating: 4 },
    { id: 2, text: "Nice place!", rating: 5 },
  ];

  return (
    <div>
      <h1>Business Detail</h1>

      <ReviewForm />

      <h2>Reviews</h2>
      {reviews.map((r) => (
        <ReviewCard key={r.id} data={r} />
      ))}
    </div>
  );
}