import React from "react";
import Navbar from "./Navbar";
import "../styles/styles.css";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full text-center align-middle items-center justify-center">
      <h1>Welcome to IPL</h1>
      <img
        src="https://static.toiimg.com/thumb/msid-108807514,width-1280,height-720,resizemode-4/108807514.jpg"
        alt=""
      />
    </div>
  );
};

export default Home;
