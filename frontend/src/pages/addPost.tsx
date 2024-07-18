import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
    publish: true,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    const response = await axios.post(
      `http://localhost:8787/api/v1/post`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate("/");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col text-neutral-500">
        <input
          className="border-b mx-44 py-4 text-4xl  font-serif focus:outline-none"
          type="text"
          placeholder="Title"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <textarea
          className="border-b mx-44 text-xl py-4  font-serif focus:outline-none"
          rows={10}
          placeholder="Tell your story..."
          name="content"
          value={data.content}
          onChange={handleChange}
        />
        <input
          className=" text-xl mx-44 py-4  font-serif focus:outline-none"
          type="text"
          placeholder="Image url"
          name="image"
          value={data.image}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-12 h-10 w-44 mx-auto rounded text-white  bg-black "
        >
          Publish
        </button>
      </form>
    </>
  );
}
