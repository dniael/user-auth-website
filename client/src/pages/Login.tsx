import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState(false);


    const login = () => {
        axios.post(
            "http://localhost:6969/login", 
            { username: username, password: password },
            { withCredentials: true }
        ).then(res => {
            if (res.status === 200) {window.location.href = "/"}

        }).catch((err: AxiosError) => {
            if (err) setShow(true)
        })
    }

    return (
        <>
        
            <Container style={{ maxWidth: '20em', verticalAlign: 'middle', top: '50px', position: 'relative' }} >

                    <Card style={{ boxShadow: '1px 2px 5px #D9D9D6'}}>
                        <Card.Header style={{ backgroundColor: 'dodgerblue', color: 'white' }} >
                            <Card.Title>Login</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="username" 
                                        placeholder="Username"
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required 
                                        type="email" 
                                        placeholder="Email" 
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Group> */}

                                <Form.Group className="mb-1" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required 
                                        type="password"
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                {show ? (
                                    <>
                                    <Form.Text className='text-danger'>Incorrect email or password</Form.Text>
                                    <br />
                                    </>
                                ) : null}
                                <div className='mt-1'>
                                    <Link style={{ textDecoration: 'none' }} to='/register'>No account?</Link>
                                    <Link style={{ textDecoration: 'none', float: 'right'}} to='/forgotpassword'>Forgot Password?</Link>
                                </div>
                            </Form>
                                <Button variant="primary" className="mt-2" onClick={login}>
                                    Login
                                </Button>

                        </Card.Body>

                    </Card>
            </Container>
        </>
    )
}
