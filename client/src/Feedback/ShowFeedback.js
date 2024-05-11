import React, { useEffect, useState } from 'react';
import './ShowFeedback.css';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";



function ShowFeedback() {
    const [show, setShow] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/showfeed');
                if (!response.ok) {
                    throw new Error('Failed to fetch feedback data');
                }
                const data = await response.json();
                setShow(data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchData();
    }, [show]);

    return (
        <div>
            <div className="feedDiv">
                {show.map((obj) => (
                    obj.feedback && (
                        <div key={obj._id} className="feedi">
                            <i> <p style={{ fontSize: '16px' }}><BiSolidQuoteAltLeft  />        {obj.feedback}      <BiSolidQuoteAltRight /></p></i>
                            <h5>{obj.username}</h5>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default ShowFeedback;
