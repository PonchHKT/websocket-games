import React, { useState, useEffect } from "react";
import { io } from "socket.io-client"
import './nicknameinput.css'

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("ws://127.0.0.1:4001");
    setSocket(socket);
  }, []);

  const Leave = () => {
    socket.disconnect()
    hideWaiting()
  }

  const showWaiting = (players=1) => {
    const waiting = document.getElementById('waiting'),
          queue   = document.getElementById('queue')

    waiting.innerText = `Waiting for Player ${players}/2 ...`
    queue.innerHTML = "Leave Queue"
    queue.style.display='inline';
  }

  const hideWaiting = () => {
    const waiting = document.getElementById('waiting'),
    queue   = document.getElementById('queue')

    waiting.innerText = ''
    queue.style.display = 'none'
  }

  const onClick = () => {
    socket.emit("SEND_NICKNAME", document.getElementById('nickname').value);

    showWaiting()

    socket.on('GAME_START', () => {
      showWaiting(2)
      document.getElementById('queue').style.display = 'none'
    })

  };

  return (
    <div class="card">
    <h2><svg class="icon" aria-hidden="true">
      <use href="#icon-coffee" /></svg>Game Rules : Find a number as quickly as possible</h2>
    <label class="input">
      <input class="input__field" type="text" placeholder=" " id="nickname" />
      <span class="input__label">What is your username ?</span>
    </label>
    <div class="button-group">
      <button onClick={onClick}>PLAY</button>
      </div>
      <div id="waitingDiv">
        <div class="waiting">
        <p id="waiting"></p>
        </div>
        <div class="leavequeue">
        <button hidden id="queue" onClick={Leave} />
        </div>
      </div>
    </div>
  
  );
}

export default App;