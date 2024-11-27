import React, { useContext } from 'react'
import { myContext } from '../pages/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './hover.css'
import axios from 'axios';

export default function NavBar() {
    const ctx = useContext(myContext)

    const logout = () => {
        axios.get('http://localhost:6969/logout', { withCredentials: true }).then(res => {
            console.log(res.data)
        })

    }

    const noUL = { textDecoration: 'none' }
    return (
        <Navbar className="p-2 mb-10" bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link style={noUL} to="/">
                        <Nav.Link href="/">Home</Nav.Link> 
                    </Link>

                    { ctx ? (
                        <>
                        <Link style={noUL} to="/profile">
                            <Nav.Link href="/profile">Profile</Nav.Link>  
                        </Link>
                        <Nav.Link onClick={logout} href="/">Logout</Nav.Link>  
                        </>
                    ) : (
                        <>
                        <Link style={noUL} to="/login">
                        <Nav.Link href="/login">Login</Nav.Link> 
                        </Link>
                        <Link style={noUL} to="/register">
                            <Nav.Link href="/register">Register</Nav.Link>  
                        </Link>
                        </>
                    )} 
                    
                    
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}
