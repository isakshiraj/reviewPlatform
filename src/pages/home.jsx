import { useState } from "react";
import BusinessCard from "../components/BusinessCard";

export default function Home() {

const businesses = [
{ id: 1, name: "Pizza Hub", category: "Restaurant", location: "Delhi", rating: 4.2 },
{ id: 2, name: "Tech Store", category: "Shop", location: "Noida", rating: 3.8 },
{ id: 3, name: "Cafe Bliss", category: "Restaurant", location: "Delhi", rating: 4.5 },
{ id: 4, name: "Spice Garden", category: "Restaurant", location: "Delhi", rating: 4.6 },
{ id: 5, name: "Urban Cafe", category: "Restaurant", location: "Noida", rating: 4.3 },
{ id: 6, name: "Gadget World", category: "Shop", location: "Delhi", rating: 4.1 },
{ id: 7, name: "Tech Planet", category: "Shop", location: "Noida", rating: 4.0 },
{ id: 8, name: "Green Leaf Cafe", category: "Restaurant", location: "Delhi", rating: 4.4 },
{ id: 9, name: "Digital Hub", category: "Shop", location: "Noida", rating: 3.9 },
{ id: 10, name: "Food Paradise", category: "Restaurant", location: "Delhi", rating: 4.7 },
{ id: 11, name: "Laptop Store", category: "Shop", location: "Delhi", rating: 4.3 },
{ id: 12, name: "Coffee Corner", category: "Restaurant", location: "Noida", rating: 4.2 },
{ id: 13, name: "Smart Electronics", category: "Shop", location: "Delhi", rating: 4.1 },
];

const reviews = [
{ stars: 4, text: "Great service at Pizza Hub!" },
{ stars: 5, text: "Cafe Bliss is amazing!" },
{ stars: 4, text: "Nice ambience at Urban Cafe." },
{ stars: 5, text: "Food Paradise has incredible taste!" },
{ stars: 4, text: "Good gadget variety at Tech Store." },
{ stars: 5, text: "Coffee Corner is my favorite spot." },
{ stars: 4, text: "Spice Garden offers delicious meals." },
{ stars: 5, text: "Digital Hub has great tech deals." },
{ stars: 4, text: "Green Leaf Cafe is very relaxing." },
{ stars: 5, text: "Smart Electronics has great service." }
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

return (

<div>

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


{/* TOP RATED BUSINESSES */}

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

{reviews.map((review, index) => (

<div className="review" key={index}>

<div className="stars">
{"⭐".repeat(review.stars)}
</div>

<p>{review.text}</p>

</div>

))}

</div>

</section>

</div>

);
}