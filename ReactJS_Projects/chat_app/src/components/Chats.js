import React from "react";

const Chats = () => {
    return (
        <div className="chats">
            <div className="userChat p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]">
                <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
                <div className="userChatInfo">
                    <span className="text-[18px] font-[500]">Nhung</span>
                    <p className="text-[14px] text-gray-300">Alo</p>
                </div>
            </div>
        </div>
    );
};

export default Chats;
