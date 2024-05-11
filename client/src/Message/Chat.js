import React from 'react';
import './Chat.css';
import { format } from "timeago.js";

function Chat({ msg, owner }) {
  // Define a variable to hold the class name based on the owner
  const className = owner ? 'chat owner' : 'chat';

  return (
    <div className={className}>
      <p className="text">{msg.text}</p> {/* Access the message text from the 'msg' prop */}
      <p className="time">{format(msg.createdAt)}</p> {/* Format the creation date using 'timeago.js' */}
    </div>
  );
}

export default Chat;
