import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../User/types";

const Header = () => {
  const [user, setUser] = useState<UserData | null>(null); // Estado para armazenar as informações do usuário
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Mockup do usuário
  const mockUser = {
    name: "Usuário Exemplo",
    profilePicture: "",
    isAdmin: true,
  };

  useEffect(() => {
    setUser(mockUser);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Lógica para logout
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white relative">
      <div className="flex items-center space-x-4">
        <span
          className="hover:text-gray-400 cursor-pointer"
          onClick={() => handleNavigation("/board")}
        >
          Board
        </span>
        <span
          className="hover:text-gray-400 cursor-pointer"
          onClick={() => handleNavigation("/groups")}
        >
          Grupos
        </span>
        {user && user.isAdmin && (
          <span
            className="hover:text-gray-400 cursor-pointer"
            onClick={() => handleNavigation("/users")}
          >
            Usuários
          </span>
        )}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="/Kanban-Board.png" alt="Logo" className="h-10" />
      </div>
      <div className="relative">
        {user && (
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <FaUserAlt className="w-8 h-8 rounded-full mr-2" />
            )}
            <span>{user.name}</span>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-200 rounded shadow-lg">
                <ul>
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() => alert("Editar usuário")}
                  >
                    Editar usuário
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
