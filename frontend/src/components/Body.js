import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import bank from "./bank4.jpg";
import "./Body.css";

export default class Body extends Component {
  render() {
    return (
      <div className="body-main">
        <h2>Welcome To The Sparks Foundation banking System</h2>
        <img src={bank} alt="TSF bank" />
        <div className="button">
          <Link to="/allusers" className="link-btn">
            <Button variant="contained">View Customers</Button>
          </Link>

          <Link to="/alltransaction" className="link-btn">
            <Button variant="contained">View Transactions</Button>
          </Link>
        </div>
      </div>
    );
  }
}
