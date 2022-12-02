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
  // server.get('/guilds')
  //     .then(({ data }) => {
  //       var allGuilds = data;
  // let guildOptions =
  return (
    <Form.Select type='select' placeholder='Your Guild'>
      <option>Select Guild</option>
      {allGuilds.map((guild) =>
        (<option key={guild.guildname}>{guild.guildname}</option>)
      )}
    </Form.Select>
  )
  // })
  // .catch((err) => {
  //   console.log(err)
  //   return (<div>ERROR!</div>)
  // })
}
}

export default GuildInput;