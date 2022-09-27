import { useState, useEffect } from 'react'
import './App.css';
import server from './serverRequests.js';
import { Button, ListGroup } from 'react-bootstrap';
import PickCharacter from './pickCharacters/pickCharacter.jsx';

function App() {

  let [currentChars, setCurrentChars] = useState({})
  let [currentBuffs, setCurrentBuffs] = useState([]);


  let updateChars = (char) => {
    let newChars = currentChars;
    newChars[char.name] = char;
    setCurrentChars(newChars);
    // setCurrentChars([...currentChars, char]) //write when you know how data will be passed
  }


  return (
    <div className="App">
      <div className='row'>
        <PickCharacter updateChars={updateChars}>
        </PickCharacter>
      </div>

    </div>
  )
  // return (
  //   <div className="App">
  //     <div className='row'>
  //       <div className='col'>
  //         <ListGroup as='ul'>
  //           {currentChars.map((char) => {
  //             let isActive = (active === char.name ? 'active' : null);
  //             return <ListGroup.Item as='li' key={char.name} id={char.name} action onClick={markActive} active={isActive}>{char.name + ' ' + char.spec + ' ' + char.class} </ListGroup.Item>
  //           })}
  //         </ListGroup>
  //       </div>
  //       <div className='col'>
  //       </div>
  //       <div className='col'>
  //       </div>
  //     </div>
  //     <div className='row'>
  //       <div className='col'>
  //         <h5>Group 1</h5>
  //         <ListGroup>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //         </ListGroup>
  //       </div>
  //       <div className='col'>
  //         <h5>Group 2</h5>
  //         <ListGroup>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //         </ListGroup>
  //       </div>
  //       <div className='col'>
  //         <h5>Group 3</h5>
  //         <ListGroup>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //         </ListGroup>
  //       </div>
  //       <div className='col'>
  //         <h5>Group 4</h5>
  //         <ListGroup>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //         </ListGroup>
  //       </div>
  //       <div className='col'>
  //         <h5>Group 5</h5>
  //         <ListGroup>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //           <div>{`<empty>`}</div>
  //         </ListGroup>
  //       </div>
  //     </div>
  //     {/* <div className="row">
  //       <Button className="col" variant="primary">Primary</Button>{' '}
  //       <Button className="col" variant="secondary">Secondary</Button>{' '}
  //       <Button className="col" variant="success">Success</Button>{' '}
  //       <Button className="col" variant="warning">Warning</Button>{' '}
  //       <Button className="col" variant="danger">Danger</Button>{' '}
  //       <Button className="col" variant="info">Info</Button>{' '}
  //       <Button className="col" variant="light">Light</Button>{' '}
  //       <Button className="col" variant="dark">Dark</Button> <Button variant="link">Link</Button>
  //     </div> */}
  //   </div>
  // )
}

export default App
