import React, { useContext, useState } from 'react';
import './Feedback.css';
import { CiPhone } from 'react-icons/ci';
import { MdEmail } from 'react-icons/md';
import { UserContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const { userInfo } = useContext(UserContext);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();


    

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4000/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback, username: userInfo.username }),
            });

            if (response.ok) {
                setFeedback("");
                navigate('/');
            } else {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Handle error gracefully, e.g., display an error message to the user
        }
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    return (
        <div className="feedback">
            <div className="feed">
                <textarea
                    placeholder="Enter your feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                />
                <button className="btn30" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <div className="contact">
                <h2>Contact Us</h2>
                <div className="hea">
                    <MdEmail className="user" />
                    <p>foundfolio@gmail.com</p>
                </div>
                <div className="hea">
                    <CiPhone />
                    <p>6282695629</p>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
