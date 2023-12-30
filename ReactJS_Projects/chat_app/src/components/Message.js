import React from "react";

const Message = () => {
    return (
        <div className="message owner flex gap-[20px] mb-[20px] ">
            <div className="messageInfo flex flex-col text-gray-400 font-[300]">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
                <span>Just now</span>
            </div>
            <div className="messageContent  max-w-[80%] flex flex-col gap-[10px]">
                <p className="bg-white py-[10px] px-5 rounded-tl-none rounded-r-xl rounded-b-xl rounded-l-xl">Alo</p>
                <img
                    className="w-50 h-60"
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Message;
