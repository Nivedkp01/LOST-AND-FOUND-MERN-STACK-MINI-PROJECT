import React, { useEffect, useState } from 'react';
import './Connect.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CiPhone } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
function Connect() {
  const { id } = useParams();
  const [connect, setConnect] = useState({});
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [rewardAmount, setRewardAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`http://localhost:4000/connect/${id}`)
      .then((respo) => respo.json())
      .then((data) => {
        setConnect(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if message or reward amount is missing
    if (!message || !rewardAmount) {
      console.error('Message or reward amount is missing');
      return;
    }

    const data = new FormData();
    data.append('message', message);
    data.append('file', selectedFile);
    data.append('rewardAmount', rewardAmount);
    data.append('person', connect.username);
    data.append('Email', connect.Email)

    console.log(connect)

    try {
      const res = await fetch('http://localhost:4000/connectdata', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (res.ok) {
        navigate('/verify');
      } else {
        console.error('Failed to submit data:', res.statusText);
      }
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  }




  console.log(connect.username);

  return (
    <div className='connect'>
      <div className='mainc'>
        <div>
          <img src={'http://localhost:4000/' + connect.fileurl} className='detailedimg' alt='item' />
        </div>
        <div className='details'>
          <h1>{connect.item}</h1>
          <div className='hea' style={{ marginTop: '-15px' }}>
            <CiUser size={24} />
            <i><p>{connect.username}</p></i>
          </div>
          <div className='hea' style={{ marginTop: '-15px' }}>
            <IoLocationSharp size={24} />
            <i><p>{connect.location}</p></i>
          </div>
          <div className='hea' style={{ gap: '90px', marginTop: '-15px' }}>
            <i><p>{connect.model}</p></i>
            <i><p>{connect.colour}</p></i>
          </div>
          <div className='hea' style={{ marginTop: '-15px' }}>
            <FaHome size={24} />
            <i><p>{connect.address}</p></i>
          </div>
          <div className='hea' style={{ marginTop: '-15px' }}>
            <CiPhone size={24} />
            <i><p>{connect.phoneNumber}</p></i>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px', marginBottom: '15px' }}>
            <CiCalendarDate size={24} />
            <i><p>{new Date(connect.createdAt).toLocaleDateString()}</p></i>
          </div>



          <div className='hea' style={{ marginTop: '-15px' }}>
            <MdEmail size={24} />
            <i><a href={`mailto:${connect.Email}`}>{connect.Email}</a></i>
          </div>
        </div>
      </div>
      {connect.type === 'found' && (
        <div className='chat'>

          <button className='btn12' style={{marginTop:'20px',width:'100%'}} onClick={() => { navigate(`/question/${connect.category}/${connect.username}/${connect.Email}`); }}>Claim Your Lost Item</button>
        </div>
      )}
    </div>
  );
}

export default Connect;
