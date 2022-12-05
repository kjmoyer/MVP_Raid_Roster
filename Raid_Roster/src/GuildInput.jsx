import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import server from './serverRequests.js';

function GuildInput({ entryType }) {
  const [allGuilds, setAllGuilds] = useState([])

  useEffect(() => {
    const getGuilds = () => {
      server.get('/guilds')
        .then(({ data }) => {
          setAllGuilds(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getGuilds();
  }, [])

  if (entryType === 'register') {
    return (
      (
        <Form.Control type='input' placeholder='Your Guild' />
      )
    )
  } else {
    return (
      <Form.Select type='select' placeholder='Your Guild'>
        <option>Select Guild</option>
        {allGuilds.map((guild) =>
          (<option key={guild.guildname}>{guild.guildname}</option>)
        )}
      </Form.Select>
    )
  }
}

export default GuildInput;