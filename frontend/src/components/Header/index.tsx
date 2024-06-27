import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserData } from "../User/types";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<UserData>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
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
        {user && isAdmin && (
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
            {/* {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <FaUserAlt className="w-8 h-8 rounded-full mr-2" />
            )} */}
            <span>{user.name}</span>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-200 rounded shadow-lg">
                <ul>
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    // onClick={handleEditUser}
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
