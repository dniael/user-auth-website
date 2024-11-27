import React, { useState, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { myContext } from './Context'
import Container from 'react-bootstrap/Container'

export default function Profile() {

  const ctx = useContext(myContext)

  const [deleteShow, setDeleteShow] = useState<boolean>(false)
  const handleDeleteShow = () => setDeleteShow(true), handleDeleteClose = () => setDeleteShow(false)

  const [show, setShow] = useState<boolean>(false)
  const handleShow = () => setShow(true), handleClose = () => setShow(false)

  const [password, setPassword] = useState<string>('')
  , [newPass, setNewPass] = useState<string>('')

  const [errMsg, setErrMsg] = useState<string>("")

  const deleteUser = () => {
    handleDeleteClose()
    axios
      .post('http://localhost:6969/deleteuser', { username: ctx.username }, { withCredentials: true } )
      .then(res => {
        if (res.data === 'delete success') window.location.href = '/'
      })
  }

  const changePass = () => {
    // handleClose()
    axios
      .post(
        'http://localhost:6969/changepass', 
        { email: ctx.email, oldPass: password, newPass: newPass },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data === 'pwd updated') return handleClose()
        setErrMsg(res.data)
      })
  }

  return (
    <>
      <Container>
        <Table style={{ maxWidth: 'fit-content', marginLeft: '2px' }} striped bordered hover>
          <thead>
            <tr>
              <th>
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {ctx.username}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button style={{ marginLeft: '2px' }} variant='primary' onClick={handleShow}>Change Password</Button>
        <Button style={{ marginLeft: '2px' }} variant='danger' onClick={handleDeleteShow}>Delete Account</Button>

      </Container>

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>Back</Button>
          <Button variant='danger' onClick={deleteUser}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Password</Form.Label>
            <Form.Control required 
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)} />
            {errMsg === 'incorrect pwd' ? (<Form.Text className='text-danger'>Incorrect Password <br /></Form.Text>) : null}
            <Form.Label>New Password</Form.Label>
            <Form.Control required 
              type="password"
              placeholder="Password"
              onChange={e => setNewPass(e.target.value)} />
              {errMsg === 'same pwd' ? 
                (<Form.Text className='text-danger'>
                  New Password cannot be the same as old password
                </Form.Text>) : null
              }
              {errMsg === 'invalid pwd' ?
                (<Form.Text className='text-danger'>
                  Invalid password. Your password must be at least 8 characters, have at least
                  one uppercase character, and 3 letters.
                  </Form.Text>) : null
              }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Back</Button>
          <Button variant='primary' onClick={changePass}>Change</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
