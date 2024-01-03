import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar flex bg-[#2f2d52] h-[60px] p-[10px] justify-between items-center text-[#ddddf7]">
            <span className="logo font-bold">Chat App</span>
            <div className="user flex gap-[10px] mt-[5px]">
                <img
                    src={currentUser.photoURL}
                    alt=""
                    className="bg-[#ddddf7] h-8 w-8 rounded-3xl object-cover mt-[1px]"
                />
                <span className="text-xl font-semibold">{currentUser.displayName}</span>
                <button
                    className="button bg-[#5b5d8d] text-[#ddddf7] text-[15px] border-none p-1 cursor-pointer"
                    onClick={() => signOut(auth)}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Navbar;
