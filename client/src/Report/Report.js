import React from 'react'
import './Report.css'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Report() {
    const navigate=useNavigate()
  return (
    <div className='report'>
    <div  className='headline'>
    <h1 style={{fontSize:'40px'}} >Report Here</h1><FaSearch size={30}/>
    </div>

            <div className='row1'>
                <div className='card' onClick={()=>{navigate('/reportpage/Mobile')}}>
                    <img src={require('../Report/phone.jpg')} className='imagee'/>
                    <h3>Mobile</h3>
                </div>


                <div className='card' onClick={()=>{navigate('/reportpage/Pet')}}>
                    <img src={require('../Report/pets.jpg')} className='imagee'/>
                    <h3>Pets</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Automobiles')}}>
                    <img src={require('../Report/car.jpg')} className='imagee'/>
                    <h3>Automobile</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Bag')}}>
                    <img src={require('../Report/bag.jpg')} className='imagee'/>
                    <h3>Bag</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Document')}}>
                    <img src={require('../Report/document.jpg')}  className='imagee'/>
                    <h3>Documents</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Laptop')}}>
                    <img src={require('../Report/laptop.jpg')} className='imagee'/>
                    <h3>Laptop</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Jewelry')}}>
                    <img src={require('../Report/jewellery.jpg')} className='imagee'/>
                    <h3>Jewelry</h3>
                </div>



                <div className='card' onClick={()=>{navigate('/reportpage/Fashion')}}>
                    <img src={require('../Report/fashion.jpg')} className='imagee'/>
                    <h3>Fashion Accessories</h3>
                </div>

                <div className='card' onClick={()=>{navigate('/reportpage/Key')}}>
                    <img src={require('../Report/key.jpg')}  className='imagee'/>
                    <h3>Key</h3>
                </div>
                



                <div className='card' onClick={()=>{navigate('/reportpage/Watch')}}>
                    <img src={require('../Report/watch.jpg')} className='imagee'/>
                    <h3>Watches</h3>
                </div>




                <div className='card' onClick={()=>{navigate('/reportpage/Clothes')}}>
                    <img src={require('../Report/cloth.jpg')} className='imagee'/>
                    <h3>Clothes And Shoes</h3>
                </div>

                <div className='card' onClick={()=>{navigate('/reportpage/Others')}}>
                    <img src={require('../Report/others.jpg')} className='imagee'/>
                    <h3>Others</h3>
                </div>

                
            </div>

    </div>
  )
}

export default Report