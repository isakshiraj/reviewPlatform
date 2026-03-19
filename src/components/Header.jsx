import { Link } from "react-router-dom";

function Header(){

  return(

    <header className="navbar">

      <div className="logo">
        <Link to="/">ReviewHub</Link>
      </div>

      <nav className="nav-links">

  

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>

      </nav>

    </header>

  )
}

export default Header;