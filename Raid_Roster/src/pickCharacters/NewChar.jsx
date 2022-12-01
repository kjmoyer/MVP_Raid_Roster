import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Modal, Button, Form } from 'react-bootstrap';
import server from '../serverRequests.js';



function NewChar({ show, toggleNewChar, addNewCharToList, editChar, listName, removeFromCurrent, cookies }) {

  let [showModal, setShowModal] = useState(false);
  let [specs, setSpecs] = useState([])
  let [char, setChar] = useState(undefined);

  useEffect(() => {
    if (show !== undefined) {
      setShowModal(show);
    }
  }, [show])

  useEffect(() => {
    if (editChar) {
      setChar(editChar);
      classSelect(null, editChar.class);
    }
  }, [editChar])

  let classSelect = (e, editClass) => {
    const selectedClass = editClass || e.target.value;
    server.get('/specs', { class: selectedClass })
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
    let formSecondarySpec = formElements[3].value;
    let guildie = formElements[4].checked ? false : true;
    let guildid = cookies.guildid;

    if (!char) {
      server.post('/char',
        {
          name: formName,
          class: formClass,
          specid: formSpec,
          secondarySpecid: formSecondarySpec,
          guildmember: guildie,
          guildid: guildid
        }
      )
        .then(() => {
          return server.get('/char', { name: formName, guildid: guildid})
        })
        .then(({ data }) => {
          addNewCharToList(data[0]);
          toggleNewChar();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      server.put('/char',
        {
          name: formName,
          class: formClass,
          specid: formSpec,
          secondarySpecid: formSecondarySpec,
          guildmember: guildie,
          guildid: cookies.guildid
        }
      )
        .then(() => {
          return server.get('/char', { name: formName, guildid: cookies.guildid });
        })
        .then(({ data }) => {
          removeFromCurrent(data[0]);
          addNewCharToList(data[0]);
          toggleNewChar();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  let clearAndToggle = (e) => {
    if (e) {
      e.preventDefault();
    }
    setChar(undefined);
    toggleNewChar();
  }


  return (
    <Modal className='modal' show={showModal} onHide={clearAndToggle}>
      <Modal.Header closeButton>
        <Modal.Title className='header'>Add New Character</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { submitChar(e) }}>
          <Form.Group className='mb-3'>
            <Form.Label>Character Name</Form.Label>
            <Form.Control type='text' defaultValue={char ? char.name : null} disabled={char ? true : false}></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Class</Form.Label>
            <Form.Control as='select' onChange={classSelect} defaultValue={char ? char.class : null}>
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
            <Form.Control as='select' id={char ? 'form-edit-field' : 'non-edit'}>
              {char ? <option>Update Spec</option> : <option>Select a Spec</option>}
              {specs.map((spec, index) => {
                return <option key={index} value={specs[index].specid}>{specs[index].specname}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Secondary Spec</Form.Label>
            <Form.Control as='select' id={char ? 'form-edit-field' : 'non-edit'}>
              {char ? <option>Update Secondary Spec</option> : <option>Select a Secondary Spec</option>}
              {specs.map((spec, index) => {
                return <option key={index} value={specs[index].specid}>{specs[index].specname}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <div className='mb-3'>
              <Form.Check type='checkbox' id='default-checkbox' style={{ color: 'rgba(252, 186, 3)' }} label='Non-Guild Member' defaultChecked={listName === 'Guild Members' ? false : true}></Form.Check>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type='submit' name='submit' onClick={submitChar}>Submit</Button>
          <Button variant='secondary' type='button' onClick={clearAndToggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewChar