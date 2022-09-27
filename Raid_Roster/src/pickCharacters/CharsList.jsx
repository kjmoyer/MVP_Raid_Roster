import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
function CharsList({ charsList, list, markActive, active}) {

  let [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(charsList);
  }, [charsList]);

  let select = (e) => {
    e.preventDefault();
    console.log(typeof e.target.id);
    markActive(chars[Number.parseInt(e.target.id)]);
  }

  return (
    <div>
      <h3>{list}</h3>
      <ListGroup>
        {chars.map((char, index) => {
          let isActive = (active.name === char.name ? 'active' : null);
          return <ListGroup.Item as='div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} key={char.name} id={index} onClick={select} active={isActive}>
            <img style={{ height: '20px', width: '20px' }} src={char.specicon}></img>
            <div>
              {char.name}
            </div>
            <div>
              {char.specname}
            </div>
            <div>
              {char.class}
            </div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CharsList