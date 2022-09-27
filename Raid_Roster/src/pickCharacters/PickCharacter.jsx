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
    server.getGuildies('/chars', { guildMember: true })
      .then(({data}) => {
        setGuildChars(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    server.getGuildies('/chars', { guildMember: false })
      .then((data) => {
        setNonGuildChars(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  useEffect(() => {
    if (listName === 'guild') {
      setShowNewChar(guildChars);
    } else {
      setShowNewChar(nonGuildChars)
    }
  }, [guildChars, nonGuildChars])

  let addChar = (e) => {
    e.preventDefault();
    setShowNewChar(true);
  }

  let toggleList = (e) => {
    e.preventDefault();
    if (JSON.stringify(charsList) === JSON.stringify(guildChars)) {
      setCharsList(nonGuildChars);
      setListName('Non Guild Members')
    } else {
      setCharsList(guildChars);
      setListName('Guild Members')
    }
  }

  let markActive = (char) => {
    console.log(char);
    setActive(char);
  }

  let addToRoster = (e) => {
    e.preventDefault();
    updateChars(active);
  }

  return (
    <div>
      <NewChar show={showNewChar}></NewChar> {/* not yet working */}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant='info' onClick={toggleList}>Swap List</Button>
        <Button variant='info' onClick={addChar}>Add New Char</Button>
      </div>
      <CharsList charsList={listName === 'Guild Members' ? guildChars : nonGuildChars} list={listName} active={active} markActive={markActive}></CharsList>
      <Button variant='success' onClick={addToRoster}>Add to Raid Roster</Button>
    </div>
  )

}

export default PickCharacter