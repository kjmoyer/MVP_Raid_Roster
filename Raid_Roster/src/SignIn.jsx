import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import server from './serverRequests.js';


function SignIn({ show, toggle, setCookies }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [entryType, setEntryType] = useState('login');
  const [loginError, setLoginError] = useState('none');

  useEffect(() => {
    if (show) {
      setShowSignIn(show);
    }
  }, [show])

  useEffect(() => {
    setLoginError('none');
  }, [])

  const toggleEntry = (e) => {
    e.preventDefault();
    setEntryType(entryType === 'login' ? 'register' : 'login');
  }

  const submit = (e) => {
    e.preventDefault();
    const formElements = e.target.parentElement.parentElement.children[1].children[0];
    const info = {
      guildname: formElements[0].value,
      password: formElements[1].value
    }
    if (entryType === 'login') {
      server.get('/guild', info)
        .then(({ data }) => {
          setCookies('guildid', data);
          toggle();
        })
        .catch((err) => {
          setLoginError('block');
        })
    } else {
      server.post('/guild', info)
        .then(({ data }) => {
          setCookies('guildid', data);
          toggle();
        })
        .catch((err) => {
          setLoginError('block');
        })
    }
  }


  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title className='header'>{entryType === 'login' ? 'Sign Into Your Guild' : 'Register Your Guild'}</Modal.Title>
        <br></br>
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
      <h6 className='toggle_sign_in' onClick={toggleEntry}>{entryType === 'login' ? 'Click to Register a New Guild' : 'Click to Sign Into an Existing Guild'}</h6>
          <Button variant='primary' type='submit' name='submit' onClick={submit}>Submit</Button>
          <Button variant='secondary' type='button' name='close' onClick={toggle}>Close</Button>
          <br></br>
          <Alert variant='danger' style={{display: loginError}}>Please Try Again</Alert>
      </Modal.Footer>
    </Modal>
  )
}

export default SignIn