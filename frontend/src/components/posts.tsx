import { useEffect, useState } from "react";
import PostCard, { PostCardSkeleton } from "./postCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  publish: boolean;
  authorId: string;
  author: User;
  createdAt: string;
}
interface User {
  email: string;
  name: string;
}
export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const handleClick = (post: Post) => {
    console.log("first");
    navigate(`/posts/${post.id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:8787/api/v1/post/bulk",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setPosts(response.data.posts);
      setLoading(false);
      console.log("posts[]", response.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {loading && (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => {
            handleClick(post);
          }}
        >
          <PostCard
            heading={post.title || ""}
            content={post.content || ""}
            img={post.image || ""}
            author={post.author.name || ""}
            createdAt={post.createdAt || ""}
          />
          <hr className="h-px md:mx-24 lg:mx-72  bg-gray-200 border-0 " />
        </div>
      ))}
    </>
  );
}
