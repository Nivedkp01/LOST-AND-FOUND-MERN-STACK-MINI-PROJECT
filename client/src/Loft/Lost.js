import React, { useEffect,useContext, useState } from 'react';
import './Lost.css';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { UserContext } from '../Context/Context';
function Lost() {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [search, setSearch] = useState("");
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/lost');
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

    const handleConnect = async (id) => {
        navigate(`/connect/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/lostdel/${id}`, {
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

    const handleClick = async () => {
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
                <CiSearch size={28} className='sea' onClick={handleClick} />
            </div>
            <div className='cards1'>
                <div className='row2'>
                    {filteredItems.map((obj, index) => (
                        <div key={index} className={obj.type === "lost" ? 'cardi1' : 'deactive'}>
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

export default Lost;
