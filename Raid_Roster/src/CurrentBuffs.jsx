import { useState, useEffect } from 'react'
import { ListGroup, OverlayTrigger } from 'react-bootstrap'
import server from './serverRequests.js';
import checkmark from './assets/checkmark.png';
import cross from './assets/cross.png';
import BuffItem from './BuffItem.jsx'


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
    <div style={{width: '50%'}}>
      <h1 className={'header'}>Buffs</h1>
      <ListGroup style={{
        overflowX: 'overflow',
        overflowY: 'scroll',
        height: '450px',
      }}>
        {buffs.map((buff, index) => {
          let icon = activeBuffs.indexOf(buff.buffid) !== -1 ? checkmark : cross;
          return (
              <ListGroup.Item as='li' key={buff.buffid}>
                <BuffItem buffType='buffs' buff={buff} icon={icon}/>
              </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default CurrentBuffs