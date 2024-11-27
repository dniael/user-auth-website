import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [show, setShow] = useState<boolean>(false);
  const [errType, setErrType] = useState<string>("")


  const register = () => {
      axios.post(
          "http://localhost:6969/register", 
          { username: username, password: password, email: email },
          { withCredentials: true }
      ).then(res => {
          console.log(res.status)
          console.log(res.data)
          if (res.data === 'user already exists') { setShow(true); setErrType(res.data); return }
          if (res.data === 'invalid password') { setShow(true); setErrType(res.data); return }
          if (res.data === 'successfully registered') {window.location.href = "/login" }

      }).catch((err: AxiosError) => {
          if (err) setShow(true)
      })
  }

  return (
      <>
          <Container style={{ maxWidth: 'fit-content', verticalAlign: 'middle', top: '50px', position: 'relative' }} >

                  <Card style={{ boxShadow: '1px 2px 5px #D9D9D6'}}>
                      <Card.Header style={{ backgroundColor: 'dodgerblue', color: 'white' }} >
                          <Card.Title>Register</Card.Title>
                      </Card.Header>
                      <Card.Body>
                          <Form>
                              <Form.Group className="mb-3" controlId="formBasicUsername">
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control required 
                                      type="username" 
                                      placeholder="Username" 
                                      onChange={e => setUsername(e.target.value)}
                                  />
                                  {errType === 'user already exists' && (
                                        <Form.Text className='text-danger'>
                                            Username taken.
                                        </Form.Text>    
                                    )}
                              </Form.Group>
                                
                              <Form.Group className='mb-3'>
                                    <Form.Label>Email Address</Form.Label>
                                        <Form.Control required 
                                            type="email" 
                                            placeholder="Email" 
                                            onChange={e => setEmail(e.target.value)}
                                        />

                              </Form.Group>
                

                              <Form.Group className="mb-1" controlId="formBasicPassword">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control required 
                                      type="password"
                                      placeholder="Password"
                                      onChange={e => setPassword(e.target.value)} />
                              </Form.Group>
                              {show && (
                                  <>
                                  <Form.Text className='text-danger'>
                                    {errType === 'invalid password' && (
                                        <>
                                        Invalid password. Your password must be at least 8 characters, have at least
                                        one uppercase character, and 3 digits.
                                        </>
                                    )}
                                    
                                  </Form.Text>
                                  <br />
                                  </>
                              )}
                              
                              <Link style={{ textDecoration: 'none' }} className='mt-1' to='/login'>Have an account?</Link>
                          </Form>
                              <Button variant="primary" className="mt-2" onClick={register}>
                                  Register
                              </Button>

                      </Card.Body>

                  </Card>
          </Container>
      </>
  )
}
