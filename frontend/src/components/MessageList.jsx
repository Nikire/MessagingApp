import React, { useRef, useState } from "react";
import socket from '../socket';
import { useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { getAllMessages } from "../services/messages.service";

export default function MessageList({user}) {
  let [messagesLocal, setMessagesLocal] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    async function getMessages(){
      const response = await getAllMessages();
      if(response){
        setMessagesLocal([...response]);
      }
    }
    getMessages();
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesLocal]);

  socket.on('message-fe', (message) => {
    setMessagesLocal([...messagesLocal, message]);
  });

  return (
    <div className="chatWindow-container d-flex flex-column justify-content-between gap-3">
      <div className="d-flex flex-column align-items-start gap-3">
      {messagesLocal.map((message, i) =>
          i === messagesLocal.length - 1 ? (
            <div key={i} className={`d-flex w-100 flex-column ${message.user.username == user.username ? "align-items-end" : 'align-items-start'}`} ref={lastMessageRef} >
              <MessageBubble message={message} user={user}/>
            </div>
          ) : (
            <div key={i} className={`d-flex w-100 flex-column ${message.user.username == user.username ? "align-items-end" : 'align-items-start'}`}>
              <MessageBubble message={message} user={user}/>
            </div>
          )
        )}
      </div>
    </div>
  );
}
