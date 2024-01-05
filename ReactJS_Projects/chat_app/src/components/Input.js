import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    Timestamp,
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);


    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            try {
                // upload image on Firebase Storage
                await uploadBytesResumable(storageRef, img);

                // get downloadURL from storageRef was created
                const downloadURL = await getDownloadURL(storageRef);

                // add message into firestore with img and imgRef
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                        imgRef: storageRef.name,
                        type: "image", // Set type as "image" for image messages
                    }),
                });

                // Update lastMessage and date for userChats (image message)
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [data.chatId + ".lastMessage"]: {
                        text: "Image",
                        type: "image",
                    },
                    [data.chatId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", data.user.uid), {
                    [data.chatId + ".lastMessage"]: {
                        text: "Image",
                        type: "image",
                    },
                    [data.chatId + ".date"]: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error uploading file. Please try again.");
            }
        } else {
            // add message into firestore without image
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    type: "text", // Set type as "text" for text messages
                }),
            });

            // Update lastMessage and date for userChats (text message)
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                    type: "text",
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                    type: "text",
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
        }

        setText("");
        setImg(null);
    };


    return (
        <div className="input h-[60px] bg-white p-[10px] flex items-center justify-between">
            <div className="inputFile flex justify-between items-center w-[10%] pl-8 pt-1 text-gray-500">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => {
                        setImg(e.target.files[0]);
                    }}
                />
                <label htmlFor="file" className="cursor-pointer">
                    <i className="fa fa-image text-3xl" aria-hidden="true" />
                </label>
            </div>

            <input
                type="text"
                placeholder="Type something..."
                className="w-[80%] border-none outline-none bg-slate-200 h-[80%] rounded-2xl pl-[10px]"
                onChange={(e) => {
                    setText(e.target.value);
                }}
                value={text}
            />

            <button
                className="send fa fa-paper-plane text-[25px] mr-[10px] text-[#8da4f1] cursor-pointer"
                onClick={handleSend}
            />
        </div>
    );
};

export default Input;
