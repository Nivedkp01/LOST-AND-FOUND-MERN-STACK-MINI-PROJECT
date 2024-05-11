import React from 'react'
import './Conversation.css'
import { CiUser } from "react-icons/ci";


function Conversation({ conv }) {
    return (
        <div className='conversation'>
            <div className='conv'>
                <div className='avatar' ><CiUser size={24} /></div>
                <div className='namee'>{conv}</div>
            </div>
        </div>
    )
}

export default Conversation