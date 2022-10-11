import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
function CharsList({ charsList, current, list, markActive, active, toggleOS }) {

  let [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(charsList);
  }, [charsList]);

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
          let isActive = (active.name === char.name ? 'active' : null);
          return <ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-around',
            alignItems: 'center',
          }}
            key={char.name} identifier={index} onClick={select} active={isActive}>
            <div indentifier={index}style={{ width: '50px'}}>
              <img identifier={index} style={{
                height: '30px',
                width: '30px',
              }}
                src={char.specicon}></img>
            </div>
            <div style={{ width: '100px' }} identifier={index}>
              {char.name}
            </div>
            <div style={{ width: '90px' }} identifier={index}>
              {char.specname}
            </div>
            <div style={{ width: '90px' }} identifier={index}>
              {char.class}
            </div>
            <div indentifier={index}style={{width: '50px'}}>
              <img style={{
                height: '30px',
                width: '30px',
                cursor: 'pointer'
              }} identifier={-1} src={char.secondarySpecIcon}  onClick={e => {toggleOS(e, index, list, char)}}></img>
            </div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CharsList