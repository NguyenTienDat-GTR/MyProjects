import React, { useState, useContext } from "react";
import { db } from "../firebase";
import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    serverTimestamp,
    setDoc,
    getDoc
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", userName)
        );
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
                setErr(false); // Reset error state when user is found
            } else {
                setUser(null); // Reset user state when no user is found
                setErr(true);
            }
        } catch (err) {
            setErr(true);
        }
    };

    const handleKeyDown = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        if (!currentUser || !user) {
            return;
        }
        const combineId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        try {
            const response = await getDoc(doc(db, "chats", combineId));
            if (!response.exists()) {
                // create chat in chats collection
                await setDoc(doc(db, "chats", combineId), {
                    messages: [],
                });
                //create users chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });
            } else {
                // Chat doesn't exist
            }
        } catch (err) { }

        setUserName("");
        setUser(null);
    };

    return (
        <div className="search ">
            <div className="searchForm p-[10px]">
                <input
                    type="text"
                    className="bg-transparent border-b-2 border-[#fffaec] text-white outline-none w-full p-[8px]"
                    placeholder="Find a user"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {err && <span className="text-white p-12">User not found!</span>}
            {user && (
                <div
                    className="userChat p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]"
                    onClick={handleSelect}
                >
                    <img
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        src={user.photoURL}
                        alt=""
                    />
                    <div className="userChatInfo">
                        <span className="text-[18px] font-[500]">{user.displayName}</span>
                        {/* <p className="text-[14px] text-gray-300">Alo</p> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
