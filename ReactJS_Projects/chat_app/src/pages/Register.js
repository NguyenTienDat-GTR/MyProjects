import React from "react";
import AddAvatar from "../images/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer bg-[#96acf5] h-[100vh] flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-[60px] rounded-xl flex flex-col gap-[10px] items-center w-[500px]">
        <span className="logo text-[#5d5b8d] font-bold text-2xl">CHAT APP</span>
        <span className="title text-[#5d5b8d] text-xl">Register</span>
        <form className="flex flex-col gap-4 w-[400px]">
          <input className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]" type="text" placeholder="input your name" />
          <input className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]" type="email" placeholder="input your email" />
          <input className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]" type="password" placeholder="input your password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file" className="flex items-center gap-2 cursor-pointer w-[50%] text-[#8da4f1] text-[15px ]">
            <img src={AddAvatar} alt="" className="w-8 h-8" />
            <span>Add your avatar</span>
          </label>
          <button className="bg-[#7b96ec] text-white p-[10px] font-bold cursor-pointer text-xl">Sign up</button>
          <p className="text-center tetx-[#5b5d8b] text-[15px] mt-[10px]">You do have an account? Sign in</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
