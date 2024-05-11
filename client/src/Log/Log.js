import React, { useContext, useState } from 'react';
import './log.css';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { UserContext } from '../Context/Context';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

function Log() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate=useNavigate()

  async function handleLog(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include'
    });
    const data = await response.json();
    if (response.ok) {
      setUserInfo(data);
      navigate('/')
      
    } else {
      setError(data.message);
    }
  }

  function handleMsg() {
    setError('');
  }
  console.log(userInfo)
  return (
    <div className='outerdiv'>
      <div className='login'>
        <div className='maindiv'>
          <div className='leftdiv'>
            <h1>login</h1>
            <div className='inp'>
              <CiUser className='user' />
              <input type='text' placeholder='Username' className='inp11' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='inp'>
              <RiLockPasswordLine className='user' />
              <input type='password' placeholder='Password' className='inp11' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className='btns' onClick={handleLog}>Login Now</button>
          </div>
          <div className='rightdiv'></div>
        </div>
      </div>
      {error && (
        <div className='errordiv'>
          <p>{error}</p>
          <RxCross2 className='cross' onClick={handleMsg} />
        </div>
      )}
    </div>
  );
}

export default Log;
