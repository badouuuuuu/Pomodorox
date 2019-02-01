import React from "react";
import Logo from './Logo'

const Header = () => (
  <header>
    
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <a className="navbar-item" href="/">
        <Logo/>
          <h1>Welcome on Pomodorox</h1>
        </a>
      </div>
    </nav>
  </header>
);

export default Header;