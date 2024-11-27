import React from 'react';
import '../../../assets/styles/navbar.scss';  
import logo from '../../../assets/images/logo-transparent.png';

function Navbar() {
  return (
    <div>
      {/* Navbar section */}
      <nav className="navbar">
        <div className="navbar-logo-container">
          {/* Logo and slogan */}
          <div className="navbar-logo">
            <h1>TN</h1>
            <span className="logo-slogan">News at your fingertips</span>
          </div>
          
          {/* The Newsroom Text */}
          <div className='h1-heading'>
          <h1>The Newsroom</h1>
          </div>
          
          {/* Login/Logout section */}
          <div className="navbar-user">
            <button className="login-btn">Login</button>
          </div>
        </div>
      </nav>

      {/* Links Section below Navbar */}
      <section className="links-section">
        <ul className="links-list">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Advertise</a></li>
          <li><a href="#">Subscribe</a></li>
        </ul>
      </section>
    </div>
  );
}

export default Navbar;
