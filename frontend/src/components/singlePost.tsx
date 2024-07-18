import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  publish?: boolean;
  authorId: string;
  author: User;
  createdAt: string;
}
interface User {
  email: string;
  name: string;
}
export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `http://localhost:8787/api/v1/post/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setPost(response.data.post);
      console.log(response.data.post);
      setLoading(false);
    };
    fetchPost();
  }, []);
  const date = new Date(post?.createdAt || Date.now());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const createdAt = `${month} ${day}, ${year}`;

  return loading ? (
    <div className="flex h-[calc(100vh-50px)]  w-full justify-center items-center">
      <div
        className=" h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite] "
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row px-12 py-12 ">
      <div className=" order-last md:order-first">
        <div className=" font-bold text-5xl">{post?.title} </div>
        <div className="py-2 font-thin text-sm">{createdAt}</div>
        <div className="py-2 pe-12">{post?.content}</div>
        <img
          className=" my-2 h-64 w-96 rounded object-cover  cursor-pointer"
          alt="image"
          src={post?.image}
        />
      </div>
      <div className="min-w-[20%]">
        <div className="pb-4 font-thin text-sm">Author</div>
        <div className="flex ">
          <div className="inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {post?.author?.name[0]}
            </span>
          </div>
          <div className="px-2">{post?.author?.name}</div>
        </div>
      </div>
    </div>
  );
}
