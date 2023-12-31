import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);


    return (
        <div className="chat">
            <div className="chatInfo h-[60px] bg-[#5b5d8d] flex items-center justify-between p-[10px] text-gray-300">
                <span className="text-xl text-white pl-3 font-bold">{data.user?.displayName}</span>
                <div className="chatIcons text-slate-300 flex justify-evenly w-[150px] gap-[10px]">
                    <i className="fa fa-video-camera text-2xl cursor-pointer" aria-hidden="true" />
                    <i className="fa fa-user-plus text-2xl cursor-pointer" aria-hidden="true" />
                    <i className="fa fa-ellipsis-h text-2xl cursor-pointer" aria-hidden="true"></i>
                </div>
            </div>
            <Messages className="messages" />
            <Input />
        </div>
    );
};

export default Chat;
