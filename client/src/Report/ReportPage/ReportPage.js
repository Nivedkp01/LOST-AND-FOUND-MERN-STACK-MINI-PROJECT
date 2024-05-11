import React, { useState,useContext } from 'react';
import './ReportPage.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

function ReportPage() {
    const [item, setItem] = useState('');
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const[Email,setEmail]=useState('')
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext)
    const{category}=useParams()
    console.log(category)
    async function handleReport(type, e) {
        e.preventDefault(); // Prevent default form submission behavior

        const data = new FormData();
        data.set('item', item);
        data.set('model', model);
        data.set('colour', colour);
        data.set('location', location);
        data.set('phoneNumber', phoneNumber);
        data.set('address', address);
        data.set('type', type);
        data.set('username',userInfo.username)
        data.set('Userid',userInfo.id) 
        data.set('Email',Email)
        data.set('category',category)

        
        
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
                navigate('/');
            }
            // Handle response
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div className='ReportPage'>
            <div className='form'>
                <div className='hea'>
                    <h1>Give details</h1>
                    <FaSearch size={32} />
                </div>
                <input type='text' placeholder='Item' className='inp1' value={item} onChange={(e) => setItem(e.target.value)} />
                <input type='text' placeholder='Model' className='inp1' value={model} onChange={(e) => setModel(e.target.value)} />
                <input type='text' placeholder='Colour' className='inp1' value={colour} onChange={(e) => setColour(e.target.value)} />
                <input type='text' placeholder='Location' className='inp1' value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type='file' className='inp1' onChange={(e) => { setFiles(e.target.files); }} />
                <input type='text' placeholder='Phone Number' className='inp1' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input type='text' placeholder='Email' className='inp1' value={Email} onChange={(e) => setEmail(e.target.value)} />
                <textarea className='inp1' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                <div className='hea'>
                    <button className='btns' onClick={(e) => handleReport('lost', e)}>Report Lost</button>
                    <button className='btns' onClick={(e) => handleReport('found', e)}>Report Found</button>
                </div>
            </div>
        </div>
    )
}

export default ReportPage;
