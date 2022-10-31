import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import server from './serverRequests.js';


function SignIn({ show, toggle }) {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (show) {
      setShowSignIn(show);
    }
  }, [show])

  const submit = (e) => {
    e.preventDefault();
    const formElements = e.target.parentElement.parentElement.children[1].children[0];
    const info = {
      guildname: formElements[0].value,
      password: formElements[1].value
    }
    server.post('/guild', info);
  }


  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title className='header'>Sign Into Your Guild</Modal.Title>
        <Button></Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {submit(e)}}>
          <Form.Group className='mb-3'>
            <Form.Label>Guild Name</Form.Label>
            <Form.Control type='text' placeholder='Your Guild' />
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant='primary' type='submit' name='submit' onClick={submit}>Submit</Button>
          <Button variant='secondary' type='button' name='close' onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignIn