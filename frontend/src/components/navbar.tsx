import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className=" flex py-2 px-12 border-b-[1px] items-center sticky top-0 bg-white ">
      <Link to={"/"}>
        <div className="text-4xl font-serif">Medium</div>
      </Link>
      <div className="ms-auto flex items-center">
        <Link to={"/add-post"}>
          <div className="me-2 hover:text-neutral-400">Create</div>
        </Link>
        <div
          className="me-2 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer  rounded-lg  p-2 transition ease-in-out delay-150"
          onClick={handleLogout}
        >
          Logout
        </div>
        <div className="ms-2 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {`A`}
          </span>
        </div>
      </div>
    </div>
  );
}
