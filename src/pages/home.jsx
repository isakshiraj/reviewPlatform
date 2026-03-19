import { useState } from "react";
import BusinessCard from "../components/BusinessCard";

export default function Home() {

const businesses = [
{ id: 1, name: "Pizza Hub", category: "Restaurant", location: "Delhi", rating: 4.2 },
{ id: 2, name: "Tech Store", category: "Shop", location: "Noida", rating: 3.8 },
{ id: 3, name: "Cafe Bliss", category: "Restaurant", location: "Delhi", rating: 4.5 },
];

const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [location, setLocation] = useState("");

const filtered = businesses.filter(
(b) =>
b.name.toLowerCase().includes(search.toLowerCase()) &&
(category ? b.category === category : true) &&
(location ? b.location === location : true)
);

return ( <div>


  {/* HERO SECTION */}
  <section className="hero">

  <div className="hero-left">
    <h1>Discover the Best Local Businesses</h1>
    <p>Trusted reviews from real people</p>
  </div>

  <div className="hero-right">
    <img src="/quoteImage.png" alt="reviews" />
  </div>

</section>

  {/* SEARCH SECTION */}
  <section className="search-section">

    <h2>Find Best Local Business</h2>

    <div className="filters">

      <input
        type="text"
        placeholder="Search business..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Location</option>
        <option value="Delhi">Delhi</option>
        <option value="Noida">Noida</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Category</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Shop">Shop</option>
      </select>

    </div>

  </section>

  {/* TOP RATED */}
  <section className="section">

    <h2>Top Rated Businesses</h2>

    <div className="card-container">
      {filtered.map((b) => (
        <BusinessCard key={b.id} data={b} />
      ))}
    </div>

  </section>

  {/* RECENT REVIEWS */}
  <section className="section">

    <h2>Recent Reviews</h2>

    <div className="reviews">

      <div className="review">
        ⭐⭐⭐⭐ Great service at Pizza Hub!
      </div>

      <div className="review">
        ⭐⭐⭐⭐⭐ Cafe Bliss is amazing!
      </div>

    </div>

  </section>

</div>


);
}
