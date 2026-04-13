import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from "react-icons/md";

function NavBar() {
  let navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* toggle used for the mobile view, it shows threelines inside it will have all the links */}
        <Navbar.Collapse id="navbarScroll">
            {/* to show up all the links inside the toogle is collapse */}
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll 
          >
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/login/kesavan"} >Login</Nav.Link>
            <Nav.Link as={Link} to={"/signup"}>SignUp</Nav.Link>
            <Nav.Link as={Link} to={"/todo"}>TodoApp</Nav.Link>
            <Nav.Link as={Link} to={"/products"}>Products</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant='contained' color='warning'onClick={()=>{navigate("/wishlist")}}><MdOutlineAddShoppingCart/></Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
