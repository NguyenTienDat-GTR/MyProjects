import React from "react";

const Input = () => {
    return (
        <div className="input h-[60px] bg-white p-[10px] flex items-center justify-between">
            <div className="inputFile flex justify-between items-center w-[10%] text-gray-500">
                <input type="file" style={{ display: "none" }} id="fileImage" />
                <label htmlFor="fileImage" className="cursor-pointer" >
                    <i className="fa fa-paperclip text-3xl" aria-hidden="true" />
                </label>
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file" className="cursor-pointer" >
                    <i className="fa fa-image text-3xl" aria-hidden="true" />
                </label>
            </div>

            <input type="text" placeholder="Type something..." className="w-[80%] border-none outline-none bg-slate-200 h-[80%] rounded-2xl pl-[10px]" />

            <button className="fa fa-paper-plane text-[25px] mr-[10px] text-[#8da4f1] cursor-pointer"></button>

        </div>
    );
};

export default Input;
