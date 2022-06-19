import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <div className="header-main-line">
        The Sparks Foundation Banking System
      </div>
      <ul className="header-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/allusers">View Customers</Link>
        </li>
        <li>
          <Link to="/alltransaction">All Transactions</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
