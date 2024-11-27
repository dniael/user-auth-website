import React, { useState, useEffect, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const sendEmail = () => {
        axios
            .post(
                'http://localhost:6969/forgotpassword',
                { email: email }, { withCredentials: true }
            ).then(res => {
                setErrMsg(res.data)
            })
    }

    return (
        <>
            <Container style={{ maxWidth: '20em', verticalAlign: 'middle', top: '50px', position: 'relative' }} >

                <Card style={{ boxShadow: '1px 2px 5px #D9D9D6'}}>
                    <Card.Header style={{ backgroundColor: 'dodgerblue', color: 'white' }} >
                        <Card.Title>Send Recovery Email</Card.Title>
                        </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Enter your email here so your account can be recovered</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {errMsg === 'unrecognized email' ? (
                                    <Form.Text className='text-danger'>Unrecongized Email.</Form.Text>
                                ): null}
                                {errMsg === 'token exists' ? (
                                    <Form.Text className='text-danger'>You've already asked to reset your password. Please check your email or wait until your token expires (1 hour).</Form.Text>
                                ): null}
                                {errMsg === 'email sent successfully' ? (
                                    <Form.Text className='text-success'>Email sent successfully! Please check your inbox.</Form.Text>
                                ): null}
                                {errMsg === 'error sending email' ? (
                                    <Form.Text className='text-danger'>An internal error occurred while trying to send the email. Please wait a few minutes to try again.</Form.Text>
                                ): null}
                            </Form.Group>
                            <Link style={{ textDecoration: 'none', float: 'right' }} to='/login'>Back to Login</Link>
                        </Form>              
                            <Button variant='primary' onClick={sendEmail}>Send</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
