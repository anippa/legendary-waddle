import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import CartSummary from "../cart/CartSummary";
import { Link } from "react-router-dom";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <NavbarBrand href="/">E-commerce</NavbarBrand>
            <CartSummary />
          <Nav navbar>
            <NavItem>
              <NavLink><Link to="/saveproduct">Save Product</Link></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
