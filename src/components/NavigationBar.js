import React from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import './NavigationBar.css'
const NavigationBar = ()=>{
return(
    <Navbar collapseOnSelect expand="lg" className="navbar-custom">
  <Container>
  <Navbar.Brand as = {Link} to="/">Heralo Weather Task</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
    </Nav>
    <Nav>
        
      <Nav.Link as = {Link} to="/"> Home</Nav.Link>
      <Nav.Link  as = {Link} to="/favorite" >
        Favorites
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
)
}

export default NavigationBar;