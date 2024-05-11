import React, { useEffect, useState } from 'react'
import './Admin.css'
import { MdDelete } from "react-icons/md";

function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/adminpage");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/deleteUser/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted user from the state
                setUsers(users.filter(user => user._id !== id));
            } else {
                console.error('Failed to delete user');
            }
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    return (
        <div className='admin'>
            {users.map((obj) => (
                <div key={obj._id}>
                    {obj.username !== "Admin" && (
                        <div className='hea'>
                            <p>{obj.username}</p>
                            <MdDelete onClick={() => handleDelete(obj._id)} className='delete' />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Admin;
