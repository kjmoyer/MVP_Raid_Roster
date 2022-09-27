import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import server from './serverRequests.js';
import checkmark from './assets/checkmark.png';
import cross from './assets/cross.png';


function CurrentBuffs({ currentBuffs }) {

  let [buffs, setBuffs] = useState([]);
  let [activeBuffs, setActiveBuffs] = useState([]);


  useEffect(() => {
    server.get('/buffs')
      .then(({ data }) => {

        setBuffs(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (currentBuffs.length > 0) {
      setActiveBuffs(currentBuffs);
    }
  })

  return (
    <div >
      <h4>Buffs</h4>
      <ListGroup variant='flush' style={{
        overflowX: 'overflow',
        overflowY: 'scroll',
        maxHeight: '40%',
        borderBottom: '2px solid blue',
        borderTop: '2px solid blue',
        borderLeft: '2px solid blue',
      }}>
        {buffs.map((buff, index) => {
          let icon = activeBuffs.indexOf(buff.buffid) !== -1 ? checkmark : cross;
          return <ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: '',
            fontSize: '11px'
          }}
          key={buff.buffid}>
            <img style={{ height: '15px', width: '15px' }} src={icon} />
            <div>{buff.effect}</div>
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default CurrentBuffs