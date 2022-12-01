import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import { Button, ListGroup, Row, Col, Container } from 'react-bootstrap';
import PickCharacter from './pickCharacters/PickCharacter.jsx';
import CurrentBuffs from './RaidInfo/CurrentBuffs.jsx';
import CurrentDebuffs from './RaidInfo/CurrentDebuffs.jsx';
import RaidGroup from './RaidGroup.jsx';
import SignIn from './SignIn.jsx';
import RaidStats from './RaidInfo/RaidStats.jsx';

function App() {
  const [currentChars, setCurrentChars] = useState({});
  const [currentBuffs, setCurrentBuffs] = useState([]);
  const [currentDebuffs, setCurrentDebuffs] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(['guildid']);
  const [raidStats, setRaidStats] = useState({
    tanks: [],
    healers: [],
    ranged: [],
    melee: [],
    interrupts: [],
    battle_rezs: [],
    crowd_control: [],
  })


  useEffect(() => {
    let newBuffs = [...currentBuffs];
    let newDebuffs = [...currentDebuffs];
    let newRaidStats = {...raidStats}
    for (let char in currentChars) {
      currentChars[char].buffs.forEach((buff) => {
        if (currentBuffs.indexOf(buff) === -1) {
          newBuffs.push(buff)
        }
      })
      currentChars[char].debuffs.forEach((debuff) => {
        if (currentDebuffs.indexOf(debuff) === -1) {
          newDebuffs.push(debuff)
        }
      })
      currentChars[char].raidstats.forEach((stat) => {
        switch (stat) {
          case 1 :
            if (newRaidStats.tanks.indexOf(char) === -1) {
              newRaidStats.tanks.push(char)
            };
            break;
          case 2 :
            if (newRaidStats.healers.indexOf(char) === -1) {
              newRaidStats.healers.push(char)
            };
            break;
          case 3 :
            if (newRaidStats.ranged.indexOf(char) === -1) {
              newRaidStats.ranged.push(char)
            };
            break;
          case 4 :
            if (newRaidStats.melee.indexOf(char) === -1) {
              newRaidStats.melee.push(char)
            };
            break;
          case 5 :
            if (newRaidStats.interrupts.indexOf(char) === -1) {
              newRaidStats.interrupts.push(char)
            };
            break;
          case 6 :
            if (newRaidStats.battle_rezs.indexOf(char) === -1) {
              newRaidStats.battle_rezs.push(char)
            };
            break;
          case 7 :
            if (newRaidStats.crowd_control.indexOf(char) === -1) {
              newRaidStats.crowd_control.push(char)
            };
            break;
        }
      })
      setCurrentBuffs(newBuffs);
      setCurrentDebuffs(newDebuffs);
      setRaidStats(newRaidStats);
    }
  }, [currentChars])

  let updateChars = (char) => {
    if (Object.keys(currentChars).length === 25) {
      console.log('Raid full!') //TODO: make this a modal pop up in the future
      return;
    }
    let newChars = { ...currentChars }
    newChars[char.name] = char;
    setCurrentChars(newChars);
  }

  let removeChar = (e) => {
    let char = e.target.parentElement.children[1].innerHTML;
    let newChars = { ...currentChars }
    delete newChars[char]
    setCurrentBuffs([]);
    setCurrentDebuffs([]);
    setRaidStats({
      tanks: [],
      healers: [],
      ranged: [],
      melee: [],
      interrupts: [],
      battle_rezs: [],
      crowd_control: [],
    });
    setCurrentChars(newChars);
  }

  const toggleSignIn = (e) => {
    if (e) {
      e.preventDefault();
    }
    setShowSignIn(!showSignIn);
  }

  const signout = (e) => {
    e.preventDefault();
    removeCookie('guildid');
    setCurrentChars({});
    setCurrentBuffs([]);
    setCurrentDebuffs([]);
    setRaidStats({
      tanks: [],
      healers: [],
      ranged: [],
      melee: [],
      interrupts: [],
      battle_rezs: [],
      crowd_control: [],
    });
  }


  return (
    <div className="App">
      <SignIn show={showSignIn}
        toggle={toggleSignIn}
        setCookies={setCookies}
        cookie={cookies} />
      <Container fluid='true'>
        <Row className='nav'>
          <Col fluid='true' xs={10}>
          <h3 className='nav_header'>WRATH OF THE LICH KING RAID PLANNER</h3>
          <h4 className='nav_header'>Register your guild or sign in to start planning!</h4>
          </Col>
          <Col fluid='true'>
            <h5 className='sign_in' onClick={cookies.guildid === undefined || cookies.guildid === 'undefined' ? toggleSignIn : signout}>
              {cookies.guildid === undefined || cookies.guildid === 'undefined' ? 'Sign In' : 'Sign Out'}
            </h5>
          </Col>
        </Row>
      </Container>
      <Container fluid='true' className='top_row'>
        <Row >
          <Col lg={5}>
            <PickCharacter updateChars={updateChars}
              current={currentChars}
              cookies={cookies}
              signIn={toggleSignIn} />
          </Col>
          <Col>
            <div style={{
              display: 'flex',
              flexDirection: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <CurrentBuffs currentBuffs={currentBuffs} />
              <CurrentDebuffs currentDebuffs={currentDebuffs} />
              <RaidStats raidStats={raidStats}/>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid='true' style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <RaidGroup groupChars={Object.values(currentChars).slice(0, 5)} removeChar={removeChar} />
          </Col>
          <Col>
            <RaidGroup groupChars={Object.values(currentChars).slice(5, 10)} removeChar={removeChar} />
          </Col>
          <Col>
            <RaidGroup groupChars={Object.values(currentChars).slice(10, 15)} removeChar={removeChar} />
          </Col>
          <Col>
            <RaidGroup groupChars={Object.values(currentChars).slice(15, 20)} removeChar={removeChar} />
          </Col>
          <Col>
            <RaidGroup groupChars={Object.values(currentChars).slice(20, 25)} removeChar={removeChar} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App


