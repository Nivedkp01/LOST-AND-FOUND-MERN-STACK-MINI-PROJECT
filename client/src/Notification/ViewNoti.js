import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ViewNoti.css'
import { MdEmail } from "react-icons/md";


function ViewNoti() {
    const [notification, setNotification] = useState(null); // Initialize as null
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/notification/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch notification data");
                }
                const data = await response.json();
                setNotification(data);
            } catch (error) {
                console.error("Error fetching notification data:", error);
            }
        };

        fetchData();
    }, [id]); // Include id in the dependency array

    if (notification === null) {
        return <div>Loading...</div>; // Render loading state while data is being fetched
    }


    console.log(notification.category)

    return (
        <div >
            <div className='n' key={notification._id}>
                <div className='n1'>
                    <img className='q1' style={{ height: '250px', width: '250px' }} src={'http://localhost:4000/' + notification.fileurl} className='img20' alt='item' />
                </div>
                <div className='n2'>
                    <div className='hea14' >
                        <p style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}></span></p>
                        <div className='hea'>
                            <MdEmail />
                            <a href={`mailto:${notification.whosends}@gmail.com`}>{notification.whosends}@gmail.com</a>

                        </div>
                    </div>
                    <div>
                        <p style={{ fontWeight: "bold" }}>{notification.whosends}</p>
                        <p style={{ fontWeight: 'bold' }}><span >Reward: </span>{notification.rewardAmount} $</p>
                    </div>
                    <i> <p style={{ fontSize: '15px' }}>{notification.message}</p></i>

                    <div className='e'>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ViewNoti;
