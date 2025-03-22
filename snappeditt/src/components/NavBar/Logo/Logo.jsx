import { Link } from "react-router-dom";
import logo from "@/assets/images/SE-1.png";


const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo || "/placeholder.svg"} alt="SnappEditt" />
      </Link>
    </div>
  );
};

export default Logo;
