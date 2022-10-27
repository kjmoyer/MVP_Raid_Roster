import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import server from '../serverRequests.js';
import NewChar from './NewChar.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';
import CharsList from './CharsList.jsx';

function PickCharacter({ updateChars, current }) {
  let [guildChars, setGuildChars] = useState([]);
  let [nonGuildChars, setNonGuildChars] = useState([]);
  let [currentChars, setCurrentChars] = useState({});
  let [charsList, setCharsList] = useState(guildChars);
  let [showNewChar, setShowNewChar] = useState(false);
  let [listName, setListName] = useState('Guild Members');
  let [active, setActive] = useState({});
  let [editChar, setEditChar] = useState(undefined);
  let [showConfirmDelete, setShowConfirmDelete] = useState(false);


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
  }, [current])


  let toggleNewChar = (e) => {
    if (e) {
      e.preventDefault();
    }
    let newBool = !showNewChar;
    setShowNewChar(newBool);
  }

  let toggleEditChar = (e) => {
    if (e) {
      e.preventDefault();
    }
    let newBool = !showNewChar;
    setEditChar(editChar ? undefined : active);
    setActive({});
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

  let confirmDelete = (e) => {
    if (e) {
      e.preventDefault();
    }
    let newBool = !showConfirmDelete;
    setShowConfirmDelete(newBool);
  }

  let deleteChar = (e) => {
    e.preventDefault();
    let thisChar = { ...active };
    server.delete('/char', thisChar.name)
      .then(() => {
        confirmDelete();
      })
      .then(() => {
        removeFromCurrent(thisChar)
      })
  }

  let removeFromCurrent = (thisChar) => {
    let updateChars = thisChar.guildmember ? guildChars : nonGuildChars;
    const index = updateChars.indexOf(thisChar);
    updateChars.splice(index, 1);
    if (thisChar.guildmember) {
      setGuildChars(updateChars);
    } else {
      setNonGuildChars(updateChars);
    }
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
      <NewChar
        show={showNewChar}
        toggleNewChar={editChar ? toggleEditChar : toggleNewChar}
        addNewCharToList={addNewCharToList}
        removeFromCurrent={removeFromCurrent}
        editChar={editChar}
        listName={listName}>
      </NewChar>
      <ConfirmDelete
        show={showConfirmDelete}
        toggle={confirmDelete}
        active={active}
        deleteChar={deleteChar}>
      </ConfirmDelete>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={'header'}>{listName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={toggleList}>Swap List</button>
          <button onClick={toggleNewChar}>Add New Char</button>
        </div>
        <div className={'header_row'}>
          <div style={{ width: '10px' }}>Icon</div>
          <div style={{ width: '100px' }}>Name</div>
          <div tyle={{ width: '90px' }}>Spec</div>
          <div tyle={{ width: '90px' }}>Class</div>
          <div style={{ width: '50px', marginRight: '10px' }}>Toggle Offspec</div>
        </div>
        <CharsList charsList={listName === 'Guild Members' ? guildChars : nonGuildChars} current={currentChars} active={active} list={listName} markActive={markActive} toggleOS={toggleOS}></CharsList>
        <div className='modifyChar'>
          <button className='edit' onClick={toggleEditChar}>Edit Char</button>
          <button className='delete' onClick={confirmDelete}>Delete Char</button>
        </div>
        <button onClick={addToRoster}>Add to Raid Roster</button>
      </div>
    </div>
  )

}

export default PickCharacter