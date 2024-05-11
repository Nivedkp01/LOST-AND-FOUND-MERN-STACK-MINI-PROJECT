import React, { useContext, useState } from 'react';
import data from './data.json'; // Check if this path is correct
import { useParams, useNavigate } from 'react-router-dom';
import './Question.css'
import { UserContext } from '../Context/Context';

function Question() {
    const { category, Person, Email } = useParams(); // Get the category from the URL params
    const [text, setText] = useState({}); 
    const[files,setFiles]=useState([])
    const navigate = useNavigate();
    const{userInfo,setUserInfo}=useContext(UserContext)

    const questions = data.categories[category]; // Get questions for the specified category

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setText(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the sum of all input values
        const message = Object.values(text).join(' ');

        // Get the reward amount from the input field
        const rewardAmount = document.getElementById('rewardAmount').value;

        // Check if message or reward amount is missing
        if (!message || !rewardAmount) {
            console.error('Message or reward amount is missing');
            return;
        }

        // Prepare data to send to the server
        const formData = new FormData();
        formData.append('message', message);
        formData.append('rewardAmount', rewardAmount);
        formData.append('Person', Person);
        formData.append('Email', Email);
        formData.append('file',files[0])
        formData.append('whosends',userInfo.username)

        try {
            const response = await fetch('http://localhost:4000/connectdata', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/verify');
            } else {
                console.error('Failed to submit data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <div className='main2'>
            <div className='inp12'>
                <div>
                    {questions && Object.entries(questions).map(([key, question]) => (
                        <div key={key}>
                            <i><p>{question}</p></i>
                            <i> <input 
                                className='inp1' 
                                type='text' 
                                style={{marginLeft:'20px'}}
                                placeholder='Enter your answer'
                                onChange={(e) => handleInputChange(e, key)} 
                            /></i>
                        </div>
                    ))}

                </div>
                
                    <input  onChange={(e)=>{setFiles(e.target.files)}} style={{marginRight:'50px',marginTop:'14px'}} type='file' className='inp1' placeholder='Add Additional Photos'></input>
                    <input id='rewardAmount' className='inp1'style={{marginTop:'14px',marginRight:'55px'}} placeholder='Enter reward amount'></input>
                    <button className='btn25' style={{marginRight:'300px'}} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Question;
