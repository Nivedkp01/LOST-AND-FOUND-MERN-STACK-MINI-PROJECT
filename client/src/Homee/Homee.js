import React, { useState,useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Homee.css';
import { GoDotFill } from "react-icons/go";
import Log from '../Log/Log';
import Manual from '../Manual/Manual';
import ShowFeedback from '../Feedback/ShowFeedback';
import Feedback from '../Feedback/Feedback';

function Homee() {
    const [currentSlide, setCurrentSlide] = useState(1);

    const handleSlide = (slideNumber) => {
        setCurrentSlide(slideNumber);
    };

    const handleLeft = () => {
        setCurrentSlide(currentSlide === 1 ? 2 : 1);
    };

    const handleRight = () => {
        setCurrentSlide(currentSlide === 2 ? 1 : 2);
    };


    // useEffect(() => {
    //     // Scroll to the feedback section when the component mounts
    //     const feedbackSection = document.getElementById('feedback');
    //     if (feedbackSection) {
    //         feedbackSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, []);

    return (
        <div>
            <div className='home'>
                <FaChevronLeft onClick={handleLeft} className='toleft' size={30} />
                {currentSlide === 1 ? (
                    <div className='first'>
                        <h1 style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>FoundFolio</h1>
                        <p style={{ fontSize: '1.5rem', marginTop: '0' }}><i>the seeker's station</i></p>
                    </div>
                ) : (
                    <div className='second'>
                        <p style={{ fontSize: '1.5rem', marginBottom: '0' }}><i>report what you</i></p>
                        <h1 style={{ fontSize: '5rem', marginTop: '0rem', marginBottom: '0' }}>found or lost</h1>
                        {/* <p style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '0' }}>Do you have something to report, to help anyone today?</p>
                        <p style={{ fontSize: '1rem', marginTop: '0' }}>Post it at FoundFolio, it's free for global people and very easy to use!</p> */}
                        <button className='btn'>Register</button>
                    </div>
                )}
                <FaChevronRight onClick={handleRight} className='toright' size={30} />
            </div>
            <div className='footer'>
                <GoDotFill className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => handleSlide(1)} />
                <GoDotFill className={`dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => handleSlide(2)} />
            </div>
            <Manual />
            <section id='feedback'>
                <ShowFeedback />
            </section>
            <Feedback />
        </div>
    );
}

export default Homee;
