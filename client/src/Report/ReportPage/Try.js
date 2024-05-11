import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Try() {
    const [item, setItem] = useState('');
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');


    async function handleCreatePost(e) {
        e.preventDefault();

        const data = new FormData();
       
        data.set('item', item);
        data.set('model', model);
        data.set('colour', colour);
        data.set('location', location);
        data.set('phoneNumber', phoneNumber);
        data.set('address', address);
        if (files.length > 0) {
            data.set('file', files[0]);
        }

        try {
            const response = await fetch('http://localhost:4000/rep', {
                method: 'POST',
                body: data,
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/verify')
            }
            // Handle response
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div>
                           <input type='text' placeholder='Item' className='inp1' value={item} onChange={(e) => setItem(e.target.value)} />
                <input type='text' placeholder='Model' className='inp1' value={model} onChange={(e) => setModel(e.target.value)} />
                <input type='text' placeholder='Colour' className='inp1' value={colour} onChange={(e) => setColour(e.target.value)} />
                <input type='text' placeholder='Location' className='inp1' value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type='file' className='inp1' onChange={(e) => { setFiles(e.target.files); }} />
            <input type='text' placeholder='Phone Number' className='inp1' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <textarea className='inp1' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
            <button className='btns' onClick={handleCreatePost}>Submit</button>
        </div>
    )
}

export default Try