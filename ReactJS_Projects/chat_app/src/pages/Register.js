import React, { useState } from "react";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrMessage("Existing email address!");
      } else if (err.code === "auth/wrong-password") {
        setErrMessage("Wrong password!");
      } else {
        setErrMessage("Something went wrong...");
      }

      setErr(true);
    }
  };

  return (
    <div className="formContainer bg-[#96acf5] h-[100vh] flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-[60px] rounded-xl flex flex-col gap-[10px] items-center w-[500px]">
        <span className="logo text-[#5d5b8d] font-bold text-2xl">CHAT APP</span>
        <span className="title text-[#5d5b8d] text-xl">Register</span>
        <form className="flex flex-col gap-4 w-[400px]" onSubmit={handleSubmit}>
          <input
            className="border-b-2 border-[#a7bcff] p-4 placeholder-[rgba(175,175,175)]"
            type="text"
            placeholder="input your name"
          />
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
          <input style={{ display: "none" }} type="file" id="file" />
          <label
            htmlFor="file"
            className="flex items-center gap-2 cursor-pointer w-[50%] text-[#8da4f1] text-[15px ]"
          >
            <img src={Add} alt="" className="w-8 h-8" />
            <span>Add your avatar</span>
          </label>
          <button className="bg-[#7b96ec] text-white p-[10px] font-bold cursor-pointer text-xl">
            Sign up
          </button>
          {err && <span className="text-red-600">{errMessage}</span>}
          <p className="text-center tetx-[#5b5d8b] text-[15px] mt-[10px]">
            You do have an account?{" "}
            <Link className="text-sky-700 underline" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
