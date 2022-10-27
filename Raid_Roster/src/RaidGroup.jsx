import { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import cross from './assets/cross.png';



function RaidGroup({ groupChars, removeChar }) {

  let [raiders, setRaiders] = useState([])

  useEffect(() => {
    if (groupChars) {
      while (groupChars.length < 5) {
        groupChars.push({ name: '<Empty>', specicon: 'https://www.meme-arsenal.com/memes/eb8d071f08bbdd9ea971dfd89f47ccf7.jpg' })
      }
    }
    setRaiders(groupChars);
  }, [groupChars])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <ListGroup className='raidGroup'>
        {raiders.map((raider, index) => {
          let img = raider.name === '<Empty>' ? <img></img> : <img style={{ height: '15px', width: '15px', cursor: 'pointer' }} src={cross} onClick={removeChar}></img>
          return <ListGroup.Item as='div' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }} key={index}
          >
            <img identifier={index} style={{
              height: '20px',
              width: '20px',
              marginRight: '5px'
              }}
              src={raider.specicon}></img>
            <div style={{width: '100px'}}>
              {raider.name}
            </div>
            {img}
          </ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default RaidGroup