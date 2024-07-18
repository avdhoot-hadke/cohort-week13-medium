import { Link, useNavigate } from "react-router-dom";
import Input from "./inputSignup";
import { useState } from "react";
import { SignUpInput } from "@avdhoothadke/medium-common";
import axios from "axios";
import { Backend_Url } from "../../config";

export default function AuthForm({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();

  const [authInput, setAuthInput] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  //  console.log(authInput);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      console.log("AuthInput", authInput);
      console.log(
        `Req:${Backend_Url}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`
      );
      const response = await axios.post(
        `${Backend_Url}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        authInput
      );
      const jwt = response.data.token;
      console.log(response.data.token);
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-4xl font-bold">
        {type === "signup" ? "Create an account" : "Sign In"}
      </h1>

      <p className="text-gray-400 mb-5 mt-2">
        {type === "signup" ? (
          <>
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign In
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </>
        )}
      </p>

      {type === "signup" && (
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => {
            setAuthInput((p) => ({ ...p, name: e.target.value }));
          }}
        />
      )}

      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        onChange={(e) => {
          setAuthInput((p) => ({ ...p, email: e.target.value }));
        }}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setAuthInput((p) => ({ ...p, password: e.target.value }));
        }}
      />

      <button
        type="submit"
        className="mt-10 h-10 w-72 rounded-md text-white  bg-black "
        onClick={handleSubmit}
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
}
