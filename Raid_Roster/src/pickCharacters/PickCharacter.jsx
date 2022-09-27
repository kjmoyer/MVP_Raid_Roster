import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import server from '../serverRequests.js';
import NewChar from './NewChar.jsx';
import CharsList from './CharsList.jsx';
import styles from '../styled.js'

function PickCharacter({ updateChars }) {
  let [guildChars, setGuildChars] = useState([]);
  let [nonGuildChars, setNonGuildChars] = useState([]);
  let [charsList, setCharsList] = useState(guildChars);
  let [showNewChar, setShowNewChar] = useState(false);
  let [listName, setListName] = useState('Guild Members');
  let [active, setActive] = useState({});


  useEffect(() => {
    server.get('/chars', { guildMember: true })
      .then(({ data }) => {
        setGuildChars(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    server.get('/chars', { guildMember: false })
      .then((data) => {
        setNonGuildChars(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  let toggleModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    let newBool = !showNewChar;
    setShowNewChar(newBool);
  }

  let toggleList = (e) => {
    e.preventDefault();
    if (JSON.stringify(charsList) === JSON.stringify(guildChars)) {
      setCharsList(nonGuildChars);
      setListName('Non-Guild Members')
    } else {
      setCharsList(guildChars);
      setListName('Guild Members')
    }
  }

  let markActive = (char) => {
    setActive(char);
  }

  let addToRoster = (e) => {
    e.preventDefault();
    updateChars(active);
  }

  return (
    <div>
      <NewChar show={showNewChar} toggleModal={toggleModal}></NewChar>
      <div style={{display: 'flex', flexDirection: 'column'}}>

      <h4>{listName}</h4>
      <div style={{display: 'flex', justifyContent: 'space-around' }}>
        <Button variant='info' onClick={toggleList}>Swap List</Button>
        <Button variant='info' onClick={toggleModal}>Add New Char</Button>
      </div>
      <CharsList charsList={listName === 'Guild Members' ? guildChars : nonGuildChars} active={active} markActive={markActive}></CharsList>
      <Button variant='success' onClick={addToRoster}>Add to Raid Roster</Button>
      </div>
    </div>
  )

}

export default PickCharacter