import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Posts from "../components/posts";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Posts />
    </>
  );
}
