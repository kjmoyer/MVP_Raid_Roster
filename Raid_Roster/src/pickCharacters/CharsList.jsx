import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

function CharsList({ charsList, current, list, markActive, active, toggleOS }) {

  let [chars, setChars] = useState([]);
  let [activeChar, setActiveChar] = useState({});

  useEffect(() => {
    setChars(charsList);
  }, [charsList]);

  useEffect(() => {
    if (active) {
      setActiveChar(active)
    }
  }, [active]);

  let select = (e) => {
    e.preventDefault();
    if (e.target.attributes[0].nodeValue === '-1') {
      return;
    }
    markActive(chars[Number.parseInt(e.target.attributes[0].nodeValue)]);
  }

  return (
    <div style={{
      overflowX: 'overflow',
      overflowY: 'scroll',
      height: '315px',
      margin: '5px'
    }}>
      <ListGroup >
        {chars.map((char, index) => {
          if (current[char.name]) {
            return
          }
          let isActive = (activeChar.name === char.name ? 'active' : null);
          return<ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
            className='character_row'
            key={char.name} identifier={index} onClick={select} active={isActive}>
            <div indentifier={index} className='specBox' style={{ width: '20%' }} >
              {char.name}
            </div>
            <div identifier={index} className='specBox' style={{ width: '30%' }} identifier={index}>
              <img identifier={index} style={{
                height: '35px',
                width: '35px',
                marginRight: '8px'
              }}
                src={char.specicon}></img>
              {char.specname}
            </div>
            <div identifier={index} className='specBox' style={{ width: '20%' }} >
              {char.class}
            </div>
            <div indentifier={index} className='specBox OSimg'  style={{ width: '30%' }} onClick={e => {toggleOS(e, index, list, char)}}>
              <img identifier={-1} style={{
                height: '35px',
                width: '35px',
                marginRight: '8px'
              }} src={char.secondarySpecIcon}></img>
              {char.secondarySpecName}
            </div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CharsList