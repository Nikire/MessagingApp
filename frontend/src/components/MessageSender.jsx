import React, { useState } from 'react';
import socket from '../socket';
import { sendMessage } from '../services/messages.service';

export default function MessageSender({user}) {
  const [message, setMessage] = useState('');
  function changeHandler(e) {
    setMessage(e.target.value);
  }
  function sendHandler(e) {
    e.preventDefault();
    if(!message.trim()) return;
    socket.emit('message', {
      message,
      user
    });
    sendMessage(message);
    setMessage('');
  }
  return (
    <form className="d-flex gap-2">
      <input
        onChange={changeHandler}
        type="text"
        className="form-control shadow-none w-70"
        value={message}
        placeholder="Type your message here..."
        aria-label="Chat message"
        aria-describedby="send-button"
      />
      <div className="input-group-append">
        <button
          onClick={sendHandler}
          className="btn btn-primary circle mr-1"
          type="submit"
          id="send-button"
        >
          <i className="bi bi-send h5 m-0"></i>
        </button>
      </div>
    </form>
  );
}
