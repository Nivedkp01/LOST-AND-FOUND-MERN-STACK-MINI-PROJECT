import React from 'react'
import './Online.css'
import { CiUser } from "react-icons/ci";
function Online() {
    return (
        <div className='conversation'>
            <div className='conv'>
                <div className='avatar' ><CiUser size={24} /></div>
                <div className='namee'>Nived</div>
            </div>

        </div>
    )
}

export default Online