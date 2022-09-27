import { useState, useEffect } from 'react'
import './App.css';
import { Button, ListGroup, Row, Col, Container } from 'react-bootstrap';
import PickCharacter from './pickCharacters/pickCharacter.jsx';
import CurrentBuffs from './CurrentBuffs.jsx';
import CurrentDebuffs from './CurrentDebuffs.jsx';
import RaidGroup from './RaidGroup.jsx'

function App() {
  let [currentChars, setCurrentChars] = useState({});
  let [currentBuffs, setCurrentBuffs] = useState([]);
  let [currentDebuffs, setCurrentDebuffs] = useState([]);


  useEffect(() => {
    let newBuffs = [...currentBuffs];
    let newDebuffs = [...currentDebuffs];
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
      setCurrentBuffs(newBuffs);
      setCurrentDebuffs(newDebuffs);
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


  return (
    <div className="App">
        <Row style={{maxHeight: '400px'}}>
          <Col>
            <PickCharacter updateChars={updateChars} />
          </Col>
          <Col>
            <div style={{
              display: 'flex',
              flexDirection: 'flex-start',
              }}>
              <CurrentBuffs currentBuffs={currentBuffs} />
              <CurrentDebuffs currentDebuffs={currentDebuffs} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(0,5)}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(5,10)}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(10,15)}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(15,20)}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(20,25)}/>
          </Col>
        </Row>
    </div>
  )
}

export default App
