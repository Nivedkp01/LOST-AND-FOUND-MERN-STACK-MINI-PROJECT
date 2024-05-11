import React from 'react'
import './Manual.css'

function Manual() {
    return (
        <div>
      
            <div className='manual'>

                <div className='steps'>
                <h2 className='headline'>How it works?</h2>
                    <div className='step1'>
                        <div className='step'>
                            <h2 style={{ color: 'black', fontSize: '6rem', marginBottom: '0' }}>1</h2>
                            <h3 style={{ marginBottom: '0', marginTop: '80px', fontSize: '2rem' }}>Post Your Item </h3>
                        </div>
                        <div>
        
                            <p style={{ fontSize: '1rem' }}>"Provide thorough details of the lost item, including its description, last known location, and contact information for potential finders."</p>

                        </div>
                    </div>



                    <div className='step2'>
                        <div className='step'>
                            <h2 style={{ color: 'black', fontSize: '6rem', marginBottom: '0' }}>2</h2>
                            <h3 style={{ marginBottom: '0', marginTop: '80px', fontSize: '2rem' }}>Community Engagement </h3>
                        </div>
                        <div>

                            <p style={{ fontSize: '1rem' }}>"Our platform allows users to contact you directly if they discover a potential match for your lost item. Enable communication channels for swift resolution."</p>

                        </div>
                    </div>


                    <div className='step3'>
                        <div className='step'>
                            <h2 style={{ color: 'black', fontSize: '6rem', marginBottom: '0' }}>3</h2>
                            <h3 style={{ marginBottom: '0', marginTop: '80px', fontSize: '2rem' }}>Verification Process </h3>
                        </div>
                        <div>

                            <p style={{ fontSize: '1rem' }}>"We employ robust measures to securely verify ownership and authenticate items, ensuring a dependable and trustworthy confirmation process for all parties involved"</p>

                        </div>
                    </div>



                    <div className='step4'>
                        <div className='step'>
                            <h2 style={{ color: 'black', fontSize: '6rem', marginBottom: '0' }}>4</h2>
                            <h3 style={{ marginBottom: '0', marginTop: '80px', fontSize: '2rem' }}>Reunion </h3>
                        </div>
                        <div>

                            <p style={{ fontSize: '1rem' }}>"Recover your lost belongings safely and swiftly with our reliable assistance, ensuring a secure and prompt process."</p>

                        </div>
                    </div>



                </div>
                <div className='img'>
                    <img className='img2' src={require('../Log/Chat-pana.png')} />
                    <img className='img2' src={require('../Log/Typing-bro.png')}/>

                </div>

            </div>
        </div>
    )
}

export default Manual