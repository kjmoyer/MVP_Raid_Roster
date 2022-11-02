import { useState, useEffect } from 'react'
import { ListGroup, OverlayTrigger } from 'react-bootstrap';
import RaidItem from './RaidItem.jsx';

function RaidStats({raidStats}) {

  return (
    <div style={{ width: '33%'}}>
      <h1 className='header'>Raid Stats</h1>
      <ListGroup>
        <ListGroup.Item as='li'>
          <RaidItem chars={raidStats.tanks} stat='Tanks'/>
          <RaidItem chars={raidStats.healers} stat='Healers'/>
          <RaidItem chars={raidStats.ranged} stat='Ranged'/>
          <RaidItem chars={raidStats.melee} stat='Melee'/>
          <RaidItem chars={raidStats.interrupts} stat='Interrupts'/>
          <RaidItem chars={raidStats.battle_rezs} stat='Battle Rezs'/>
          <RaidItem chars={raidStats.crowd_control} stat='Crowd Control'/>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default RaidStats