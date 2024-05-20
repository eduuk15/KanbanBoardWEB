import { FaUserAlt, FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white relative">
      <div className="flex items-center">
        <FaBars className="text-xl" />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="/path/to/your/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-center">
        <FaUserAlt className="text-xl" />
      </div>
    </header>
  );
};

export default Header;
