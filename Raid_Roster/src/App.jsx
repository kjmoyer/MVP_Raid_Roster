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

  let removeChar = (e) => {
    let char = e.target.parentElement.children[1].innerHTML;
    let newChars = { ...currentChars }
    delete newChars[char]
    setCurrentChars(newChars);
  }


  return (
    <div className="App">
      <Container fluid>
        <Row style={{maxHeight: '550px'}}>
          <Col>
            <PickCharacter updateChars={updateChars} current={currentChars}/>
          </Col>
          <Col >
            <div style={{
              display: 'flex',
              flexDirection: 'flex-start',
              justifyContent: 'space-between'
              }}>
              <CurrentBuffs currentBuffs={currentBuffs} />
              <CurrentDebuffs currentDebuffs={currentDebuffs} />
            </div>
          </Col>
        </Row>
        </Container>
        <Row style={{marginTop: '20px'}}>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(0,5)} removeChar={removeChar}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(5,10)} removeChar={removeChar}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(10,15)} removeChar={removeChar}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(15,20)} removeChar={removeChar}/>
          </Col>
          <Col>
          <RaidGroup groupChars={Object.values(currentChars).slice(20,25)} removeChar={removeChar}/>
          </Col>
        </Row>
    </div>
  )
}

export default App
