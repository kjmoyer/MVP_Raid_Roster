import { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function RaidItem({ chars, stat }) {

  return (
    <div>
      <OverlayTrigger
        trigger={['focus', 'hover']}
        palcement='bottom'
        overlay={
          <Tooltip id='statTT'>
            <div><strong>Raiders</strong></div>
            {chars.map((char) => {
              return <div key={char}>{char}</div>
            })}
          </Tooltip>
        }
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '15px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          <div style={{color: 'rgba(252, 186, 3)', fontSize: '18px', marginRight: '5px'}}>
            {chars.length}
          </div>
          <div> {stat}</div>
        </div>
      </OverlayTrigger >
    </div>
  )
}

export default RaidItem