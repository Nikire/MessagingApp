import React from "react";
import MessageList from "../components/MessageList";
import MessageSender from "../components/MessageSender";
import LogoutButton from "../components/LogoutButton";


export default function ChatWindow({user}) {
  return (
    <div className="d-flex flex-column chatWindow position-relative">
      <LogoutButton/>
      <MessageList user={user}/>
      <div className="d-flex flex-column gap-2 w-100">
        <hr />
        <MessageSender user={user}/>
      </div>
    </div>
  );
}
