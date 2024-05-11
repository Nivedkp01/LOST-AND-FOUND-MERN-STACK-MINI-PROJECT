import React, { useState } from 'react';
import './Reg.css';
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPassword, MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Reg() {
  const [username, setUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Imei, setImei] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [Email, setEmail] = useState('')
  const[ph,setPh]=useState('')
  const navigate = useNavigate();

  async function handleReg(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        createPassword,
        confirmPassword,
        Imei,
        Email,
        ph
      })
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setSuccessMsg(data.message);
      navigate('/login');
    } else if (response.status === 400 || response.status === 422 || response.status === 406 || response.status === 500) {
      setErrorMsg(data.message);
    }
  }

  function handleMsg() {
    setErrorMsg('');
    setSuccessMsg('');
  }

  return (
    <div className='outerdiv'>
      <div className='Reg'>
        <div className='maindiv'>
          <div className='leftdiv'>
            <h1 style={{color:'#1a2a4e'}}>Register</h1>
            <div className='inp'>
              <MdEmail className='user' />
              <input type='text' placeholder='Email' className='inp11' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='inp'>
              <CiUser className='user' />
              <input type='text' placeholder='Username' className='inp11' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='inp'>
              <RiLockPasswordLine className='user' />
              <input type='password' placeholder='Create Password' className='inp11' value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
            </div>
            <div className='inp'>
              <RiLockPasswordLine className='user' />
              <input type='password' placeholder='Confirm Password' className='inp11' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className='inp'>
              <MdPassword className='user' />
              <input type='text' placeholder='IMEI Number' className='inp11' value={Imei} onChange={(e) => setImei(e.target.value)} />
            </div>
            <div className='inp'>
              <MdPassword className='user' />
              <input type='text' placeholder='Phone Number' className='inp11'value={ph}  onChange={(e) => setPh(e.target.value)} />
            </div>
            <button className='btns' onClick={handleReg}>Register Now</button>
          </div>
          <div className='rightdivv'>
            <img className='img1' src={require('../Log/Mobile login-pana.png')} alt='register' />
          </div>
        </div>
      </div>
      {errorMsg &&
        <div className='errordiv' >
          <p style={{ textAlign: 'center' }}> {errorMsg}</p>
          <RxCross2 className='cross' onClick={handleMsg} />
        </div>
      }
      {successMsg &&
        <div className='successdiv' >
          <p style={{ textAlign: 'center' }}> {successMsg}</p>
          <RxCross2 className='cross' onClick={handleMsg} />
        </div>
      }
    </div>
  );
}

export default Reg;
