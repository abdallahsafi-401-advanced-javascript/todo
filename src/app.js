import React from "react";

import ToDo from "./components/todo/todo-connected.js";
import { Nav , Navbar} from "react-bootstrap";

import TodoContext  from "./context/settings/context";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  render() {
    return (
      <>
      
        <Navbar bg="primary" variant="dark" expand="lg" className="p-3">
          <Navbar.Brand href="#home">ToDo list</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <TodoContext>
        <ToDo />
        </TodoContext>
      </>
    );
  }
}
