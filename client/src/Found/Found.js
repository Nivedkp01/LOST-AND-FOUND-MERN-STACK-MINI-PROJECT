import React, { useContext, useEffect, useState } from 'react';
import './Found.css';
import { UserContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Found() {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [search, setSearch] = useState("");
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/found');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data only when the component mounts
        fetchData();
    }, []);

    const handleConnect = (id) => {
        navigate(`/connect/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`http://localhost:4000/founddel/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            // Remove deleted item from the local state
            setInfo(info.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            // Handle error gracefully, show a notification or retry option
        }
    };
    

    const filteredItems = info.filter(obj =>
        obj.item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='lost'>
            <div className='hea3'>
                <input
                    className='inp21'
                    type='text'
                    placeholder='What are you looking for?'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch size={28} className='sea' />
            </div>
            <div className='cards1'>
                <div className='row2'>
                    {filteredItems.map((obj, index) => (
                        <div key={index} className={obj.type === "found" ? 'cardi1' : 'deactive'}>
                            <img src={'http://localhost:4000/' + obj.fileurl} className='img202' alt='item' />
                            <button className='btn27' onClick={() => handleConnect(obj._id)}>Connect</button>
                            {userInfo.username === "Admin" && (
                                <MdDelete
                                    onClick={() => handleDelete(obj._id)}
                                    className='de'
                                    size={24}
                                    style={{ color: 'white', position: 'absolute', top: '5px', right: '5px' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Found;
