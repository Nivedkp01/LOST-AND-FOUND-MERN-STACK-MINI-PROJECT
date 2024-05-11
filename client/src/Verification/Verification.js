import React, { useContext, useEffect, useState } from 'react';
import './Verification.css';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { CiPhone } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { UserContext } from '../Context/Context';

function Verification() {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/lostandfound');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleConnect = async (id, name) => {
  //   try {
  //     // Combine senderId and RecvId in alphabetical order
  //     const uniqueid = [userInfo.id, id].sort().join('');

  //     const response = await fetch("http://localhost:4000/conversation", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         senderId: userInfo.id,
  //         RecvId: id,
  //         senderName: userInfo.username,
  //         RecvName: name,
  //         uniqueid: uniqueid // Add uniqueid to the body
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to connect');
  //     }

  //     // Handle successful connection
  //     navigate(`/message/${userInfo.id}`);
  //   } catch (error) {
  //     console.error('Error connecting:', error);
  //   }
  // };


  const handleConnect = async (id) => {
    console.log(id)
    navigate(`/connect/${id}`)
  }

  return (
    <div className='outerboxx'>
      <div className='verify'>
        <div className='leftside'>
          <h3>Lost</h3>
          <div className='cards'>
            <div className='row2'>
              {info.map((obj, index) => (
                <div key={index} className={obj.type === "lost" ? 'card1' : 'deactive'}>
                  <img src={'http://localhost:4000/' + obj.fileurl} className='img20' alt='item' />
                  <div className='hea'>
                    {/* <h3>{obj.item}</h3>
                    <div className='hea'>
                      <CiUser />
                      <p>{obj.username}</p>

                    </div> */}
                  </div>

                  <button className='btn27' onClick={() => handleConnect(obj._id)}>Connect</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='rightside'>
          <h3>Found</h3>
          <div className='cards'>
            <div className='row2'>
              {info.map((obj, index) => (
                <div key={index} className={obj.type === "found" ? 'card1' : 'deactive'}>
                  <img src={'http://localhost:4000/' + obj.fileurl} className='img20' alt='item' />
                  {/* <div className='hea27'>
                    <h3>{obj.item}</h3>

                    <div className='hea'>
                      <CiUser />
                      <p>{obj.username}</p>
                    </div>
                  </div> */}

                  <button className='btn27' onClick={() => handleConnect(obj._id, obj.username)}>Connect</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      </div>
    </div>
  );
}

export default Verification;
