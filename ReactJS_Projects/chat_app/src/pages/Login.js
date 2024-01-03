import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong...";

      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address!";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password!";
          break;
        default:
          break;
      }
      setErrMessage(errorMessage);
      setErr(true);
    }
  };
  return (
    <div className="formContainer bg-[#96acf5] h-[100vh] flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-[60px] rounded-xl flex flex-col gap-[10px] items-center w-[500px]">
        <span className="logo text-[#5d5b8d] font-bold text-2xl">CHAT APP</span>
        <span className="title text-[#5d5b8d] text-xl">Login</span>
        <form className="flex flex-col gap-4 w-[400px]" onSubmit={handleSubmit}>
          <input
            className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]"
            type="email"
            placeholder="input your email"
          />
          <input
            className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]"
            type="password"
            placeholder="input your password"
          />

          <button className="bg-[#7b96ec] text-white p-[10px] font-bold cursor-pointer text-xl">
            Sign in
          </button>
          {err && <span className="text-red-600">{errMessage}</span>}
          <p className="text-center tetx-[#5b5d8b] text-[15px] mt-[10px]">
            You don't have an account? <Link className="text-sky-700 underline" to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
