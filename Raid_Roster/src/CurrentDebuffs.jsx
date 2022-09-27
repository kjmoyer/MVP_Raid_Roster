import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import server from './serverRequests.js';
import checkmark from './assets/checkmark.png';
import cross from './assets/cross.png';

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
    <div>
      <h4>Debuffs</h4>
      <ListGroup variant='flush' style={{
        overflowX: 'overflow',
        overflowY: 'scroll',
        maxHeight: '40%',
        borderBottom: '2px solid blue',
        borderTop: '2px solid blue',
        borderRight: '2px solid blue',
      }}>
        {debuffs.map((debuff) => {
          let icon = activeDebuffs.indexOf(debuff.buffid) !== -1 ? checkmark : cross;
          return <ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '11px'
          }}
            key={debuff.buffid}>
            <img style={{ height: '15px', width: '15px' }} src={icon} />
            <div>{debuff.effect}</div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CurrentDebuffs