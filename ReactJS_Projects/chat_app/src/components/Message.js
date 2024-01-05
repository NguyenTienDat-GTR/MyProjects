import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const formattedDate = message.date
        ? new Date(message.date.seconds * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        })
        : "";

    const isMessageFromOtherUser = message.senderId !== currentUser.uid;

    return (
        <div className="flex-col">
            <span className="time flex justify-center text-gray-400 font-[300] p-2">
                {formattedDate}
            </span>
            <div
                ref={ref}
                className={`message flex gap-[20px] mb-[20px] items-end ${message.senderId === currentUser.uid && "owner"
                    }`}
            >
                <div className="messageInfo flex flex-col text-gray-400 font-[300] mb-1 ">
                    {isMessageFromOtherUser && (
                        <img
                            className={`w-5 h-5 rounded-full object-cover ${message.senderId !== currentUser.uid && "owner"
                                }`}
                            src={data.user.photoURL} // Use the other user's photoURL
                            alt=""
                        />
                    )}
                </div>
                <div
                    className="messageContent max-w-[70%] flex flex-col gap-[10px] h-[auto] mr-[-15px]"
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems:
                            message.senderId === currentUser.uid ? "flex-end" : "flex-start",
                    }}
                >
                    {message.text && (
                        <p className="bg-white py-[10px] px-5">{message.text}</p>
                    )}
                    {message.img && (
                        <img className="w-50 h-60 rounded-2xl" src={message.img} alt="" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
