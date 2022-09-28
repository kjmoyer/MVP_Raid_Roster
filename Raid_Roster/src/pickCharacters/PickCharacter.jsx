import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import server from '../serverRequests.js';
import NewChar from './NewChar.jsx';
import CharsList from './CharsList.jsx';
import styles from '../styled.js'

function PickCharacter({ updateChars, current }) {
  let [guildChars, setGuildChars] = useState([]);
  let [nonGuildChars, setNonGuildChars] = useState([]);
  let [currentChars, setCurrentChars] = useState({});
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

  useEffect(() => {
    if (current) {
      setCurrentChars(current);
    }
  },[current])


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

  let addNewCharToList = (char) => {
    let updateChars = char.guildmember ? guildChars : nonGuildChars;
    updateChars.push(char);
    if (char.guildmember) {
      setGuildChars(updateChars);
    } else {
      setNonGuildChars(updateChars);
    }
  }
  let toggleOS = (e, index, list, char) => {
    e.preventDefault();
    let charName = e.target.parentElement.parentElement.children[1].innerHTML;
    let newChars = list === 'Guild Members' ? [...guildChars] : [...nonGuildChars];
    let newChar = {
      name: char.name,
      secondaryspecid: char.specid,
      specid: char.secondaryspecid,
      class: char.class,
      specname: char.secondarySpecName,
      specicon: char.secondarySpecIcon,
      buffs: char.secondaryBuffs,
      debuffs: char.secondaryDebuffs,
      secondarySpecName: char.specname,
      secondarySpecIcon: char.specicon,
      secondaryBuffs: char.buffs,
      secondaryDebuffs: char.debuffs
    }
    newChars[index] = newChar;
    list === 'Guild Members' ?
      setGuildChars(newChars) :
      setNonGuildChars(newChars);
    markActive(newChar);
  }

  return (
    <div>
      <NewChar show={showNewChar} toggleModal={toggleModal} addNewCharToList={addNewCharToList}></NewChar>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <h4>{listName}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant='success' onClick={toggleList}>Swap List</Button>
          <Button variant='success' onClick={toggleModal}>Add New Char</Button>
        </div>
        <div style={{
          backgroundColor: 'green',
          color: 'white',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '5px'
        }}>
          <div style={{ width: '10px' }}>Icon</div>
          <div style={{ width: '100px' }}>Name</div>
          <div tyle={{ width: '90px' }}>Spec</div>
          <div tyle={{ width: '90px' }}>Class</div>
          <div style={{ width: '50px', marginRight: '10px' }}>Toggle Offspec</div>
        </div>
        <CharsList charsList={listName === 'Guild Members' ? guildChars : nonGuildChars} current={currentChars} active={active} list={listName} markActive={markActive} toggleOS={toggleOS}></CharsList>
        <Button variant='success' onClick={addToRoster}>Add to Raid Roster</Button>
      </div>
    </div>
  )

}

export default PickCharacter