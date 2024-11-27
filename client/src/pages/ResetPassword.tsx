import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ResetPassword() {

    const params = useParams()
    const token = params.token

    const [errMsg, setErrMsg] = useState('')
    const [msg, setMsg] = useState('')

    const [newPass, setNewPass] = useState('')

    useEffect(() => {
        axios
            .get(
                'http://localhost:6969/checkresettoken', { params: { resetPassToken: token } }
            )
            .then(res => {
                setErrMsg(res.data)
            })
    }, [])
    
    const resetPass = (e: any) => {
        e.preventDefault()
        axios
            .post(
                'http://localhost:6969/resetpass', 
                { token: token, newPass: newPass },
                { withCredentials: true}
            )
            .then(res => {
                if (res.data !== 'pwd updated') return setMsg(res.data)
                window.location.href = '/login'
            })
    }

  
    return (
        <>
        {errMsg !== 'invalid token' ? (
                   <Container style={{ maxWidth: '20em', verticalAlign: 'middle', top: '50px', position: 'relative' }} >

                    <Card style={{ boxShadow: '1px 2px 5px #D9D9D6'}}>
                        <Card.Header style={{ backgroundColor: 'dodgerblue', color: 'white' }} >
                            <Card.Title>Reset Password</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-1" controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control required 
                                        type="password"
                                        placeholder="Password"
                                        onChange={e => setNewPass(e.target.value)} />
                                </Form.Group>
                                <div className='mt-1'>
                                    <Link style={{ textDecoration: 'none' }} to='/register'>No account?</Link>
                                    <Link style={{ textDecoration: 'none', float: 'right'}} to='/resetpassword'>Forgot Password?</Link>
                                </div>
                                {msg === 'invalid token' ? (
                                    <Form.Text className='text-danger'>Your token is either invalid or has expired. Please request for another password change.</Form.Text>
                                ) : null}
                                {msg === 'invalid pwd' ? (
                                    <Form.Text className='text-danger'>
                                        Invalid password. Your new password must be at least 8 characters, have at least one uppercase character, and 3 numbers.
                                    </Form.Text>
                                ) : null}
            
                            </Form>
                            <Button variant="primary" className="mt-2" onClick={resetPass}>
                                Reset Password
                            </Button>

                        </Card.Body>

                    </Card>
            </Container>
        ) : <Container style={{ maxWidth: '20em', verticalAlign: 'middle', top: '50px', position: 'relative' }} >
                <h2>Invalid Token.</h2>
                <Link style={{ textDecoration: 'none' }} to="/login">Back to Login</Link>
            </Container>
        }
        </>
    )
}
