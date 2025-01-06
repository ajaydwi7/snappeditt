import Video from "@/assets/video/SE-video.mp4";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import "./Banner.css";

const Banner = () => {
  const { modal } = useGlobalContext(); // Access modal functions
  const [text, setText] = useState("Edit"); // Initialize state for text


  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => (prev === "Edit" ? "Retouch" : "Edit")); // Toggle text
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleGetStarted = () => {
    modal.openModal(true); // Open the register modal
  };

  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Get Professionally <br />
            <span className="text">{text} </span> <br />
            Images without any Compromise
          </h1>
          <span className="is-buy-now">
            <button className="btn-rounded buy-now mb-4" onClick={handleGetStarted}>Get Started</button>
          </span>
        </div>
        <div className="subject">
          <video className="banner-video" src={Video} autoPlay loop muted />
        </div>
      </div>
    </div>
  );
};
export default Banner;
