
import { useState } from 'react';
import Chat from './Chat'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("https://capable-time-eye.glitch.me");




function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username!=="" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(pre =>!pre);
      // setRoom("");
      // setUsername("");
    }
  }
  return (
    <div className='App'>
      {!showChat ?
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Your Name.." />
      <input type="text" onChange={(e)=>setRoom(e.target.value)} placeholder="Room ID." />
      <button onClick={joinRoom}>Join A Room</button>
    </div>: <Chat socket={socket} username={username} room={room}/> }
    </div>
  );
}

export default App;
