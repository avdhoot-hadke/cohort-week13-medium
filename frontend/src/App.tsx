import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Post from "./pages/Post";
import AddPost from "./pages/addPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/posts/:id" element={<Post />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
