import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <div className='home bg-[#a7bcff] h-[100vh] flex items-center justify-center'>
            <div className='border-2 border-white rounded-[10px] w-[65%] h-[80%]'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home