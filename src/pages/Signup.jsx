import { useState } from "react";

export default function Signup() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(name,email,password);
  }

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" className="auth-btn">
          Sign Up
        </button>

      </form>

    </div>
  );
}