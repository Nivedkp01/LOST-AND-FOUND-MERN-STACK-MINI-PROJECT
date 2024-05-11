import React, { useContext, useEffect, useState } from 'react';
import './Notification.css';
import { UserContext } from '../Context/Context';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

function Notification() {
    const [notification, setNotification] = useState([]);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [hiddenNotifications, setHiddenNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/notification");
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
    }, []);

    const handleRemove = (id) => {
        setHiddenNotifications([...hiddenNotifications, id]);
    };

    return (
        <div className='mainb'>
            {notification.map((obj) => (
                obj.person === userInfo.username && !hiddenNotifications.includes(obj._id) ? (
                    <div key={obj._id}>
                        <div className='noti'>
                            <div className='notidiv'>
                                <p>{obj.whosends} wants to claim his item 👍 </p>
                                <RxCross2 onClick={() => handleRemove(obj._id)} />

                            </div>
                            <Link style={{color:'blue'}} to={`/notification/${obj._id}`} >View</Link>

                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
}

export default Notification;
