import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import server from '../serverRequests.js';

function ConfirmDelete({ show, toggle, active, deleteChar }) {
  let [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (show !== undefined) {
      setShowModal(show);
    }
  }, [show])

  if (!active) {
    return (
      <Modal className='modal' show={showModal} onHide={toggle}>
        <Modal.Title style={{ color: 'rgba(252, 186,3)' }} >
          Invalid Click
        </Modal.Title>
        <Modal.Body>
          <p className='form-label'>No character selected</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' type='button' onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <Modal show={showModal} onHide={toggle}>
      <Modal.Header>
        <Modal.Title style={{ color: 'rgba(252, 186,3)' }}>Are you sure you want to delete {active.name} from this list?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
      <Button variant='secondary' type='button' onClick={toggle}>No</Button>
        <Button variant="primary" type='submit' name='submit' onClick={deleteChar}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDelete;