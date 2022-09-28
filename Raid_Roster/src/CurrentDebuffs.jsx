import { useState, useEffect } from 'react'
import { ListGroup, OverlayTrigger } from 'react-bootstrap'
import server from './serverRequests.js';
import checkmark from './assets/checkmark.png';
import cross from './assets/cross.png';
import HoverDisplay from './HoverDisplay.jsx';
import BuffItem from './BuffItem.jsx'

function CurrentDebuffs({ currentDebuffs }) {

  let [debuffs, setDebuffs] = useState([]);
  let [activeDebuffs, setActiveDebuffs] = useState([])


  useEffect(() => {
    server.get('/debuffs')
      .then(({ data }) => {
        setDebuffs(data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (currentDebuffs.length > 0) {
      setActiveDebuffs(currentDebuffs);
    }
  })

  return (
    <div style={{ width: '50%' }}>
      <h4>Debuffs</h4>
      <ListGroup style={{
        overflowX: 'overflow',
        overflowY: 'scroll',
        height: '450px',
      }}>
        {debuffs.map((debuff) => {
          let icon = activeDebuffs.indexOf(debuff.buffid) !== -1 ? checkmark : cross;
          return (
              <ListGroup.Item as='li' key={debuff.buffid}>
                <BuffItem buffType='debuffs' buff={debuff} icon={icon}/>
              </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default CurrentDebuffs