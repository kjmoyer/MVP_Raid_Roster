import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import server from '../serverRequests.js';



function NewChar({ show, toggleModal, addNewCharToList }) {

  let [showModal, setShowModal] = useState(false);
  let [specs, setSpecs] = useState([])

  useEffect(() => {
    if (show !== undefined) {
      setShowModal(show);
    }
  }, [show])

  let classSelect = (e) => {
    server.get('/specs', { class: e.target.value })
      .then(({ data }) => {
        setSpecs(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let submitChar = (e) => {
    e.preventDefault();
    let formElements = e.target.parentElement.parentElement.children[1].children[0];
    let formName = formElements[0].value;
    let formClass = formElements[1].value;
    let formSpec = formElements[2].value;
    let formSecondarySpec = formElements[3].value
    let guildie = formElements[4].checked ? false : true;
    server.post('/char',
      {
        name: formName,
        class: formClass,
        specid: formSpec,
        secondarySpecid: formSecondarySpec,
        guildmember: guildie
      }
    )
    .then(() => {
      return server.get('/char', {name: formName})
    })
    .then(({ data }) => {
      console.log(data);
      addNewCharToList(data[0]);
      toggleModal();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Character</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { submitChar(e) }}>
          <Form.Group className='mb-3'>
            <Form.Label>Character Name</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Class</Form.Label>
            <Form.Control as='select' onChange={classSelect}>
              <option>Select A Class</option>
              <option value='Death Knight'>Death Knight</option>
              <option value='Druid'>Druid</option>
              <option value='Hunter'>Hunter</option>
              <option value='Mage'>Mage</option>
              <option value='Paladin'>Paladin</option>
              <option value='Priest'>Priest</option>
              <option value='Rogue'>Rogue</option>
              <option value='Shaman'>Shaman</option>
              <option value='Warlock'>Warlock</option>
              <option value='Warrior'>Warrior</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Spec</Form.Label>
            <Form.Control as='select'>
              <option>Select a Spec</option>
              {specs.map((spec, index) => {
                return <option key={index} value={specs[index].specid}>{specs[index].specname}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Secondary Spec</Form.Label>
            <Form.Control as='select'>
              <option>Select a Secondary Spec</option>
              {specs.map((spec, index) => {
                return <option key={index} value={specs[index].specid}>{specs[index].specname}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <div className='mb-3'>
              <Form.Check type='checkbox' id='default-checkbox' label='Non-Guild Member'></Form.Check>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' type='button' onClick={toggleModal}>Close</Button>
        <Button variant="primary" type='submit' name='submit' onClick={submitChar}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewChar