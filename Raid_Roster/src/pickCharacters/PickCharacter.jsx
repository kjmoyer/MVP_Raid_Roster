import { useState, useEffect } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import server from '../serverRequests.js';
import NewChar from './NewChar.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';
import CharsList from './CharsList.jsx';
import PickCharHeader from './PickCharHeader.jsx';

function PickCharacter({ updateChars, current, cookies, signIn }) {
  let [guildChars, setGuildChars] = useState([]);
  let [nonGuildChars, setNonGuildChars] = useState([]);
  let [currentChars, setCurrentChars] = useState({});
  let [charsList, setCharsList] = useState(guildChars);
  let [showNewChar, setShowNewChar] = useState(false);
  let [listName, setListName] = useState('Guild Members');
  let [active, setActive] = useState({});
  let [editChar, setEditChar] = useState(undefined);
  let [showConfirmDelete, setShowConfirmDelete] = useState(false);
  let [sorted, setSorted] = useState('');
  let [sortOrder, setSortOrder] = useState('forward');


  useEffect(() => {
    if (cookies.guildid === undefined || cookies.guildid === 'undefined') {
      setGuildChars([]);
    } else {

      server.get('/chars', { guildMember: true, guildid: cookies.guildid })
        .then(({ data }) => {
          setGuildChars(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [cookies])

  useEffect(() => {
    if (cookies.guildid === undefined || cookies.guildid === 'undefined') {
      setNonGuildChars([]);
    } else {

      server.get('/chars', { guildMember: false, guildid: cookies.guildid })
        .then((data) => {
          setNonGuildChars(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
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
    if (cookies.guildid === undefined) {
      signIn();
      return;
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
    server.delete('/char', { name: thisChar.name, guildid: cookies.guildid })
      .then(() => {
        confirmDelete(); //already confirmed, this toggles the modal
        removeFromCurrent(thisChar)
      })
  }

  let removeFromCurrent = (oldChar, newChar) => {
    if (listName === 'Guild Members') {
      var updatedChars = [...guildChars]
      var updateFunction = setGuildChars;
    } else {
      var updatedChars = [...nonGuildChars]
      var updateFunction = setNonGuildChars
    }
    const index = updatedChars.map((char) => {
      return char.name
    }).indexOf(oldChar.name);
    if (!newChar) {
      updatedChars.splice(index, 1);
      updateFunction(updatedChars);
    } else {
      let addToList = newChar.guildmember === true ? 'Guild Members' : 'Non-Guild Members';
      if (listName === addToList) {
        updatedChars.splice(index, 1, newChar);
        updateFunction(updatedChars)
      } else {
        updatedChars.splice(index, 1);
        updateFunction(updatedChars)
        addNewCharToList(newChar)
      }
      toggleNewChar();
    }
  }

  let addNewCharToList = (char) => {
    let updatedChars = char.guildmember ? [...guildChars] : [...nonGuildChars];
    let sortBy = sorted === '' ? 'name' : sorted;
    //if the list is sorted 'forward' i.e. a-z
    if (sortOrder === 'forward') {
      if (char[sortBy] < updatedChars[0][sortBy]) {
        updatedChars.unshift(char);
      } else if (char[sortBy] > updatedChars[updatedChars.length - 1][sortBy]) {
        updatedChars.push(char)
      } else {
        for (let i = 1; i < updatedChars.length; i++) {
          if (char[sortBy] >= updatedChars[i - 1][sortBy] && char[sortBy] <= updatedChars[i][sortBy]) {
            updatedChars.splice(i, 0, char);
            break;
          }
        }
      }
    } else /*if the sort order is backward i.e. z-a*/ {
      if (char[sortBy] > updatedChars[0][sortBy]) {
        updatedChars.unshift(char);
      } else if (char[sortBy] < updatedChars[updatedChars.length - 1][sortBy]) {
        updatedChars.push(char)
      } else {
        for (let i = 1; i < updatedChars.length; i++) {
          if (char[sortBy] <= updatedChars[i - 1][sortBy] && char[sortBy] >= updatedChars[i][sortBy]) {
            updatedChars.splice(i - 1, 0, char);
            break;
          }
        }
      }
    }
    if (char.guildmember) {
      setGuildChars(updatedChars);
    } else {
      setNonGuildChars(updatedChars);
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
      raidstats: char.secondaryRaidStats,
      secondarySpecName: char.specname,
      secondarySpecIcon: char.specicon,
      secondaryBuffs: char.buffs,
      secondaryDebuffs: char.debuffs,
      secondaryRaidStats: char.raidstats,
    }
    newChars[index] = newChar;
    list === 'Guild Members' ?
      setGuildChars(newChars) :
      setNonGuildChars(newChars);
    markActive(newChar);
  }

  let sortChars = (text) => {
    let chars = listName === 'Guild Members' ? [...guildChars] : [...nonGuildChars];
    if (sorted !== text) {
      chars.sort((a, b) => {
        let aString = a[text].toLowerCase();
        let bString = b[text].toLowerCase();
        if (aString < bString) {
          return -1
        } else {
          return 1;
        }
        return 0;
      });
      setSortOrder('forward')
    } else {
      chars.sort((a, b) => {
        let aString = a[text].toLowerCase();
        let bString = b[text].toLowerCase();
        if (aString > bString) {
          return -1
        } else {
          return 1;
        }
        return 0;
      });
      setSortOrder('backward')
    }
    let newSort = sorted === text ? '' : text;
    if (listName === 'Guild Members') {
      setGuildChars(chars)
    } else {
      setNonGuildChars(chars)
    }
    setSorted(newSort)
  }

  return (
    <div>
      <NewChar
        show={showNewChar}
        toggleNewChar={editChar ? toggleEditChar : toggleNewChar}
        addNewCharToList={addNewCharToList}
        removeFromCurrent={removeFromCurrent}
        editChar={editChar}
        listName={listName}
        cookies={cookies}
      >
      </NewChar>
      <ConfirmDelete
        show={showConfirmDelete}
        toggle={confirmDelete}
        active={active}
        deleteChar={deleteChar}>
      </ConfirmDelete>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 className={'header'}>{listName}</h1>
          <button className={'swapButton'} onClick={toggleList}>Swap List</button>
        </div>
        <div className='modifyChar'>
          <button className='addNew' onClick={toggleNewChar}>Add New Char</button>
          <button className='edit' onClick={toggleEditChar}>Edit Char</button>
          <button className='delete' onClick={confirmDelete}>Delete Char</button>
        </div>
        <div className={'header_row'}>
          {[{ text: 'Name', width: '20%', sortVal: 'name' }, { text: 'Spec', width: '30%', sortVal: 'specname' }, { text: 'Class', width: '20%', sortVal: 'class' }, { text: 'Toggle Offspec', width: '30%', sortVal: 'secondarySpecName' }].map((header) => {
            return (
              <PickCharHeader key={header.text} text={header.text} width={header.width} sortVal={header.sortVal} sortChars={sortChars}></PickCharHeader>
            )
          })}

        </div>
        <CharsList charsList={listName === 'Guild Members' ? guildChars : nonGuildChars} current={currentChars} active={active} list={listName} markActive={markActive} toggleOS={toggleOS}></CharsList>
        <button onClick={addToRoster}>Add to Raid Roster</button>
      </div>
    </div>
  )

}

export default PickCharacter