import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
function CharsList({ charsList, list, markActive, active}) {

  let [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(charsList);
  }, [charsList]);

  let select = (e) => {
    e.preventDefault();
    markActive(chars[Number.parseInt(e.target.attributes[0].nodeValue)]);
  }

  return (
    <div>
      <ListGroup style={{
        overflowX: 'overflow',
        overflowY: 'scroll',
        height: '40%',
        margin: '5px'
      }}>
        {chars.map((char, index) => {
          let isActive = (active.name === char.name ? 'active' : null);
          return <ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
            }}
            key={char.name} identifier={index} onClick={select} active={isActive}>
            <img  identifier={index} style={{
              height: '20px',
              width: '20px',
              marginRight: '5px',
              }}
              src={char.specicon}></img>
            <div identifier={index}>
              {char.name}
            </div>
            <div identifier={index}>
              {char.specname}
            </div>
            <div identifier={index}>
              {char.class}
            </div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CharsList