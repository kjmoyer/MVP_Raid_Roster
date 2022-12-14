import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function NoSelection({ show, toggle }) {


  return (
    <Modal className='modal' show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'rgba(252, 186,3)' }} >
          Invalid Click
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='form-label'>No character selected</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' type='button' onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NoSelection;