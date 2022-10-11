import { useState, useEffect } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import server from './serverRequests.js';

function BuffItem({ icon, buff, buffType }) {

  let [classes, setClasses] = useState([])
  let [thisBuff, setThisBuff] = useState({})

  useEffect(() => {
    server.get('/specs/buffs', { buffType: buffType, id: buff.buffid })
      .then(({ data }) => {
        setClasses(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (buff) {
      setThisBuff(buff)
    }
  })

  return (
    <div>
      <OverlayTrigger
        trigger={['focus', 'hover']}
        placement='bottom'
        overlay={
          <Tooltip id='buffsTT'>
            <div><strong>Classes with this {buffType.substring(0, buffType.length - 1)}</strong>:</div>
            {classes.map((spec) => {
              return <div key={spec.specname}>
                {spec.specname} {spec.classname}
              </div>
            })}
          </Tooltip>
        }
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <img style={{ height: '20px', width: '20px' }} src={icon} />
          <div>{buff.effect}</div>
        </div>
      </OverlayTrigger>
    </div>
  )
}

export default BuffItem