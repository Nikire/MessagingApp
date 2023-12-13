import React from 'react';

export default function MessageBubble({ message: {user:{username},message}, user }) {
  return (
    <>
      <small className={`text-muted fw-light ${username == user.username ? 'text-end' : ''}`}>{`${username}`}</small>
      <div className={`message ${username == user.username ? "yourMessage" : ''}`}>
        <span className={`messageContent break-word`}>{message}</span>
      </div>
    </>
  );
}
