import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <div className='messages bg-[#ddddf7] p-[10px] overflow-y-scroll'>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages